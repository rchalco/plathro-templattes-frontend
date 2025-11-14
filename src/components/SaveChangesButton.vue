<template>
  <div v-if="hasBeenEditedOnce" class="save-changes-wrapper">
    <button class="save-changes-button" @click="openModal">
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
  padding: 10px 20px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
}

.save-changes-button:hover {
  background-color: #059669;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
  transform: translateY(-1px);
}

.save-changes-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
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
