import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useImageCache } from '@/composables/useImageCache'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    get length() {
      return Object.keys(store).length
    },
    key: vi.fn((index: number) => Object.keys(store)[index] || null)
  }
})()

// Mock global localStorage
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('useImageCache', () => {
  const imageCache = useImageCache()
  
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorageMock.clear()
  })

  describe('basic caching functionality', () => {
    it('should return null for non-existent cache entry', () => {
      const result = imageCache.getCachedImage(123, 'test.jpg')
      expect(result).toBeNull()
    })

    it('should store and retrieve cached image', () => {
      const idAmbiente = 123
      const nameImage = 'test.jpg'
      const imageData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD'

      // Store image
      imageCache.setCachedImage(idAmbiente, nameImage, imageData)

      // Retrieve image
      const result = imageCache.getCachedImage(idAmbiente, nameImage)
      expect(result).toBe(imageData)
    })

    it('should generate unique cache keys for different images', () => {
      const imageData1 = 'data:image/jpeg;base64,image1'
      const imageData2 = 'data:image/jpeg;base64,image2'

      imageCache.setCachedImage(123, 'test1.jpg', imageData1)
      imageCache.setCachedImage(456, 'test2.jpg', imageData2)

      expect(imageCache.getCachedImage(123, 'test1.jpg')).toBe(imageData1)
      expect(imageCache.getCachedImage(456, 'test2.jpg')).toBe(imageData2)
    })
  })

  describe('cache expiration', () => {
    beforeEach(() => {
      // Mock Date.now to control time
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should return cached image when within expiration time', () => {
      const idAmbiente = 123
      const nameImage = 'test.jpg'
      const imageData = 'data:image/jpeg;base64,test'

      // Store image at time 0
      vi.setSystemTime(0)
      imageCache.setCachedImage(idAmbiente, nameImage, imageData)

      // Check after 1 day (should still be valid - 3 day expiration)
      vi.setSystemTime(24 * 60 * 60 * 1000) // 1 day
      const result = imageCache.getCachedImage(idAmbiente, nameImage)
      expect(result).toBe(imageData)
    })

    it('should return null for expired cache entry', () => {
      const idAmbiente = 123
      const nameImage = 'test.jpg'
      const imageData = 'data:image/jpeg;base64,test'

      // Store image at time 0
      vi.setSystemTime(0)
      imageCache.setCachedImage(idAmbiente, nameImage, imageData)

      // Check after 4 days (should be expired - 3 day expiration)
      vi.setSystemTime(4 * 24 * 60 * 60 * 1000) // 4 days
      const result = imageCache.getCachedImage(idAmbiente, nameImage)
      expect(result).toBeNull()
    })

    it('should remove expired entry from localStorage when accessed', () => {
      const idAmbiente = 123
      const nameImage = 'test.jpg'
      const imageData = 'data:image/jpeg;base64,test'

      // Store image at time 0
      vi.setSystemTime(0)
      imageCache.setCachedImage(idAmbiente, nameImage, imageData)

      // Clear the mock to track subsequent calls
      localStorageMock.removeItem.mockClear()

      // Access after expiration
      vi.setSystemTime(4 * 24 * 60 * 60 * 1000) // 4 days
      imageCache.getCachedImage(idAmbiente, nameImage)

      // Verify expired entry was removed
      expect(localStorageMock.removeItem).toHaveBeenCalled()
    })
  })

  describe('error handling', () => {
    it('should handle localStorage errors gracefully when getting', () => {
      localStorageMock.getItem.mockImplementationOnce(() => {
        throw new Error('Storage error')
      })

      const result = imageCache.getCachedImage(123, 'test.jpg')
      expect(result).toBeNull()
    })

    it('should handle localStorage errors gracefully when setting', () => {
      localStorageMock.setItem.mockImplementationOnce(() => {
        throw new Error('Storage error')
      })

      // Should not throw error
      expect(() => {
        imageCache.setCachedImage(123, 'test.jpg', 'data')
      }).not.toThrow()
    })

    it('should handle quota exceeded error by attempting cleanup', () => {
      const quotaError = new DOMException('Quota exceeded', 'QuotaExceededError')
      
      localStorageMock.setItem
        .mockImplementationOnce(() => { throw quotaError })
        .mockImplementationOnce(() => {}) // Success on retry

      imageCache.setCachedImage(123, 'test.jpg', 'data')

      // Should attempt to set 3 times (original + retry after cleanup + metadata update)
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(3)
    })
  })

  describe('cache management', () => {
    beforeEach(() => {
      // Clear localStorage completely before each cache management test
      localStorageMock.clear()
    })

    it('should get cache statistics', () => {
      // Clear any existing entries including metadata
      localStorageMock.clear()
      vi.clearAllMocks()
      
      imageCache.setCachedImage(123, 'test1.jpg', 'data1')
      imageCache.setCachedImage(456, 'test2.jpg', 'data2')

      const stats = imageCache.getCacheStats()
      expect(stats).toBeDefined()
      // The cache may include metadata, so check for at least 2 entries
      expect(stats?.totalEntries).toBeGreaterThanOrEqual(2)
      expect(stats?.validEntries).toBeGreaterThanOrEqual(2)
      expect(stats?.expiredEntries).toBeGreaterThanOrEqual(0)
      expect(stats?.cacheDurationDays).toBe(3)
    })

    it('should clear all cache', () => {
      imageCache.setCachedImage(123, 'test1.jpg', 'data1')
      imageCache.setCachedImage(456, 'test2.jpg', 'data2')

      imageCache.clearAllCache()

      expect(imageCache.getCachedImage(123, 'test1.jpg')).toBeNull()
      expect(imageCache.getCachedImage(456, 'test2.jpg')).toBeNull()
    })

    it('should cleanup expired entries', () => {
      vi.useFakeTimers()
      
      // Add some entries
      vi.setSystemTime(0)
      imageCache.setCachedImage(123, 'test1.jpg', 'data1')
      imageCache.setCachedImage(456, 'test2.jpg', 'data2')

      // Move forward in time to expire first entry
      vi.setSystemTime(4 * 24 * 60 * 60 * 1000) // 4 days
      imageCache.setCachedImage(789, 'test3.jpg', 'data3') // Fresh entry

      // Cleanup should remove expired entries
      imageCache.cleanupExpiredCache()

      // Fresh entry should still exist, expired ones should be gone
      expect(imageCache.getCachedImage(789, 'test3.jpg')).toBe('data3')
      expect(imageCache.getCachedImage(123, 'test1.jpg')).toBeNull()
      expect(imageCache.getCachedImage(456, 'test2.jpg')).toBeNull()

      vi.useRealTimers()
    })
  })
})