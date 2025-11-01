import ClientApiService from '@/abstractions/ClientApiService'
import environment from '@/_enviroments/enviroment'
import type HostSchedulerRequest from './HostSchedulerRequest'
import type { HostSchedulerResponse } from './HostSchedulerResponse'

export default class HostScheduler {
  private api: ClientApiService

  constructor() {
    const baseURL = environment.apiBaseUrl
    this.api = new ClientApiService(baseURL)
  }

  /**
   * Obtiene reservar por usuario.
   */
  async execute(request: HostSchedulerRequest): Promise<HostSchedulerResponse> {
    const response = await this.api.post<HostSchedulerResponse>('/HostSchedulerUserCase', request)
    return response
  }
}
