<template>
  <div class="video-container">
    <EditableVideo page-name="services" component-name="hero-video" element-id="background-video"
      default-value="https://www.youtube.com/watch?v=TRcReyRYIMg" width="100%" :height="videoHeight" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import EditableVideo from '@/components/EditableVideo.vue'

const videoHeight = ref('315')

// Calculate responsive video height
const updateVideoHeight = () => {
  const width = window.innerWidth

  if (width < 640) {
    // Mobile: smaller height
    videoHeight.value = '200'
  } else if (width < 1024) {
    // Tablet: medium height
    videoHeight.value = '250'
  } else {
    // Desktop: standard height
    videoHeight.value = '315'
  }
}

onMounted(() => {
  updateVideoHeight()
  window.addEventListener('resize', updateVideoHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateVideoHeight)
})

</script>

<style scoped>
.post-services-banner-video {
  width: 100%;
  max-width: 100%;
  display: block;
  position: relative;
}

.video-container {
  width: 100%;
  height: 380px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #000;
  transition: all 0.3s ease;
}

.video-container:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* Aspect ratio container for better responsiveness */
.video-container::before {
  content: '';
  display: block;
  padding-top: 56.25%;
  /* 16:9 aspect ratio */
}

.video-container :deep(.editable-video) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: inherit;
  overflow: hidden;
}

.video-container :deep(.youtube-player) {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
}

.video-container :deep(.video-wrapper) {
  border-radius: inherit;
  overflow: hidden;
}

.video-container :deep(iframe) {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

/* Mobile specific styles */
@media (max-width: 640px) {
  .video-container {
    border-radius: 8px;
  }

  .video-container :deep(iframe) {
    border-radius: 8px;
  }
}

/* Tablet styles */
@media (min-width: 641px) and (max-width: 1023px) {
  .video-container {
    border-radius: 10px;
  }

  .video-container :deep(iframe) {
    border-radius: 10px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .video-container {
    border-radius: 12px;
  }
}

/* Ensure video editor controls are properly positioned */
.video-container :deep(.video-edit-controls) {
  position: relative;
  z-index: 10;
  margin: 0;
  background-color: rgba(248, 250, 252, 0.98);
}
</style>
