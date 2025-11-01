import { describe, it, expect, beforeEach, vi } from 'vitest'
import GetImageWithCache from '@/modules/host/usecase/get-image/GetImageWithCache'
import type GetImageRequest from '@/modules/host/usecase/get-image/GetImageRequest'
import type GetImageResponse from '@/modules/host/usecase/get-image/GetImageResponse'

// Mock the image cache composable
const mockImageCache = {
  getCachedImage: vi.fn(),
  setCachedImage: vi.fn(),
  getCacheStats: vi.fn(),
  clearAllCache: vi.fn(),
}

vi.mock('@/composables/useImageCache', () => ({
  useImageCache: () => mockImageCache,
}))

// Mock the API service
const mockApiPost = vi.fn()
vi.mock('@/abstractions/ClientApiServiceAsync', () => ({
  default: vi.fn().mockImplementation(() => ({
    post: mockApiPost,
  })),
}))

// Mock environment
vi.mock('@/_enviroments/enviroment', () => ({
  default: {
    apiBaseUrl: 'https://api.example.com',
  },
}))

// Mock localStorage for the image cache
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  key: vi.fn(),
  length: 0,
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('GetImageWithCache', () => {
  let getImageWithCache: GetImageWithCache
  let request: GetImageRequest

  beforeEach(() => {
    getImageWithCache = new GetImageWithCache()
    request = {
      idAmbiente: 123,
      nameImage: 'test.jpg',
    }

    // Clear all mocks
    vi.clearAllMocks()
    localStorageMock.length = 0
  })

  describe('execute', () => {
    it('should return cached image when available', async () => {
      const cachedImageData = 'data:image/jpeg;base64,cached'
      mockImageCache.getCachedImage.mockReturnValue(cachedImageData)

      const result = await getImageWithCache.execute(request)

      expect(mockImageCache.getCachedImage).toHaveBeenCalledWith(123, 'test.jpg')
      expect(mockApiPost).not.toHaveBeenCalled()
      expect(result.fotoB64).toBe(cachedImageData)
    })

    it('should fetch from API when cache miss and cache the result', async () => {
      const apiResponse: GetImageResponse = {
        fotoB64: 'data:image/jpeg;base64,fromapi',
      }

      mockImageCache.getCachedImage.mockReturnValue(null) // Cache miss
      mockApiPost.mockResolvedValue(apiResponse)

      const result = await getImageWithCache.execute(request)

      expect(mockImageCache.getCachedImage).toHaveBeenCalledWith(123, 'test.jpg')
      expect(mockApiPost).toHaveBeenCalledWith('/GetImageAmbientUseCase', request)
      expect(mockImageCache.setCachedImage).toHaveBeenCalledWith(
        123,
        'test.jpg',
        apiResponse.fotoB64,
      )
      expect(result).toBe(apiResponse)
    })

    it('should not cache when API returns invalid response', async () => {
      const apiResponse: GetImageResponse = {
        fotoB64: null as any,
      }

      mockImageCache.getCachedImage.mockReturnValue(null) // Cache miss
      mockApiPost.mockResolvedValue(apiResponse)

      const result = await getImageWithCache.execute(request)

      expect(mockApiPost).toHaveBeenCalledWith('/GetImageAmbientUseCase', request)
      expect(mockImageCache.setCachedImage).not.toHaveBeenCalled()
      expect(result).toBe(apiResponse)
    })

    it('should throw error when API fails', async () => {
      const apiError = new Error('API Error')

      mockImageCache.getCachedImage.mockReturnValue(null) // Cache miss
      mockApiPost.mockRejectedValue(apiError)

      await expect(getImageWithCache.execute(request)).rejects.toThrow('API Error')
      expect(mockImageCache.setCachedImage).not.toHaveBeenCalled()
    })
  })

  describe('forceRefresh', () => {
    it('should bypass cache and fetch from API', async () => {
      const apiResponse: GetImageResponse = {
        fotoB64: 'data:image/jpeg;base64,fresh',
      }

      mockApiPost.mockResolvedValue(apiResponse)

      const result = await getImageWithCache.forceRefresh(request)

      expect(mockImageCache.getCachedImage).not.toHaveBeenCalled()
      expect(mockApiPost).toHaveBeenCalledWith('/GetImageAmbientUseCase', request)
      expect(mockImageCache.setCachedImage).toHaveBeenCalledWith(
        123,
        'test.jpg',
        apiResponse.fotoB64,
      )
      expect(result).toBe(apiResponse)
    })

    it('should not cache when force refresh returns invalid response', async () => {
      const apiResponse: GetImageResponse = {
        fotoB64: '' as any,
      }

      mockApiPost.mockResolvedValue(apiResponse)

      const result = await getImageWithCache.forceRefresh(request)

      expect(mockApiPost).toHaveBeenCalledWith('/GetImageAmbientUseCase', request)
      expect(mockImageCache.setCachedImage).not.toHaveBeenCalled()
      expect(result).toBe(apiResponse)
    })

    it('should throw error when force refresh API fails', async () => {
      const apiError = new Error('Force refresh failed')

      mockApiPost.mockRejectedValue(apiError)

      await expect(getImageWithCache.forceRefresh(request)).rejects.toThrow('Force refresh failed')
      expect(mockImageCache.setCachedImage).not.toHaveBeenCalled()
    })
  })

  describe('cache management methods', () => {
    it('should delegate getCacheStats to image cache', () => {
      const mockStats = { totalEntries: 5, validEntries: 3, expiredEntries: 2 }
      mockImageCache.getCacheStats.mockReturnValue(mockStats)

      const result = getImageWithCache.getCacheStats()

      expect(mockImageCache.getCacheStats).toHaveBeenCalled()
      expect(result).toBe(mockStats)
    })

    it('should delegate clearCache to image cache', () => {
      getImageWithCache.clearCache()

      expect(mockImageCache.clearAllCache).toHaveBeenCalled()
    })
  })
})
