import { defineStore } from 'pinia'
import type { FindAmbientCompleteResponse } from '@/modules/host/usecase/find-ambient-complete/FindAmbientCompleteResponse'

export const FindAmbientCompleteResponseStore = defineStore('findAmbientComplete', {
  state: () => ({
    ambient: null as FindAmbientCompleteResponse | null,
  }),
  actions: {
    setAmbient(data: FindAmbientCompleteResponse) {
      this.ambient = data
    },
    clearAmbient() {
      this.ambient = null
    },
    getAmbient(): FindAmbientCompleteResponse | null {
      return this.ambient
    }
  },
})
