import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTemplateEditorStore = defineStore('templateEditor', () => {
  const isEditMode = ref(false)
  const hasBeenEditedOnce = ref(false)

  const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value
    if (isEditMode.value) {
      hasBeenEditedOnce.value = true
    }
  }

  const setEditMode = (value: boolean) => {
    isEditMode.value = value
    if (value) {
      hasBeenEditedOnce.value = true
    }
  }

  return {
    isEditMode,
    hasBeenEditedOnce,
    toggleEditMode,
    setEditMode,
  }
})
