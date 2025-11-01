<template>
  <div class="loader-overlay" v-if="isLoading">
    <div class="loader-container">
      <div class="loader-circle"></div>
      <p class="loader-text">{{ text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: 'Cargando...'
  }
});
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(144, 238, 144, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: all 0.3s ease;
}

.loader-container {
  background: rgba(255, 255, 255, 0.15);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.loader-circle {
  width: 60px;
  height: 60px;
  border: 5px solid rgba(46, 125, 50, 0.1);
  border-top: 5px solid #2E7D32;
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  box-shadow: 0 0 15px rgba(46, 125, 50, 0.2);
}

.loader-text {
  color: #2E7D32;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }
}

@media (max-width: 768px) {
  .loader-container {
    padding: 1.5rem;
  }

  .loader-circle {
    width: 50px;
    height: 50px;
  }

  .loader-text {
    font-size: 1.1rem;
  }
}
</style>
