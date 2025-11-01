<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { AxiosErrorDetails } from "./FluentError";

const props = defineProps<{
  message: string | object,
  color?: string,
  icon?: string,
  dismissible?: boolean,
  duration?: number
}>();

const emit = defineEmits(["closed"]);
const isVisible = ref(false);

const handleClose = () => {
  isVisible.value = false;
  emit("closed");
};

const formattedMessage = computed(() => {
  if (typeof props.message === "string") {
    return props.message.replace(/\n/g, "<br>");
  }
  // Manejo de error tipo Axios o similar
  if (props.message && typeof props.message === "object") {
    // Axios error con response.data
    const data = (props.message as AxiosErrorDetails).response?.data;
    if (Array.isArray(data)) {
      return data.map((item: AxiosErrorDetails) => item.message).filter(Boolean).join("<br>");
    }
    if (data?.message) {
      return data.message;
    }
  }
  return "Ocurrió un error inesperado. Revise su conexión a internet o intente más tarde.";
});

watch(
  () => props.message,
  () => {
    isVisible.value = true;
    if (props.duration && props.duration > 0) {
      setTimeout(() => {
        handleClose();
      }, props.duration);
    }
  },
  { immediate: true }
);

const alertTypeClass = computed(() => {
  switch (props.color) {
    case "info":
      return "alert-success";
    case "danger":
      return "alert-danger";
    default:
      return `alert-${props.color ?? "danger"}`;
  }
});

const alertIcon = computed(() => {
  switch (props.color) {
    case "info":
      return "bi bi-check-circle-fill text-success";
    case "danger":
      return "bi bi-x-circle-fill text-danger";
    default:
      return props.icon ?? "bi bi-exclamation-circle";
  }
});
</script>

<template>
  <Transition name="slide-down">
    <div v-if="isVisible" class="alert-overlay">
      <div class="alert-modal">
        <div :class="['alert', alertTypeClass, { 'alert-dismissible': dismissible }]" role="alert">
          <i :class="alertIcon" class="me-2 text-white"></i>
          <span v-html="formattedMessage" class="text-white"></span>
          <button v-if="dismissible" type="button" class="btn-close" aria-label="Cerrar" @click="handleClose"></button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.alert-overlay {
  position: fixed;
  inset: 0;
  z-index: 1050;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-modal {
  max-width: 500px;
  width: 90vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert {
  display: flex;
  align-items: center;
  border: 2px solid #FF8C00 !important;
  padding: 1rem 1.5rem 1rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 1.1rem;
  position: relative;
  background-color: #fff;
  width: 100%;
}

.alert-success {
  background-color: rgba(40, 167, 69, 0.1) !important;
  color: #198754 !important;
}

.alert-danger {
  background-color: rgba(220, 53, 69, 0.1) !important;
  color: #dc3545 !important;
}

.bi {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.btn-close {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  opacity: 0.7;
  cursor: pointer;
}

.btn-close:after {
  content: "×";
  font-size: 1.5rem;
  color: #333;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.text-white {
  color: #fff;
}
</style>
