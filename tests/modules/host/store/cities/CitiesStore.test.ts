import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { CitiesStore } from '@/modules/host/store/cities/CitiesStore'
import type { GetAllAddressResponse } from '@/modules/host/usecase/get-all-address/GetAllAddressResponse'

describe('CitiesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('setCities', () => {
    it('should store cities data', () => {
      // Arrange
      const store = CitiesStore()
      const response: GetAllAddressResponse = {
        citys: [
          { city: 'La Paz' },
          { city: 'Santa Cruz' },
          { city: 'Cochabamba' }
        ]
      }

      // Act
      store.setCities(response)

      // Assert
      expect(store.cities).toHaveLength(3)
      expect(store.getCities()).toEqual(response.citys)
    })
  })

  describe('clearCities', () => {
    it('should clear all cities', () => {
      // Arrange
      const store = CitiesStore()
      const response: GetAllAddressResponse = {
        citys: [{ city: 'La Paz' }, { city: 'Santa Cruz' }]
      }
      store.setCities(response)

      // Act
      store.clearCities()

      // Assert
      expect(store.cities).toHaveLength(0)
      expect(store.getCities()).toEqual([])
    })
  })

  describe('filterCities', () => {
    it('should filter cities by search term', () => {
      // Arrange
      const store = CitiesStore()
      const response: GetAllAddressResponse = {
        citys: [
          { city: 'La Paz' },
          { city: 'Santa Cruz' },
          { city: 'Cochabamba' },
          { city: 'Tarija' },
          { city: 'Sucre' }
        ]
      }
      store.setCities(response)

      // Act
      const filteredResults = store.filterCities('La')

      // Assert
      expect(filteredResults).toHaveLength(1)
      expect(filteredResults[0].city).toBe('La Paz')
    })

    it('should return empty array for non-matching search', () => {
      // Arrange
      const store = CitiesStore()
      const response: GetAllAddressResponse = {
        citys: [{ city: 'La Paz' }, { city: 'Santa Cruz' }]
      }
      store.setCities(response)

      // Act
      const filteredResults = store.filterCities('NonExistent')

      // Assert
      expect(filteredResults).toHaveLength(0)
    })

    it('should return empty array for empty search term', () => {
      // Arrange
      const store = CitiesStore()
      const response: GetAllAddressResponse = {
        citys: [{ city: 'La Paz' }, { city: 'Santa Cruz' }]
      }
      store.setCities(response)

      // Act
      const filteredResults = store.filterCities('')

      // Assert
      expect(filteredResults).toHaveLength(0)
    })

    it('should filter case insensitively', () => {
      // Arrange
      const store = CitiesStore()
      const response: GetAllAddressResponse = {
        citys: [
          { city: 'La Paz' },
          { city: 'Santa Cruz' }
        ]
      }
      store.setCities(response)

      // Act
      const filteredResults = store.filterCities('santa')

      // Assert
      expect(filteredResults).toHaveLength(1)
      expect(filteredResults[0].city).toBe('Santa Cruz')
    })
  })
})