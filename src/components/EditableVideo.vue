<template>
  <div class="editable-video">
    <YouTubePlayer :videoUrl="displayValue" :width="width" :height="height" />
    <div v-if="isEditMode" class="video-edit-controls">
      <input
        v-model="localValue"
        @blur="saveValue"
        type="text"
        placeholder="Enter YouTube URL..."
        class="video-url-input"
      />
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

// Load value from storage
const loadValue = () => {
  localValue.value = TemplateContentService.getElementValue(
    props.pageName,
    props.componentName,
    props.elementId,
    props.defaultValue,
    'video',
  )
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

const saveValue = () => {
  TemplateContentService.setElementValue(
    props.pageName,
    props.componentName,
    props.elementId,
    localValue.value,
    'video',
  )
}
</script>

<style scoped>
.editable-video {
  margin: 20px 0;
}

.video-edit-controls {
  margin-top: 10px;
}

.video-url-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #2196f3;
  border-radius: 4px;
  font-size: 14px;
  background-color: rgba(33, 150, 243, 0.05);
}

.video-url-input:focus {
  outline: none;
  border-color: #1976d2;
  background-color: rgba(33, 150, 243, 0.1);
}
</style>
