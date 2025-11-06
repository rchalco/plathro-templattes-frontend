import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from './firebase' // ✅ Importar `auth` ya inicializado
import environment from '@/_enviroments/enviroment'
import ClientApiService from '@/abstractions/ClientApiService'
import VerifyCredentialOAuthOutput from '@/modules/security/models/VerifyCredentialOAuthOutput'
import VerifyCredentialOAuthInput, {
  ProviderEnum,
} from '@/modules/security/models/VerifyCredentialOAuthInput'
import { useUserStore } from '@/modules/security/store/userStore'

export async function loginWithProvider(providerKey: 'google' | 'facebook' | 'apple') {
  const baseURL = environment.apiBaseUrl
  const api = new ClientApiService(baseURL)
  let provider
  const request = new VerifyCredentialOAuthInput()
  switch (providerKey) {
    case 'google':
      provider = new GoogleAuthProvider()
      request.provider = ProviderEnum.google
      break
    case 'facebook':
      provider = new FacebookAuthProvider()
      request.provider = ProviderEnum.facebook
      break
    case 'apple':
      provider = new OAuthProvider('apple.com')
      provider.addScope('email')
      provider.addScope('name')
      request.provider = ProviderEnum.apple
      break
  }

  const result = await signInWithPopup(auth, provider)
  const idToken = await result.user.getIdToken()

  if (!idToken) {
    throw new Error('No se pudo obtener el token de ID de Firebase')
  }
  //console.log('ID Token:', idToken)
  request.token = idToken
  // Enviar token al backend
  const response = await api.post<VerifyCredentialOAuthOutput>(
    '/VerifyCredentialOAuthUseCase',
    request,
  )
  const userStore = useUserStore()
  await userStore.setOAuthUser(response)
}
