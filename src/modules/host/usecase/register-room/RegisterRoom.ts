import ClientApiService from '@/abstractions/ClientApiService'
import type RegisterRoomRequest from './RegisterRoomRequest' // Corrección de la ruta
import type RegisterRoomResponse from './RegisterRoomResponse'
import environment from '@/_enviroments/enviroment'

export default class RegisterRoom {
  private api: ClientApiService

  constructor() {
    const baseURL = environment.apiBaseUrl
    this.api = new ClientApiService(baseURL)
  }

  /**
   * Registra un nuevo ambiente.
   * @param request - Instancia de RegisterRoomRequest con los datos del ambiente.
   * @returns Una promesa que resuelve con un objeto de tipo RegisterRoomResponse si el registro es exitoso.
   * @throws Error si ocurre un problema con la API.
   */
  async execute(request: RegisterRoomRequest): Promise<RegisterRoomResponse> {
    const response = await this.api.post<RegisterRoomResponse>('/RegisterRoomUseCase', request)
    return response
  }
}
