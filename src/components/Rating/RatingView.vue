<template>
  <div class="rating-card">
    <h1>Calificación de Servicio</h1>
    <StarRating v-model="rating" />
    <button @click="submitRating">Enviar Calificación</button>
    <p v-if="submitted">Gracias por su calificación de {{ rating }} estrellas!</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import StarRating from './StarRating.vue';

const rating = ref(0);
const submitted = ref(false);

const submitRating = () => {
  submitted.value = true;
  // Aquí se puede agregar la lógica para enviar la calificación a un servidor
};
</script>

<style scoped>
.rating-card {
  max-width: 400px;
  margin: 40px auto;
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08), 0 1.5px 4px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.rating-card button {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #1976d2;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  /*transition: background 0.2s;*/
}

.rating-card button:hover {
  background: #1565c0;
}
</style>
