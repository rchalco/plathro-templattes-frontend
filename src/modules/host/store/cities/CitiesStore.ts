import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  CityOutputDetail,
  GetAllAddressResponse,
} from '@/modules/host/usecase/get-all-address/GetAllAddressResponse'
export const CitiesStore = defineStore('cities', () => {
  // Estado: lista de ciudades disponibles
  const cities = ref<CityOutputDetail[]>([])

  // Acción para setear las ciudades
  function setCities(response: GetAllAddressResponse) {
    cities.value = response.citys
  }

  // Acción para limpiar las ciudades
  function clearCities() {
    cities.value = []
  }

  // Getter para obtener las ciudades
  function getCities() {
    return cities.value
  }

  // Getter para buscar ciudades que coincidan con un término
  function filterCities(searchTerm: string) {
    if (!searchTerm.trim()) return []
    return cities.value.filter((city) => city.city.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  return {
    cities,
    setCities,
    clearCities,
    getCities,
    filterCities,
  }
})
