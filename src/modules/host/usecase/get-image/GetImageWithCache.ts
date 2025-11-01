import ClientApiService from '@/abstractions/ClientApiService'
import environment from '@/_enviroments/enviroment'
import type GetImageRequest from './GetImageRequest'
import type GetImageResponse from './GetImageResponse'
import { useImageCache } from '@/composables/useImageCache'
import ClientApiServiceAsync from '@/abstractions/ClientApiServiceAsync'

export default class GetImageWithCache {
  private api: ClientApiServiceAsync
  private imageCache = useImageCache()

  constructor() {
    const baseURL = environment.apiBaseUrl
    this.api = new ClientApiServiceAsync(baseURL)
  }

  /**
   * Get image with cache-first strategy.
   * Checks cache first, then fetches from API if not found or expired.
   */
  async execute(request: GetImageRequest): Promise<GetImageResponse> {
    const { idAmbiente, nameImage } = request

    // Try to get from cache first
    const cachedImage = this.imageCache.getCachedImage(idAmbiente, nameImage)

    if (cachedImage) {
      // Return cached image
      return {
        fotoB64: cachedImage,
      } as GetImageResponse
    }

    // Cache miss - fetch from API
    console.log(`Cache miss for image: ${idAmbiente}_${nameImage}, fetching from API...`)

    try {
      const response = await this.api.post<GetImageResponse>('/GetImageAmbientUseCase', request)

      // Cache the response if we got valid image data
      if (response && response.fotoB64) {
        this.imageCache.setCachedImage(idAmbiente, nameImage, response.fotoB64)
      }

      return response
    } catch (error) {
      console.error('Error fetching image from API:', error)
      throw error
    }
  }

  /**
   * Force refresh an image by bypassing cache
   */
  async forceRefresh(request: GetImageRequest): Promise<GetImageResponse> {
    console.log(`Force refreshing image: ${request.idAmbiente}_${request.nameImage}`)

    try {
      const response = await this.api.post<GetImageResponse>('/GetImageAmbientUseCase', request)

      // Update cache with fresh data
      if (response && response.fotoB64) {
        this.imageCache.setCachedImage(request.idAmbiente, request.nameImage, response.fotoB64)
      }

      return response
    } catch (error) {
      console.error('Error force refreshing image from API:', error)
      throw error
    }
  }

  /**
   * Get cache statistics for debugging
   */
  getCacheStats() {
    return this.imageCache.getCacheStats()
  }

  /**
   * Clear all cached images
   */
  clearCache() {
    this.imageCache.clearAllCache()
  }
}
