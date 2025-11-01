import ClientApiService from '@/abstractions/ClientApiService'
import environment from '@/_enviroments/enviroment'
import type FindAmbientsRequest from './FindAmbientsRequest'
import type { FindAmbientsResponse } from './FindAmbientsResponse'
import ClientApiServiceAsync from '@/abstractions/ClientApiServiceAsync'
export default class FindAmbients {
  private api: ClientApiServiceAsync

  constructor() {
    const baseURL = environment.apiBaseUrl
    this.api = new ClientApiServiceAsync(baseURL)
  }

  /**
   * Busca ambientes.
   */
  async execute(request: FindAmbientsRequest): Promise<FindAmbientsResponse> {
    const response = await this.api.post<FindAmbientsResponse>('/FindAmbientUserCase', request)
    return response
  }
}
