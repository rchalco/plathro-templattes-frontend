export default class ValidateUserRequest {
  user: string
  password: string
  versionApplication: string

  constructor(user: string, password: string, versionApplication: string) {
    this.user = user
    this.password = password
    this.versionApplication = versionApplication
  }
}
