<template>
  <section class="hero-section">
    <div class="hero-content">
      <EditableText
        page-name="home"
        component-name="hero"
        element-id="title"
        default-value="Welcome to Our Platform"
        tag="h1"
        class-name="hero-title"
        :rows="2"
      />
      <EditableText
        page-name="home"
        component-name="hero"
        element-id="subtitle"
        default-value="We build amazing solutions for modern businesses"
        tag="p"
        class-name="hero-subtitle"
        :rows="3"
      />
      <div class="hero-cta">
        <EditableText
          page-name="home"
          component-name="hero"
          element-id="cta-text"
          default-value="Get Started"
          tag="button"
          class-name="cta-button"
          :rows="1"
        />
      </div>
    </div>
    <div class="hero-image">
      <EditableImage
        page-name="home"
        component-name="hero"
        element-id="hero-image"
        default-value="https://via.placeholder.com/600x400?text=Hero+Image"
        alt="Hero"
        img-class="hero-img"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'
</script>

<style scoped>
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 500px;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.hero-cta {
  margin-top: 1rem;
}

.cta-button {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #1976d2;
}

.hero-image {
  width: 100%;
}

.hero-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>
