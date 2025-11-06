<template>
  <a href="#" class="post-services-banner-video w-inline-block w-lightbox">
    <div class="play-button-icon-6">PLAY</div>
    <div class="play-button-hover"></div>
    <div class="play-button-3"></div>
    <div class="services-3-background-video w-background-video w-background-video-atom">
      <EditableVideo
        page-name="services"
        component-name="hero-video"
        element-id="background-video"
        default-value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        width="100%"
        height="315"
      />
    </div>
  </a>
</template>

<script setup lang="ts">
import EditableVideo from '@/components/EditableVideo.vue'
</script>

<style scoped>
</style>
