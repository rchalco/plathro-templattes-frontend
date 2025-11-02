import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTemplateEditorStore = defineStore('templateEditor', () => {
  const isEditMode = ref(false)

  const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value
  }

  const setEditMode = (value: boolean) => {
    isEditMode.value = value
  }

  return {
    isEditMode,
    toggleEditMode,
    setEditMode,
  }
})
