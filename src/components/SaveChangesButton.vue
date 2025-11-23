<template>
  <div class="save-changes-wrapper">
    <button class="save-changes-button" @click="openModal">
      <svg class="save-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17,21 17,13 7,13 7,21"></polyline>
        <polyline points="7,3 7,8 15,8"></polyline>
      </svg>
      Save Content
    </button>
    <SaveChangesModal :is-open="isModalOpen" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTemplateEditorStore } from '@/stores/templateEditorStore'
import SaveChangesModal from './SaveChangesModal.vue'

const editorStore = useTemplateEditorStore()
const { hasBeenEditedOnce } = storeToRefs(editorStore)

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<style scoped>
.save-changes-wrapper {
  display: inline-block;
  margin-left: 12px;
}

.save-changes-button {
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
}

.save-changes-button:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.25);
  transform: translateY(-1px);
}

.save-changes-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

.save-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.save-changes-button:hover .save-icon {
  transform: scale(1.1);
}

@media screen and (max-width: 991px) {
  .save-changes-wrapper {
    margin-left: 0;
    margin-top: 12px;
    width: 100%;
  }

  .save-changes-button {
    width: 100%;
  }
}

@media screen and (max-width: 991px) {
  .save-changes-wrapper {
    margin-left: 0;
    margin-top: 12px;
    width: 100%;
  }

  .save-changes-button {
    width: 100%;
  }
}
</style>
