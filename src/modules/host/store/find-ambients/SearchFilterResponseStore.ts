import { defineStore } from 'pinia'
import type FindAmbientsRequest from '../../usecase/find-ambients/FindAmbientsRequest'

export const SearchFilterResponseStore = defineStore('searchFilter', {
  state: () => ({
      searchAmbient: null as FindAmbientsRequest | null,
    }),
    actions: {
      setFilter(data: FindAmbientsRequest) {
        this.searchAmbient = data
      },
      clearFilter() {
        this.searchAmbient = null
      },
      getFilter(): FindAmbientsRequest | null {
        return this.searchAmbient
      }
    },
  })


