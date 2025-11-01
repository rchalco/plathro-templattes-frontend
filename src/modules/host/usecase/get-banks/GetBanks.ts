import ClientApiService from '@/abstractions/ClientApiService'
import environment from '@/_enviroments/enviroment'
import type { GetListBanksRequest } from './GetBanksRequest'
import type { GetListBanksResponse } from './GetBanksResponse'

export default class GetBanks {
  private api: ClientApiService

  constructor() {
    const baseURL = environment.apiBaseUrl
    this.api = new ClientApiService(baseURL)
  }

  /**
   * Obtiene los bancos disponibles.
   * @returns Una promesa que resuelve con la respuesta de los bancos.
   */
  async execute(request: GetListBanksRequest): Promise<GetListBanksResponse> {
    const response = await this.api.post<GetListBanksResponse>('/GetListBankUseCase', request)
    return response
  }
}
