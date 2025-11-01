import { Preferences } from '@capacitor/preferences'
import VerifyCredentialOAuthOutput from '@/modules/security/models/VerifyCredentialOAuthOutput'
import { ref, computed } from 'vue'

// Private key for secure storage
const USER_STORAGE_KEY = 'oauth_user_data'

// Reactive state
const oAuthUser = ref<VerifyCredentialOAuthOutput | null>(null)

class UserStore {
  // Initialize and load stored user data
  async init() {
    try {
      const { value } = await Preferences.get({ key: USER_STORAGE_KEY })
      if (value) {
        const userData = JSON.parse(value)
        oAuthUser.value = Object.assign(new VerifyCredentialOAuthOutput(), userData)
      }
    } catch (error) {
      console.error('Error loading user data from storage:', error)
      oAuthUser.value = null
    }
  }

  // Store user data securely
  async setOAuthUser(user: VerifyCredentialOAuthOutput) {
    try {
      // Si recibes un objeto plano, puedes convertirlo en instancia de la clase:
      const userInstance = Object.assign(new VerifyCredentialOAuthOutput(), user)
      oAuthUser.value = userInstance

      // Store securely
      await Preferences.set({
        key: USER_STORAGE_KEY,
        value: JSON.stringify(userInstance),
      })
    } catch (error) {
      console.error('Error storing user data:', error)
    }
  }

  // Clear user data
  async clearOAuthUser() {
    try {
      oAuthUser.value = null
      await Preferences.remove({ key: USER_STORAGE_KEY })
    } catch (error) {
      console.error('Error clearing user data:', error)
    }
  }

  // Check if token is expired
  isTokenExpired(): boolean {
    if (!oAuthUser.value?.expiration) return true

    try {
      const expirationDate = new Date(oAuthUser.value.expiration)
      const now = new Date()
      return now >= expirationDate
    } catch (error) {
      console.error('Error parsing token expiration date:', error)
      return true
    }
  }

  // Getters as computed properties
  get isAuthenticated() {
    return computed(() => {
      if (!oAuthUser.value?.isValid) return false
      if (this.isTokenExpired()) {
        // Token expirado, limpiar datos
        this.clearOAuthUser()
        return false
      }
      return true
    })
  }

  get userName() {
    return computed(() => oAuthUser.value?.namePerson || '')
  }

  get userPicture() {
    return computed(() => oAuthUser.value?.pictureUrl || '')
  }

  get userToken() {
    return computed(() => oAuthUser.value?.token || '')
  }

  get tokenExpiration() {
    return computed(() => oAuthUser.value?.expiration || '')
  }

  get SessionId() {
    return computed(() => oAuthUser.value?.idSession || 0)
  }

  get userMessage() {
    return computed(() => oAuthUser.value?.message || '')
  }

  // Logout and redirect to login
  async logout() {
    await this.clearOAuthUser()

    // Redirigir al login
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  // Access to reactive user object for backward compatibility
  get user() {
    return computed(() => oAuthUser.value)
  }
}

// Create singleton instance
const userStore = new UserStore()

// Verificar el token periódicamente (cada 5 minutos)
setInterval(
  () => {
    if (userStore.user.value && userStore.isTokenExpired()) {
      console.log('Token expirado detectado, cerrando sesión...')
      userStore.logout()
    }
  },
  5 * 60 * 1000,
) // 5 minutos

// Export function to get the store instance
export const useUserStore = () => {
  return userStore
}
