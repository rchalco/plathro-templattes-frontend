import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.baseapp.client',
  appName: 'platheo-template-webapp',
  webDir: 'dist',
  plugins: {
    Camera: {
      photosPermissionRequired: true,
      photosPermissionStrategy: 'never', // No solicitar permiso para fotos
    },
  },
}

export default config
