import ClientApiService from '@/abstractions/ClientApiService'
import environment from '@/_enviroments/enviroment'
import type GetImageRequest from './GetImageRequest'
import type GetImageResponse from './GetImageResponse'
import ClientApiServiceAsync from '@/abstractions/ClientApiServiceAsync'
export default class GetImage {
  private api: ClientApiServiceAsync

  constructor() {
    const baseURL = environment.apiBaseUrl
    this.api = new ClientApiServiceAsync(baseURL)
  }

  /**
   * Busca ambientes.
   */
  async execute(request: GetImageRequest): Promise<GetImageResponse> {
    const response = await this.api.post<GetImageResponse>('/GetImageAmbientUseCase', request)
    return response
  }
}
