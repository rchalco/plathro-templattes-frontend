import { defineStore } from 'pinia'
import { StepFindAmbients } from '../../components/find-ambients/models/StepFindAmbients'
import type Card from '../../components/find-ambients/models/CardModel'

export const StepFindAmbientsStore = defineStore('stepFindAmbientsStore', {
  state: () => ({
    stepFindAmbients: null as StepFindAmbients | null,
  }),
  actions: {
    initStep() {
      this.stepFindAmbients = StepFindAmbients.stepsForSearch()[0]
    },
    setStep(data: StepFindAmbients) {
      this.stepFindAmbients = data
    },
    setStepByIdStep(data: string) {
      this.stepFindAmbients =
        StepFindAmbients.stepsForSearch().find((step) => step.id === data) || null
    },
    setStepByIdStepWithCard(data: string, card: Card) {
      this.stepFindAmbients =
        StepFindAmbients.stepsForSearch().find((step) => step.id === data) || null
      if (this.stepFindAmbients) this.stepFindAmbients.currentCard = card || null
    },
    clearStep() {
      this.stepFindAmbients = null
    },
    getStep(): StepFindAmbients | null {
      return this.stepFindAmbients
    },
  },
})
