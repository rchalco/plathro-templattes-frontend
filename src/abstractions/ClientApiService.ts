import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from 'axios'
import { h, ref } from 'vue'
import CustomLoader from '@/components/loader/CustomLoader.vue'
import { createApp } from 'vue'
import { useUserStore } from '@/modules/security/store/userStore'

class ClientApiService {
  private client: AxiosInstance
  private static loaderInstance: unknown = null
  private static loaderApp: unknown = null
  private static isLoading = ref(false)

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

    // Crear y montar el componente loader
    if (!ClientApiService.loaderInstance) {
      const loaderContainer = document.createElement('div')
      document.body.appendChild(loaderContainer)

      // Creamos una nueva instancia de Vue con el componente
      const app = createApp({
        setup() {
          return () =>
            h(CustomLoader, {
              isLoading: ClientApiService.isLoading.value,
            })
        },
      })

      ClientApiService.loaderApp = app
      ClientApiService.loaderInstance = app.mount(loaderContainer)
    }

    // Interceptores para mostrar/ocultar el loader
    this.client.interceptors.request.use(
      (config) => {
        ClientApiService.isLoading.value = true
        const token = useUserStore().userToken.value // O donde guardes tu token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        ClientApiService.isLoading.value = false
        return Promise.reject(error)
      },
    )

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        ClientApiService.isLoading.value = false
        return response
      },
      async (error: AxiosError) => {
        ClientApiService.isLoading.value = false

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

export default ClientApiService
