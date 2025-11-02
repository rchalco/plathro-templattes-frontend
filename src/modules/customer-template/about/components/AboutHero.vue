<template>
  <section class="about-hero">
    <div class="about-container">
      <EditableText
        page-name="about"
        component-name="hero"
        element-id="title"
        default-value="About Us"
        tag="h1"
        class-name="about-title"
        :rows="1"
      />
      <EditableText
        page-name="about"
        component-name="hero"
        element-id="description"
        default-value="We are a team of passionate individuals dedicated to creating innovative solutions that make a difference."
        tag="p"
        class-name="about-description"
        :rows="4"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
</script>

<style scoped>
.about-hero {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
}

.about-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.about-description {
  font-size: 1.25rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .about-hero {
    padding: 2rem 1rem;
  }

  .about-title {
    font-size: 2rem;
  }

  .about-description {
    font-size: 1rem;
  }
}
</style>
