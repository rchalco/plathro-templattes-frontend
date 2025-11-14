<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Save Content</h2>
        <button class="close-button" @click="close" aria-label="Close">×</button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-group">
          <label for="subpath">Subportal Name</label>
          <div class="subpath-input-wrapper">
            <span class="url-prefix">www.platheo.com/</span>
            <input
              id="subpath"
              v-model="subpath"
              type="text"
              placeholder="subportal-name"
              required
              pattern="[a-z0-9\-]+"
              title="Only lowercase letters, numbers and hyphens"
              class="subpath-input"
            />
          </div>
          <small class="help-text">Only lowercase letters, numbers and hyphens</small>
        </div>

        <div class="form-group">
          <label class="toggle-label">
            <input
              v-model="publishNow"
              type="checkbox"
              class="toggle-checkbox"
            />
            <span class="toggle-text">Publish now</span>
          </label>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { TemplateContentService } from '@/services/templateContentService'
import { useTemplateEditorStore } from '@/stores/templateEditorStore'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const editorStore = useTemplateEditorStore()
const { savedDomainName } = storeToRefs(editorStore)

const subpath = ref('')
const publishNow = ref(false)
const isSubmitting = ref(false)

// Load saved domain name when modal opens
watch(() => props.isOpen, (newValue) => {
  if (newValue && savedDomainName.value) {
    subpath.value = savedDomainName.value
  }
})

const close = () => {
  emit('close')
  // Don't reset form anymore to preserve the domain name
  publishNow.value = false
}

// Compress JSON data using gzip-like compression (simple approach)
const compressData = (data: string): string => {
  // For a real implementation, you might use pako or similar library
  // For now, we'll just stringify and encode to base64 as a simple compression
  return btoa(encodeURIComponent(data))
}

const handleSubmit = async () => {
  if (!subpath.value.trim()) {
    return
  }

  isSubmitting.value = true

  try {
    // Save domain name to store
    editorStore.setDomainName(subpath.value.trim())

    // Get the JSON from localStorage
    const content = TemplateContentService.loadContent()
    const jsonData = JSON.stringify(content)
    
    // Compress the data
    const compressedData = compressData(jsonData)

    // Create FormData for multipart request
    const formData = new FormData()
    formData.append('subpath', subpath.value.trim())
    formData.append('content', compressedData)
    formData.append('publishNow', publishNow.value.toString())
    formData.append('timestamp', new Date().toISOString())

    // Mock API call - In a real implementation, this would be an actual API endpoint
    await mockApiCall(formData)

    // Navigate to home on success
    router.push('/home')
    close()
  } catch (error) {
    console.error('Error saving changes:', error)
    alert('Error saving changes. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Mock API function
const mockApiCall = (formData: FormData): Promise<void> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      console.log('Mock API Call - Sending data:')
      console.log('Subpath:', formData.get('subpath'))
      console.log('Publish Now:', formData.get('publishNow'))
      console.log('Timestamp:', formData.get('timestamp'))
      console.log('Content length:', (formData.get('content') as string)?.length || 0)
      
      // Simulate successful response
      resolve()
    }, 1000)
  })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #111827;
}

.close-button {
  background: none;
  border: none;
  font-size: 32px;
  line-height: 1;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}

.close-button:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
}

.subpath-input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.subpath-input-wrapper:focus-within {
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.url-prefix {
  background-color: #f9fafb;
  padding: 10px 12px;
  color: #6b7280;
  font-size: 14px;
  border-right: 1px solid #d1d5db;
  white-space: nowrap;
}

.subpath-input {
  flex: 1;
  border: none;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
}

.help-text {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #6b7280;
}

.toggle-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.toggle-checkbox {
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.toggle-text {
  font-size: 14px;
  color: #374151;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.btn-primary {
  background-color: #2196f3;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1976d2;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .modal-content {
    max-width: 100%;
    margin: 0;
  }

  .url-prefix {
    font-size: 12px;
    padding: 8px 10px;
  }

  .subpath-input {
    font-size: 12px;
  }
}
</style>
