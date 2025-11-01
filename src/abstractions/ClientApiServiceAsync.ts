import { useUserStore } from '@/modules/security/store/userStore'
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
class ClientApiServiceAsync {
  private client: AxiosInstance
  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      },
    })

    // Interceptores para autenticación
    this.client.interceptors.request.use(
      (config) => {
        const token = useUserStore().userToken.value
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    // Interceptor de respuesta para manejar errores de autenticación
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Manejar errores de autenticación (401, 403)
        if (error.response?.status === 401 || error.response?.status === 403) {
          const userStore = useUserStore()
          console.log('Token inválido o expirado, redirigiendo al login...')
          await userStore.logout()
        }

        return Promise.reject(error)
      },
    )
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.request<T>({
      ...config,
      headers: {
        ...this.client.defaults.headers.common,
        ...config.headers,
      },
    })
    return response.data
  }

  async get<T, P = unknown>(endpoint: string, params?: P): Promise<T> {
    return this.request<T>({ method: 'GET', url: endpoint, params })
  }

  async post<T, P = unknown>(endpoint: string, data?: P): Promise<T> {
    return this.request<T>({ method: 'POST', url: endpoint, data })
  }

  async put<T, P = unknown>(endpoint: string, data?: P): Promise<T> {
    return this.request<T>({ method: 'PUT', url: endpoint, data })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>({ method: 'DELETE', url: endpoint })
  }
}

export default ClientApiServiceAsync
