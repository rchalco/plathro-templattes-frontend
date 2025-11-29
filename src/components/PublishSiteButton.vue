<template>
  <button class="publish-site-button" @click="publishSite" :disabled="isPublishing">
    <div class="publish-content">
      <div v-if="!isPublishing" class="publish-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M3 17L12 22L21 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M3 12L12 17L21 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>
      <div v-else class="loading-spinner"></div>
      <span class="publish-text">{{ isPublishing ? 'Publishing...' : 'Publish Site' }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isPublishing = ref(false)

const publishSite = async () => {
  if (isPublishing.value) return

  isPublishing.value = true

  try {
    // Simular un pequeño delay para mostrar el loading
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Abrir el sitio en una nueva ventana
    window.open('https://mnimvp.webflow.io/', '_blank', 'noopener,noreferrer')
  } catch (error) {
    console.error('Error al publicar:', error)
  } finally {
    isPublishing.value = false
  }
}
</script>

<style scoped>
.publish-site-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 20px;
  background-color: rgb(19, 18, 18);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.publish-site-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: rgb(19, 18, 18);
  transition: left 0.5s;
}

.publish-site-button:hover::before {
  left: 100%;
}



.publish-site-button:disabled {
  cursor: not-allowed;
  transform: none;
}

.publish-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.publish-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.publish-site-button:hover .publish-icon {
  transform: scale(1.1);
}

.loading-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.publish-text {
  font-family: inherit;
  letter-spacing: 0.5px;
}

/* Responsive design */
@media (max-width: 768px) {
  .publish-site-button {
    width: 100%;
    margin-top: 12px;
    padding: 14px 20px;
    font-size: 15px;
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .publish-site-button {
    /* box-shadow:
      0 4px 15px rgba(255, 107, 107, 0.25),
      0 2px 8px rgba(255, 107, 107, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.15); */
  }

  .publish-site-button:hover {}
}
</style>
