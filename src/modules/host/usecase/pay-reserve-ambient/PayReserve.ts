import ClientApiService from '@/abstractions/ClientApiService'
import environment from '@/_enviroments/enviroment'
import type PayReserveRequest from './PayReserveRequest'
import type { PayReserveResponse } from './PayReserveResponse'

export default class PayReserve {
  private api: ClientApiService

  constructor() {
    const baseURL = environment.apiBaseUrl
    this.api = new ClientApiService(baseURL)
  }

  /**
   * REaliza pago por el ambiente reservado.
   */
  async execute(request: PayReserveRequest): Promise<PayReserveResponse> {
    console.log('ServicioPago', request)
    const response = await this.api.post<PayReserveResponse>('/PayReserveUseCase', request)
    return response
  }
}
