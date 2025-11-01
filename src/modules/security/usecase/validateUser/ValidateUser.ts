import ClientApiService from '@/abstractions/ClientApiService'
import ValidateUserResponse from './ValidateUserResponse'
import ValidateUserRequest from './ValidateUserRequest'
import environment from '@/_enviroments/enviroment'

export default class ValidateUser {
  private api: ClientApiService

  constructor() {
    const baseURL = environment.apiBaseUrl
    this.api = new ClientApiService(baseURL)
  }

  /**
   * Valida las credenciales del usuario.
   * @param request - Instancia de ValidateUserRequest con los datos del usuario.
   * @returns Una promesa que resuelve con un objeto de tipo ValidateUserResponse si las credenciales son válidas.
   * @throws Error si las credenciales son inválidas o ocurre un problema con la API.
   */
  async execute(request: ValidateUserRequest): Promise<ValidateUserResponse> {
    const response = await this.api.post<ValidateUserResponse>('/VerifyCredentialUseCase', request)
    return response
  }
}
