import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import ClientApiService from '../../src/abstractions/ClientApiService'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

// Mock DOM methods
Object.defineProperty(document, 'createElement', {
  value: vi.fn(() => ({
    appendChild: vi.fn(),
    style: {}
  })),
  writable: true
})

Object.defineProperty(document.body, 'appendChild', {
  value: vi.fn(),
  writable: true
})

// Mock Vue components and functions more completely
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>()
  return {
    ...actual,
    h: vi.fn(),
    ref: vi.fn(() => ({ value: false })),
    createApp: vi.fn(() => ({
      mount: vi.fn(() => ({}))
    }))
  }
})

// Mock the CustomLoader component
vi.mock('@/components/loader/CustomLoader.vue', () => ({
  default: {}
}))

describe('ClientApiService', () => {
  let api: ClientApiService
  const mockCreate = vi.fn()
  
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock axios.create
    mockCreate.mockReturnValue({
      request: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() }
      },
      defaults: {
        headers: { common: {} }
      }
    })
    mockedAxios.create = mockCreate
    
    api = new ClientApiService('https://test-api.com')
  })

  it('should create axios instance with correct config', () => {
    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://test-api.com',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      },
    })
  })

  it('should perform a GET request', async () => {
    const mockResponse = { data: { success: true } }
    const mockRequest = vi.fn().mockResolvedValue(mockResponse)
    
    // Mock the client request method
    Object.assign(api, {
      client: {
        request: mockRequest,
        defaults: { headers: { common: {} } }
      }
    })

    const response = await api.get<{ success: boolean }>('/posts')
    
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: '/posts',
      params: undefined,
      headers: {}
    })
    expect(response).toEqual({ success: true })
  })

  it('should perform a POST request', async () => {
    const mockResponse = { data: { id: 1 } }
    const mockRequest = vi.fn().mockResolvedValue(mockResponse)
    
    // Mock the client request method
    Object.assign(api, {
      client: {
        request: mockRequest,
        defaults: { headers: { common: {} } }
      }
    })

    const response = await api.post<{ id: number }, { name: string }>('/posts', { name: 'John' })
    
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: '/posts',
      data: { name: 'John' },
      headers: {}
    })
    expect(response).toEqual({ id: 1 })
  })

  it('should handle errors correctly', async () => {
    const mockError = new Error('Network error')
    const mockRequest = vi.fn().mockRejectedValue(mockError)
    
    // Mock the client request method
    Object.assign(api, {
      client: {
        request: mockRequest,
        defaults: { headers: { common: {} } }
      }
    })

    await expect(api.get('/nonexistent')).rejects.toThrow('Network error')
  })
})
