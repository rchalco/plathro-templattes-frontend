import { describe, it, expect, vi, beforeEach } from 'vitest'
import GetAllAddress from '@/modules/host/usecase/get-all-address/GetAllAddress'
import GetAllAddressRequest from '@/modules/host/usecase/get-all-address/GetAllAddressRequest'
import type { GetAllAddressResponse } from '@/modules/host/usecase/get-all-address/GetAllAddressResponse'
import ClientApiServiceAsync from '@/abstractions/ClientApiServiceAsync'

// Mock the ClientApiServiceAsync
vi.mock('@/abstractions/ClientApiServiceAsync')

describe('GetAllAddress', () => {
  let getAllAddress: GetAllAddress
  let mockApiService: any

  beforeEach(() => {
    mockApiService = {
      post: vi.fn(),
    }
    vi.mocked(ClientApiServiceAsync).mockImplementation(() => mockApiService)
    getAllAddress = new GetAllAddress()
  })

  describe('execute', () => {
    it('should return cities data when API call succeeds', async () => {
      // Arrange
      const mockResponse: GetAllAddressResponse = {
        citys: [{ city: 'La Paz' }, { city: 'Santa Cruz' }, { city: 'Cochabamba' }],
      }
      mockApiService.post.mockResolvedValue(mockResponse)

      const request = new GetAllAddressRequest()

      // Act
      const result = await getAllAddress.execute(request)

      // Assert
      expect(mockApiService.post).toHaveBeenCalledWith('/GetAllAddressUseCase', request)
      expect(result).toEqual(mockResponse)
      expect(result.citys).toHaveLength(3)
      expect(result.citys[0].city).toBe('La Paz')
    })

    it('should handle empty cities response', async () => {
      // Arrange
      const mockResponse: GetAllAddressResponse = {
        citys: [],
      }
      mockApiService.post.mockResolvedValue(mockResponse)

      const request = new GetAllAddressRequest()

      // Act
      const result = await getAllAddress.execute(request)

      // Assert
      expect(result.citys).toHaveLength(0)
    })

    it('should throw error when API call fails', async () => {
      // Arrange
      mockApiService.post.mockRejectedValue(new Error('API Error'))
      const request = new GetAllAddressRequest()

      // Act & Assert
      await expect(getAllAddress.execute(request)).rejects.toThrow('API Error')
    })
  })
})
