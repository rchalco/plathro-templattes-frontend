export default class ValidateUserResponse {
  isValid: boolean
  token: string | null
  expiration: string
  message: string | null

  constructor(isValid: boolean, token: string | null, expiration: string, message: string | null) {
    this.isValid = isValid
    this.token = token
    this.expiration = expiration
    this.message = message
  }
}
