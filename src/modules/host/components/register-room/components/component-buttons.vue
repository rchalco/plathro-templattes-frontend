<template>
  <div class="button-input-container">
    <!-- Label -->
    <label :for="label" class="input-label">{{ label }}</label>

    <!-- Botón Menos -->
    <button @click="decrement" class="btn">-</button>

    <!-- Campo de entrada -->
    <input :id="label" type="text" v-model="value" class="input-text" readonly />

    <!-- Botón Más -->
    <button @click="increment" class="btn">+</button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true, // El label es obligatorio
    },
  },
  data() {
    return {
      value: 1, // Valor inicial del input
    };
  },
  methods: {
    increment() {
      this.value++; // Incrementa el valor
    },
    decrement() {
      if (this.value > 1) {
        this.value--; // Decrementa el valor, pero no permite valores menores a 1
      }
    },
  },
};
</script>

<style scoped>
.button-input-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-label {
  font-size: 16px;
  margin-right: 8px;
}

.btn {
  background-color: #0fda20;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #63bd6f;
}

.input-text {
  width: 50px;
  text-align: center;
  font-size: 16px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
