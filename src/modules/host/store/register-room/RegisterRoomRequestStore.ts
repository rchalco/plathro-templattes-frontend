import { defineStore } from 'pinia'
import RegisterRoomRequest from '../../usecase/register-room/RegisterRoomRequest'

export const useRegisterRoomStore = defineStore('registerRoom', {
  state: () => ({
    registerRoomData: null as RegisterRoomRequest | null,
  }),
  actions: {
    setRegisterRoomData(payload: RegisterRoomRequest) {
      this.registerRoomData = payload
    },
    resetRegisterRoomData() {
      this.registerRoomData = null
    },
  },
  getters: {
    isRoomAvailable: (state) => state.registerRoomData?.disponible === 1,
    getRegisterRoomData: (state) => state.registerRoomData,
  },
})
