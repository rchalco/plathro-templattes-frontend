export default class VerifyCredentialOAuthOutput {
  isValid: boolean = false
  idUser: string = ''
  idSession: number = 0
  token: string = ''
  expiration: string = '' // ISO string, use Date if you want: expiration: Date;
  message: string = ''
  namePerson: string = ''
  pictureUrl: string = ''
}
