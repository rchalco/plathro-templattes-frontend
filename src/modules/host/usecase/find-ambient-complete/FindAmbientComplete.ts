import ClientApiService from '@/abstractions/ClientApiService'
import environment from '@/_enviroments/enviroment'
import type FindAmbientCompleteRequest from './FindAmbientCompleteRequest'
import type { FindAmbientCompleteResponse } from './FindAmbientCompleteResponse'

export default class FindAmbientComplete {
  private api: ClientApiService

  constructor() {
    const baseURL = environment.apiBaseUrl
    this.api = new ClientApiService(baseURL)
  }

  /**
   * Busca ambientes.
   */
  async execute(request: FindAmbientCompleteRequest): Promise<FindAmbientCompleteResponse> {
    const response = await this.api.post<FindAmbientCompleteResponse>(
      '/FindAmbientCompleteUseCase',
      request,
    )
    return response
  }
}
