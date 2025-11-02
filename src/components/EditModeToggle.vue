<template>
  <div class="edit-mode-toggle">
    <label class="toggle-switch">
      <input type="checkbox" :checked="isEditMode" @change="toggleEditMode" />
      <span class="slider"></span>
      <span class="toggle-label">{{ isEditMode ? 'Edit Mode' : 'View Mode' }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTemplateEditorStore } from '@/stores/templateEditorStore'

const editorStore = useTemplateEditorStore()
const { isEditMode } = storeToRefs(editorStore)

const toggleEditMode = () => {
  editorStore.toggleEditMode()
}
</script>

<style scoped>
.edit-mode-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toggle-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
  background-color: #ccc;
  border-radius: 26px;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

.toggle-switch input:checked + .slider {
  background-color: #2196f3;
}

.toggle-switch input:checked + .slider:before {
  transform: translateX(24px);
}

.toggle-label {
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
</style>
