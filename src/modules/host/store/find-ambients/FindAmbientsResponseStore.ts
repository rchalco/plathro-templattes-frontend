import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  FindAmbientsResponse,
  FindAmbientOutputDetail,
} from '@/modules/host/usecase/find-ambients/FindAmbientsResponse'

export const FindAmbientsResponseStore = defineStore('findAmbients', () => {
  // Estado: lista de ambientes encontrados
  const ambients = ref<FindAmbientOutputDetail[]>([])

  // Acción para setear los ambientes
  function setAmbients(response: FindAmbientsResponse) {
    ambients.value = response.ambients
  }

  // Acción para limpiar los ambientes
  function clearAmbients() {
    ambients.value = []
  }

  // Getter para obtener los ambientes
  function getAmbients() {
    return ambients.value
  }

  return {
    ambients,
    setAmbients,
    clearAmbients,
    getAmbients,
  }
})
