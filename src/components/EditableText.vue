<template>
  <component :is="tag" :class="className">
    <template v-if="!isEditMode">
      {{ displayValue }}
    </template>
    <textarea
      v-else
      v-model="localValue"
      @blur="saveValue"
      :placeholder="placeholder"
      class="editable-textarea"
      :rows="rows"
    />
  </component>
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
  tag?: string
  className?: string
  placeholder?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: '',
  tag: 'p',
  className: '',
  placeholder: 'Enter text...',
  rows: 3,
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
    'text',
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
    'text',
  )
}
</script>

<style scoped>
.editable-textarea {
  width: 100%;
  padding: 8px;
  border: 2px solid #2196f3;
  border-radius: 4px;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  resize: vertical;
  background-color: rgba(33, 150, 243, 0.05);
}

.editable-textarea:focus {
  outline: none;
  border-color: #1976d2;
  background-color: rgba(33, 150, 243, 0.1);
}
</style>
