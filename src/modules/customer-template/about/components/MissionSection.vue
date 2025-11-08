<template>
  <section class="mission-section">
    <div class="mission-container">
      <div class="mission-content">
        <EditableText
          page-name="about"
          component-name="mission"
          element-id="title"
          default-value="Our Mission"
          tag="h2"
          class-name="mission-title"
          :rows="1"
        />
        <EditableText
          page-name="about"
          component-name="mission"
          element-id="description"
          default-value="To empower businesses with innovative technology solutions that drive growth and success. We believe in creating value through excellence, integrity, and continuous innovation."
          tag="p"
          class-name="mission-description"
          :rows="5"
        />
      </div>
      <div class="mission-image">
        <EditableImage
          page-name="about"
          component-name="mission"
          element-id="image"
          default-value="https://via.placeholder.com/500x400?text=Mission"
          alt="Our Mission"
          img-class="mission-img"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'
</script>

<style scoped>
.mission-section {
  padding: 4rem 2rem;
  background-color: #ffffff;
}

.mission-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.mission-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.mission-description {
  font-size: 1.125rem;
  color: #666;
  line-height: 1.8;
}

.mission-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .mission-section {
    padding: 2rem 1rem;
  }

  .mission-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .mission-title {
    font-size: 2rem;
  }

  .mission-description {
    font-size: 1rem;
  }
}
</style>
