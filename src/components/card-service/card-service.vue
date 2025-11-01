<script setup lang="ts">
import type { ServiceItem } from '@/data/servicesConfig';

interface Props {
  servicio: ServiceItem;
  index: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:cantidad', index: number, cantidad: number): void;
}>();

const toggleServicio = () => {
  if (!props.servicio.requireCounter) {
    emit('update:cantidad', props.index, props.servicio.cantidad > 0 ? 0 : 1);
  } else if (props.servicio.cantidad === 0) {
    emit('update:cantidad', props.index, 1);
  }
};

const incrementar = () => {
  if (props.servicio.requireCounter) {
    emit('update:cantidad', props.index, props.servicio.cantidad + 1);
  }
};

const decrementar = () => {
  if (props.servicio.requireCounter && props.servicio.cantidad > 0) {
    emit('update:cantidad', props.index, props.servicio.cantidad - 1);
  }
};
</script>

<template>
  <div class="service-item" role="listitem">
    <div class="service-content">
      <span class="label-option">{{ servicio.label }}</span>
      <input :id="servicio.id" type="checkbox" class="btn-check" :aria-label="`Seleccionar ${servicio.label}`" />
      <label class="btn btn-lg btn-outline-success border-2 px-4 py-3" :for="servicio.id"
        :class="{ 'active-icon': servicio.cantidad > 0 }" @click="toggleServicio">
        <i :class="servicio.icon" aria-hidden="true"></i>
        <span class="visually-hidden">Ícono de {{ servicio.label }}</span>
      </label>
    </div>

    <div v-if="servicio.requireCounter" class="counter-container" role="group"
      :aria-label="`Control de cantidad para ${servicio.label}`">
      <button type="button" class="counter-btn decrease" @click.prevent="decrementar"
        :disabled="servicio.cantidad === 0" :aria-label="`Disminuir cantidad de ${servicio.label}`">
        <i class="bi bi-dash" aria-hidden="true"></i>
      </button>
      <span class="counter-value" role="status" aria-live="polite">
        {{ servicio.cantidad }}
      </span>
      <button type="button" class="counter-btn increase" @click.prevent="incrementar"
        :aria-label="`Aumentar cantidad de ${servicio.label}`">
        <i class="bi bi-plus" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
}

.service-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.label-option {
  order: -1;
  margin-top: 0;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  color: #67748e;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

.counter-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.counter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #66bb6a;
  background: transparent;
  color: #66bb6a;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.counter-btn:hover:not(:disabled) {
  background: #66bb6a;
  color: white;
}

.counter-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #ccc;
  color: #ccc;
}

.counter-value {
  font-size: 0.9rem;
  min-width: 20px;
  text-align: center;
  color: #344767;
  font-weight: 500;
}

.active-icon {
  background-color: #66bb6a !important;
  border-color: #66bb6a !important;
  color: white !important;
}

.active-icon i {
  color: white !important;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 768px) {
  .counter-btn {
    width: 30px;
    height: 30px;
  }

  .counter-value {
    font-size: 0.85rem;
  }

  .label-option {
    font-size: 0.8rem;
    margin-top: 0.2rem;
  }
}

@media (max-width: 576px) {
  .service-item {
    gap: 0.35rem;
    padding: 0.25rem;
  }

  .service-content {
    gap: 0.25rem;
  }

  .counter-container {
    gap: 0.35rem;
    margin-top: 0.15rem;
  }

  .counter-btn {
    width: 22px;
    height: 22px;
  }

  .counter-value {
    font-size: 0.75rem;
    min-width: 16px;
  }

  .label-option {
    font-size: 0.7rem;
    margin: 0.1rem 0;
  }

  .btn {
    padding: 0.55rem 0.95rem !important;
  }

  .btn i {
    font-size: 0.9rem;
  }
}
</style>
