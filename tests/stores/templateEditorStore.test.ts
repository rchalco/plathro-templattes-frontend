import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTemplateEditorStore } from '@/stores/templateEditorStore'

describe('templateEditorStore', () => {
  beforeEach(() => {
    // Create a fresh pinia instance for each test
    setActivePinia(createPinia())
  })

  describe('edit mode tracking', () => {
    it('should initialize with edit mode off and hasBeenEditedOnce false', () => {
      const store = useTemplateEditorStore()
      
      expect(store.isEditMode).toBe(false)
      expect(store.hasBeenEditedOnce).toBe(false)
    })

    it('should set hasBeenEditedOnce to true when toggling edit mode on', () => {
      const store = useTemplateEditorStore()
      
      store.toggleEditMode()
      
      expect(store.isEditMode).toBe(true)
      expect(store.hasBeenEditedOnce).toBe(true)
    })

    it('should keep hasBeenEditedOnce true even after toggling edit mode off', () => {
      const store = useTemplateEditorStore()
      
      // Toggle on
      store.toggleEditMode()
      expect(store.hasBeenEditedOnce).toBe(true)
      
      // Toggle off
      store.toggleEditMode()
      expect(store.isEditMode).toBe(false)
      expect(store.hasBeenEditedOnce).toBe(true)
    })

    it('should set hasBeenEditedOnce to true when calling setEditMode with true', () => {
      const store = useTemplateEditorStore()
      
      store.setEditMode(true)
      
      expect(store.isEditMode).toBe(true)
      expect(store.hasBeenEditedOnce).toBe(true)
    })

    it('should keep hasBeenEditedOnce true when calling setEditMode with false after it was true', () => {
      const store = useTemplateEditorStore()
      
      store.setEditMode(true)
      expect(store.hasBeenEditedOnce).toBe(true)
      
      store.setEditMode(false)
      expect(store.isEditMode).toBe(false)
      expect(store.hasBeenEditedOnce).toBe(true)
    })

    it('should not set hasBeenEditedOnce when calling setEditMode with false initially', () => {
      const store = useTemplateEditorStore()
      
      store.setEditMode(false)
      
      expect(store.isEditMode).toBe(false)
      expect(store.hasBeenEditedOnce).toBe(false)
    })
  })
})
