<script setup lang="ts">
import type { ServiceAmbient } from '../models/CardModel';


interface Props {
  servicios: ServiceAmbient;
  index: number;
}

defineProps<Props>();
</script>

<template>
  <div class="service-item" role="listitem">
    <div class="service-content">
      <span class="label-option">({{ servicios.cantidad }}){{ servicios.label }}</span>
      <span class="icon-container">
        <i :class="servicios.icon" aria-hidden="true"></i>
        <span class="visually-hidden">Ícono de {{ servicios.label }}</span>
      </span>
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

.icon-container {
  font-size: 2rem;
  color: #66bb6a;
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
</style>
