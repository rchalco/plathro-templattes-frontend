<template>
  <div class="editable-image" :class="{ 'edit-mode': isEditMode }">
    <img v-if="displayValue" :src="displayValue" :alt="alt" :class="imgClass" />
    <div v-else class="placeholder-image">
      <span>No image</span>
    </div>
    <div v-if="isEditMode" class="edit-overlay">
      <label class="upload-button">
        <input type="file" @change="handleImageUpload" accept="image/*" hidden />
        Change Image
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTemplateEditorStore } from '@/stores/templateEditorStore'
import { TemplateContentService } from '@/services/templateContentService'

interface Props {
  pageName: string
  componentName: string
  elementId: string
  defaultValue?: string
  alt?: string
  imgClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: '',
  alt: 'Image',
  imgClass: '',
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
    'image',
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

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // Convert image to base64
  const reader = new FileReader()
  reader.onload = (e) => {
    const base64 = e.target?.result as string
    localValue.value = base64
    TemplateContentService.setElementValue(
      props.pageName,
      props.componentName,
      props.elementId,
      base64,
      'image',
    )
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
.editable-image {
  position: relative;
  display: inline-block;
  width: 100%;
}

.editable-image img {
  width: 100%;
  height: auto;
  display: block;
}

.placeholder-image {
  width: 100%;
  min-height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border-radius: 8px;
}

.edit-mode {
  cursor: pointer;
}

.edit-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.edit-mode:hover .edit-overlay {
  opacity: 1;
}

.upload-button {
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.upload-button:hover {
  background-color: #1976d2;
}
</style>
