import ClientApiService from '@/abstractions/ClientApiService'
import environment from '@/_enviroments/enviroment'
import type GetAllAddressRequest from './GetAllAddressRequest'
import type { GetAllAddressResponse } from './GetAllAddressResponse'
import ClientApiServiceAsync from '@/abstractions/ClientApiServiceAsync'

export default class GetAllAddress {
  private api: ClientApiServiceAsync

  constructor() {
    const baseURL = environment.apiBaseUrl
    this.api = new ClientApiServiceAsync(baseURL)
  }

  /**
   * Obtiene todas las direcciones/ciudades disponibles.
   */
  async execute(request: GetAllAddressRequest): Promise<GetAllAddressResponse> {
    const response = await this.api.post<GetAllAddressResponse>('/GetAllAddressUseCase', request)
    return response
  }
}