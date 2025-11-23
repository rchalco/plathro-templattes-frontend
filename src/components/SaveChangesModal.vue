<template>
  <Teleport to="body">
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
              <input id="subpath" v-model="subpath" type="text" placeholder="subportal-name" required
                pattern="[a-z0-9\-]+" title="Only lowercase letters, numbers and hyphens" class="subpath-input" />
            </div>
            <small class="help-text">Only lowercase letters, numbers and hyphens</small>
          </div>

          <div class="form-group">
            <label class="toggle-label">
              <input v-model="publishNow" type="checkbox" class="toggle-checkbox" />
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
  </Teleport>
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
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  padding: 20px;
  backdrop-filter: blur(8px);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 520px;
  width: 100%;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 12px 24px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 32px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px 16px 0 0;
  position: relative;
}

.modal-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 32px;
  right: 32px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
}

.modal-header h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.close-button {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  font-size: 18px;
  line-height: 1;
  color: #64748b;
  cursor: pointer;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.close-button:hover {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
}

.modal-body {
  padding: 32px;
  background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
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
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.subpath-input-wrapper:focus-within {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1), 0 4px 8px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
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
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-secondary {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #475569;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
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
