import { ref } from 'vue'

export interface MapPosition {
  lat: number
  lng: number
}

export function useGoogleMap() {
  const defaultCenter: MapPosition = { lat: -16.504814, lng: -68.130417 }
  const center = ref(defaultCenter)
  const zoom = ref(13)
  const markerPosition = ref(defaultCenter)

  const obtenerUbicacionActual = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocalización no soportada'))
        return
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      })
    })
  }

  const actualizarUbicacion = async () => {
    try {
      const position = await obtenerUbicacionActual()
      const newPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      center.value = newPosition
      markerPosition.value = newPosition
      return newPosition
    } catch (error) {
      console.error('Error al obtener la ubicación:', error)
      return defaultCenter
    }
  }

  return {
    center,
    zoom,
    markerPosition,
    actualizarUbicacion,
    defaultCenter,
  }
}
