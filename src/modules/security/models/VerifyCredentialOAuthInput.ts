export enum ProviderEnum {
  none = 0,
  google = 1,
  facebook = 2,
  apple = 3,
}

export default class VerifyCredentialOAuthInput {
  provider: ProviderEnum = ProviderEnum.none
  token: string = ''
}
