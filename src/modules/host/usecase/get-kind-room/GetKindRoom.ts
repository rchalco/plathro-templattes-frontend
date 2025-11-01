import ClientApiService from '@/abstractions/ClientApiService'
import environment from '@/_enviroments/enviroment'
import type { GetKindRoomRequest } from './GetKindRoomRequest'
import type { GetKindRoomResponse } from './GetBanksResponse'

export default class GetKindRoom {
  private api: ClientApiService

  constructor() {
    const baseURL = environment.apiBaseUrl
    this.api = new ClientApiService(baseURL)
  }

  /**
   * Obtiene los bancos disponibles.
   * @returns Una promesa que resuelve con la respuesta de los bancos.
   */
  async execute(request: GetKindRoomRequest): Promise<GetKindRoomResponse> {
    const response = await this.api.post<GetKindRoomResponse>('/GetKindRoomUseCase', request)
    return response
  }
}
