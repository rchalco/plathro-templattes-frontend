<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { watch, onBeforeUnmount } from 'vue'
const emit = defineEmits<{
  (e: 'update', guests: Record<string, number>): void
}>()

const guestTypes = [
  { key: 'adults', label: 'Adulto', plural: 'Adultos', default: 2, icon: 'bi-person-fill' },
  { key: 'children', label: 'Niño', plural: 'Niños', default: 0, icon: 'bi-emoji-smile-fill' },
  { key: 'rooms', label: 'Habitación', plural: 'Habitaciones', default: 1, icon: 'bi-door-closed-fill' }
]

const guests = ref<Record<string, number>>(
  Object.fromEntries(guestTypes.map(type => [type.key, type.default]))
)

const open = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)
const popoverStyle = ref<Record<string, string>>({ top: '10px', left: '10px' })

const toggle = async () => {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    updatePopoverPosition()
  }
}

const close = () => {
  open.value = false
  emit('update', guests.value)
}

const summaryText = computed(() => {
  return guestTypes
    .map(type => {
      const val = guests.value[type.key]
      const label = val === 1 ? type.label : type.plural
      return `${val} ${label.toLowerCase()}`
    })
    .join(', ')
})

const updatePopoverPosition = () => {
  const trigger = triggerRef.value
  if (trigger) {
    const rect = trigger.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

    popoverStyle.value = {
      position: 'fixed',
      top: `${rect.bottom + scrollTop + 8}px`,
      left: `${rect.left + scrollLeft}px`
    }
  }
}

// Añade esto:
watch(open, (visible) => {
  if (visible) {
    document.addEventListener('mousedown', handleClickOutside)
  } else {
    document.removeEventListener('mousedown', handleClickOutside)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

function handleClickOutside(event: MouseEvent) {
  if (
    popoverRef.value &&
    !popoverRef.value.contains(event.target as Node) &&
    triggerRef.value &&
    !triggerRef.value.contains(event.target as Node)
  ) {
    close()
  }
}
</script>

<template>
  <section class="main-container" ref="triggerRef">
    <!-- Botón que parece input -->
    <button type="button" @click="toggle"
      class="border py-2 rounded w-44 bg-white shadow-sm flex items-center justify-between text-sm guest-btn-dark-green"
      aria-haspopup="dialog" :aria-expanded="open" aria-label="Seleccionar huéspedes">
      <span class="truncate guest-btn-dark-green">{{ summaryText }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 guest-btn-dark-green" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Popover -->
    <Teleport to="body">
      <div v-if="open">
        <!-- Fondo -->
        <div class="fixed inset-0 bg-black/30 z-40" @click="close" aria-label="Cerrar selector de huéspedes"></div>

        <!-- Caja flotante -->
        <section class="fixed z-50 rounded-xl shadow-lg p-4 border w-72 guest-popover-dark-green popover-green"
          :style="popoverStyle" ref="popoverRef" role="dialog" aria-modal="true">
          <ul class="no-bullets">
            <li v-for="type in guestTypes" :key="type.key" class="flex items-center justify-between py-2">
              <span class="guest-popover-dark-green flex items-center gap-2">
                <i :class="['bi', type.icon]"></i>
                {{ type.label }}
              </span>
              <div class="flex items-center gap-2 counter-box">
                <button type="button" class="border rounded px-2 guest-popover-dark-green"
                  @click="guests[type.key] = Math.max(0, guests[type.key] - 1)"
                  :aria-label="`Disminuir ${type.label}`">-</button>
                <span class="w-6 text-center guest-popover-dark-green popover-counter">{{ guests[type.key] }}</span>
                <button type="button" class="border rounded px-2 guest-popover-dark-green"
                  @click="guests[type.key] = guests[type.key] + 1" :aria-label="`Aumentar ${type.label}`">+</button>
              </div>
            </li>
          </ul>
          <footer>
            <button type="button" @click="close" class="w-full mt-4 aplicar-btn">
              Aplicar
            </button>
          </footer>
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
