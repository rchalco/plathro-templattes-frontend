import { ref } from 'vue'

interface CachedImage {
  data: string
  timestamp: number
  expiresIn: number
}

interface CacheMetadata {
  lastCleanup: number
}

/**
 * Composable for caching images with 3-day expiration
 */
export function useImageCache() {
  const CACHE_PREFIX = 'ambient_image_'
  const CACHE_METADATA_KEY = 'ambient_image_cache_metadata'
  const CACHE_DURATION_MS = 3 * 24 * 60 * 60 * 1000 // 3 days in milliseconds
  const CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000 // 1 day in milliseconds

  /**
   * Generate cache key for an image
   */
  function getCacheKey(idAmbiente: number, nameImage: string): string {
    return `${CACHE_PREFIX}${idAmbiente}_${nameImage}`
  }

  /**
   * Check if cached data is still valid
   */
  function isValidCache(cachedImage: CachedImage): boolean {
    const now = Date.now()
    return now < cachedImage.timestamp + cachedImage.expiresIn
  }

  /**
   * Get cached image if available and valid
   */
  function getCachedImage(idAmbiente: number, nameImage: string): string | null {
    try {
      const cacheKey = getCacheKey(idAmbiente, nameImage)
      const cachedData = localStorage.getItem(cacheKey)
      
      if (!cachedData) {
        return null
      }

      const cachedImage: CachedImage = JSON.parse(cachedData)
      
      if (isValidCache(cachedImage)) {
        console.log(`Cache hit for image: ${idAmbiente}_${nameImage}`)
        return cachedImage.data
      } else {
        // Remove expired cache entry
        localStorage.removeItem(cacheKey)
        console.log(`Cache expired for image: ${idAmbiente}_${nameImage}`)
        return null
      }
    } catch (error) {
      console.error('Error reading from image cache:', error)
      return null
    }
  }

  /**
   * Store image in cache
   */
  function setCachedImage(idAmbiente: number, nameImage: string, imageData: string): void {
    try {
      const cacheKey = getCacheKey(idAmbiente, nameImage)
      const cachedImage: CachedImage = {
        data: imageData,
        timestamp: Date.now(),
        expiresIn: CACHE_DURATION_MS
      }

      localStorage.setItem(cacheKey, JSON.stringify(cachedImage))
      console.log(`Image cached: ${idAmbiente}_${nameImage}`)
      
      // Update metadata
      updateCacheMetadata()
    } catch (error) {
      console.error('Error storing image in cache:', error)
      // If storage is full, try to clean up and retry once
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.log('Cache quota exceeded, attempting cleanup...')
        cleanupExpiredCache()
        try {
          const cacheKey = getCacheKey(idAmbiente, nameImage)
          const cachedImage: CachedImage = {
            data: imageData,
            timestamp: Date.now(),
            expiresIn: CACHE_DURATION_MS
          }
          localStorage.setItem(cacheKey, JSON.stringify(cachedImage))
          console.log(`Image cached after cleanup: ${idAmbiente}_${nameImage}`)
        } catch (retryError) {
          console.error('Failed to cache image even after cleanup:', retryError)
        }
      }
    }
  }

  /**
   * Update cache metadata
   */
  function updateCacheMetadata(): void {
    try {
      const metadata: CacheMetadata = {
        lastCleanup: Date.now()
      }
      localStorage.setItem(CACHE_METADATA_KEY, JSON.stringify(metadata))
    } catch (error) {
      console.error('Error updating cache metadata:', error)
    }
  }

  /**
   * Clean up expired cache entries
   */
  function cleanupExpiredCache(): void {
    try {
      const keysToRemove: string[] = []
      const now = Date.now()

      // Find all cache keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(CACHE_PREFIX)) {
          try {
            const cachedData = localStorage.getItem(key)
            if (cachedData) {
              const cachedImage: CachedImage = JSON.parse(cachedData)
              if (!isValidCache(cachedImage)) {
                keysToRemove.push(key)
              }
            }
          } catch (error) {
            // If we can't parse the cached data, remove it
            keysToRemove.push(key)
          }
        }
      }

      // Remove expired entries
      keysToRemove.forEach(key => {
        localStorage.removeItem(key)
      })

      console.log(`Cleaned up ${keysToRemove.length} expired cache entries`)
      updateCacheMetadata()
    } catch (error) {
      console.error('Error during cache cleanup:', error)
    }
  }

  /**
   * Check if cleanup is needed and perform it
   */
  function performPeriodicCleanup(): void {
    try {
      const metadataStr = localStorage.getItem(CACHE_METADATA_KEY)
      const now = Date.now()

      if (!metadataStr) {
        // First time setup
        cleanupExpiredCache()
        return
      }

      const metadata: CacheMetadata = JSON.parse(metadataStr)
      
      // Perform cleanup if it's been more than a day since last cleanup
      if (now - metadata.lastCleanup > CLEANUP_INTERVAL_MS) {
        cleanupExpiredCache()
      }
    } catch (error) {
      console.error('Error during periodic cleanup check:', error)
      // If we can't read metadata, just perform cleanup
      cleanupExpiredCache()
    }
  }

  /**
   * Clear all cached images (for debugging/maintenance)
   */
  function clearAllCache(): void {
    try {
      const keysToRemove: string[] = []
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && (key.startsWith(CACHE_PREFIX) || key === CACHE_METADATA_KEY)) {
          keysToRemove.push(key)
        }
      }

      keysToRemove.forEach(key => {
        localStorage.removeItem(key)
      })

      console.log(`Cleared all image cache entries (${keysToRemove.length} items)`)
    } catch (error) {
      console.error('Error clearing cache:', error)
    }
  }

  /**
   * Get cache statistics
   */
  function getCacheStats() {
    try {
      let totalEntries = 0
      let validEntries = 0
      let expiredEntries = 0
      let totalSizeBytes = 0

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(CACHE_PREFIX)) {
          totalEntries++
          const cachedData = localStorage.getItem(key)
          if (cachedData) {
            totalSizeBytes += cachedData.length * 2 // Approximate size (UTF-16)
            try {
              const cachedImage: CachedImage = JSON.parse(cachedData)
              if (isValidCache(cachedImage)) {
                validEntries++
              } else {
                expiredEntries++
              }
            } catch {
              expiredEntries++
            }
          }
        }
      }

      return {
        totalEntries,
        validEntries,
        expiredEntries,
        totalSizeKB: Math.round(totalSizeBytes / 1024),
        cacheDurationDays: CACHE_DURATION_MS / (24 * 60 * 60 * 1000)
      }
    } catch (error) {
      console.error('Error getting cache stats:', error)
      return null
    }
  }

  // Perform periodic cleanup on initialization
  performPeriodicCleanup()

  return {
    getCachedImage,
    setCachedImage,
    cleanupExpiredCache,
    clearAllCache,
    getCacheStats
  }
}