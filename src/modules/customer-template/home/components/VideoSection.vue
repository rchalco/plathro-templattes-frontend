<template>
  <section class="video-section">
    <div class="video-container">
      <EditableText page-name="home" component-name="video" element-id="section-title" default-value="Watch Our Story"
        tag="h2" class-name="section-title" :rows="1" />
      <EditableText page-name="home" component-name="video" element-id="section-description"
        default-value="Learn more about our mission and values" tag="p" class-name="section-description" :rows="2" />
      <div class="video-wrapper">
        <EditableVideo page-name="home" component-name="video" element-id="main-video"
          default-value="https://www.youtube.com/watch?v=TRcReyRYIMg" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableVideo from '@/components/EditableVideo.vue'
</script>

<style scoped>
.video-section {
  padding: 4rem 2rem;
  background-color: #ffffff;
}

.video-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.section-description {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
}

.video-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .video-section {
    padding: 2rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-description {
    font-size: 1rem;
  }
}
</style>
