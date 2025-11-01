<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'

const popoverStyle = ref<Record<string, string>>({ top: '10px', left: '10px' })

const props = defineProps<{
  modelValue: boolean
  filters: { key: string, label: string }[]
  selected: string[]
}>()
const emit = defineEmits(['update:modelValue', 'update:selected'])

const popoverRef = ref<HTMLElement | null>(null)

function toggleFilter(key: string) {
  const idx = props.selected.indexOf(key)
  const newSelected = [...props.selected]
  if (idx === -1) newSelected.push(key)
  else newSelected.splice(idx, 1)
  emit('update:selected', newSelected)
}

function close() {
  emit('update:modelValue', false)
}

function handleClickOutside(event: MouseEvent) {
  if (popoverRef.value && !popoverRef.value.contains(event.target as Node)) {
    close()
  }
}

watch(() => props.modelValue, (visible) => {
  if (visible) document.addEventListener('mousedown', handleClickOutside)
  else document.removeEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <section class="main-container" ref="triggerRef">
    <Teleport to="body">
       <div v-if="modelValue">
        <!-- Fondo -->
        <div class="fixed inset-0 bg-black/30 z-40" @click="close" aria-label="Cerrar selector de huéspedes"></div>
         <section class="fixed z-50 rounded-xl shadow-lg p-4 border w-72 guest-popover-dark-green popover-green"
          :style="popoverStyle" ref="popoverRef" role="dialog" aria-modal="true">
          <div ref="popoverRef"
              class="fixed z-50 bg-white rounded shadow-lg p-4"
              style="top: 30vh; left: 50vw; transform: translate(-50%, 0); min-width: 250px;">
              <h6 class="mb-3">Filtros adicionales</h6>
              <div v-for="f in filters" :key="f.key" class="form-check mb-2">
                <input class="form-check-input" type="checkbox"
                  :id="f.key"
                  :checked="selected.includes(f.key)"
                  @change="toggleFilter(f.key)">
                <label class="form-check-label" :for="f.key">{{ f.label }}</label>
              </div>
              <button class="btn btn-success w-100 mt-3" @click="close">Aplicar</button>
          </div>

        </section>
      </div>
      </Teleport>
  </section>
</template>
<style scoped>
.guest-btn-dark-green {
  color: #14532d !important;
}

.guest-popover-dark-green {
  color: #14532d !important;
}

.popover-green {
  background-color: #e6f4ec !important;
  z-index: 50;
  min-width: 250px;
}

.popover-counter {
  color: #14532d !important;
  font-weight: 600;
  margin: 2px;
  padding-left: 4px;
  padding-right: 4px;
}

.main-container {
  max-width: 250px;
}

.no-bullets {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.counter-box {
  border: 1px solid #b7e2cd;
  border-radius: 8px;
  padding: 4px 10px;
  background: #f6fcf9;
}

.aplicar-btn {
  background-color: #b7e2cd !important;
  color: #14532d !important;
  font-weight: 600;
  border: none;
  transition: background 0.2s;
}

.aplicar-btn:hover {
  background-color: #a3d9c6 !important;
}
</style>
