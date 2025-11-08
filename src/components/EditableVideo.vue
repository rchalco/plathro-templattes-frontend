<template>
  <div class="editable-video">
    <YouTubePlayer :videoUrl="displayValue" :width="width" :height="height" />

    <div v-if="isEditMode" class="video-edit-controls">
      <div class="input-group">
        <input v-model="localValue" @blur="handleBlur" @keydown.enter="handleEnter" @keydown.esc="handleEscape"
          @input="handleInput" type="text" placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
          class="video-url-input" :class="{ 'has-error': validationError, 'is-valid': isValidUrl && localValue }"
          aria-label="YouTube video URL" />
        <button v-if="localValue && localValue !== displayValue" @click="clearValue" class="clear-button" type="button"
          aria-label="Clear URL" title="Clear URL">
          ✕
        </button>
      </div>

      <div v-if="validationError" class="validation-message error">
        {{ validationError }}
      </div>

      <div v-if="isValidUrl && localValue && !validationError" class="validation-message success">
        ✓ Valid YouTube URL
      </div>

      <div v-if="isSaving" class="saving-indicator">
        Saving...
      </div>

      <div class="hint-text">
        Supported formats: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTemplateEditorStore } from '@/stores/templateEditorStore'
import { TemplateContentService } from '@/services/templateContentService'
import YouTubePlayer from './YouTubePlayer.vue'

interface Props {
  pageName: string
  componentName: string
  elementId: string
  defaultValue?: string
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  width: '100%',
  height: '315',
})

const editorStore = useTemplateEditorStore()
const { isEditMode } = storeToRefs(editorStore)

const localValue = ref('')
const validationError = ref('')
const isSaving = ref(false)
const originalValue = ref('')

// YouTube URL validation patterns
const youtubePatterns = [
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
  /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
]

// Validate YouTube URL
const isValidUrl = computed(() => {
  if (!localValue.value) return false
  return youtubePatterns.some(pattern => pattern.test(localValue.value))
})

// Load value from storage
const loadValue = () => {
  try {
    const value = TemplateContentService.getElementValue(
      props.pageName,
      props.componentName,
      props.elementId,
      props.defaultValue,
      'video',
    )
    localValue.value = value
    originalValue.value = value
    validationError.value = ''
  } catch (error) {
    console.error('Error loading video URL:', error)
    validationError.value = 'Error loading video URL'
  }
}

// Initial load
loadValue()

// Watch for page/component changes
watch([() => props.pageName, () => props.componentName, () => props.elementId], () => {
  loadValue()
})

const displayValue = computed(() => {
  return localValue.value || props.defaultValue
})

// Validate input in real-time
const handleInput = () => {
  if (!localValue.value) {
    validationError.value = ''
    return
  }

  if (!isValidUrl.value) {
    validationError.value = 'Please enter a valid YouTube URL'
  } else {
    validationError.value = ''
  }
}

// Save value with validation
const saveValue = async () => {
  if (localValue.value && !isValidUrl.value) {
    validationError.value = 'Cannot save: Invalid YouTube URL'
    return
  }

  if (localValue.value === originalValue.value) {
    return // No changes to save
  }

  try {
    isSaving.value = true
    validationError.value = ''

    await TemplateContentService.setElementValue(
      props.pageName,
      props.componentName,
      props.elementId,
      localValue.value,
      'video',
    )

    originalValue.value = localValue.value
  } catch (error) {
    console.error('Error saving video URL:', error)
    validationError.value = 'Error saving video URL. Please try again.'
  } finally {
    isSaving.value = false
  }
}

// Handle blur event
const handleBlur = () => {
  saveValue()
}

// Handle Enter key - save and blur
const handleEnter = (event: KeyboardEvent) => {
  event.preventDefault()
  const target = event.target as HTMLInputElement
  target.blur()
}

// Handle Escape key - revert changes
const handleEscape = () => {
  localValue.value = originalValue.value
  validationError.value = ''
}

// Clear input value
const clearValue = () => {
  localValue.value = ''
  validationError.value = ''
}
</script>

<style scoped>
.editable-video {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  overflow: hidden;
}

/* Aplicar border-radius al player de YouTube */
.editable-video :deep(iframe),
.editable-video :deep(.youtube-player) {
  border-radius: 16px;
  overflow: hidden;
}

.video-edit-controls {
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.video-url-input {
  flex: 1;
  padding: 10px 12px;
  padding-right: 40px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Courier New', monospace;
  background-color: #ffffff;
  transition: all 0.2s ease;
}

.video-url-input:hover {
  border-color: #94a3b8;
}

.video-url-input:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.video-url-input.has-error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.video-url-input.has-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.video-url-input.is-valid {
  border-color: #10b981;
}

.video-url-input.is-valid:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border: none;
  background-color: #94a3b8;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  transition: all 0.2s ease;
  padding: 0;
}

.clear-button:hover {
  background-color: #64748b;
  transform: translateY(-50%) scale(1.1);
}

.clear-button:active {
  transform: translateY(-50%) scale(0.95);
}

.validation-message {
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.4;
}

.validation-message.error {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.validation-message.success {
  background-color: #f0fdf4;
  color: #15803d;
  border: 1px solid #bbf7d0;
}

.saving-indicator {
  margin-top: 8px;
  padding: 6px 12px;
  background-color: #eff6ff;
  color: #1e40af;
  border-radius: 4px;
  font-size: 13px;
  display: inline-block;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }
}

.hint-text {
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}

/* Mobile responsive */
@media (max-width: 640px) {
  .video-edit-controls {
    padding: 10px;
  }

  .video-url-input {
    font-size: 12px;
    padding: 8px 10px;
    padding-right: 36px;
  }

  .hint-text {
    font-size: 11px;
  }

  .validation-message {
    font-size: 12px;
  }
}
</style>
