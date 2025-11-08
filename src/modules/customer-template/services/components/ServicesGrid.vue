<template>
  <section class="services-section">
    <div class="services-container">
      <EditableText
        page-name="services"
        component-name="header"
        element-id="title"
        default-value="Our Services"
        tag="h1"
        class-name="services-title"
        :rows="1"
      />
      <EditableText
        page-name="services"
        component-name="header"
        element-id="description"
        default-value="Comprehensive solutions tailored to your business needs"
        tag="p"
        class-name="services-description"
        :rows="2"
      />
      <div class="services-grid">
        <div v-for="i in 6" :key="i" class="service-card">
          <EditableImage
            :page-name="'services'"
            :component-name="'items'"
            :element-id="`service-${i}-icon`"
            :default-value="`https://via.placeholder.com/100x100?text=Service+${i}`"
            :alt="`Service ${i}`"
            img-class="service-icon"
          />
          <EditableText
            :page-name="'services'"
            :component-name="'items'"
            :element-id="`service-${i}-title`"
            :default-value="`Service ${i}`"
            tag="h3"
            class-name="service-title"
            :rows="1"
          />
          <EditableText
            :page-name="'services'"
            :component-name="'items'"
            :element-id="`service-${i}-description`"
            :default-value="`Comprehensive description of service ${i} and how it benefits your business.`"
            tag="p"
            class-name="service-description"
            :rows="3"
          />
          <EditableText
            :page-name="'services'"
            :component-name="'items'"
            :element-id="`service-${i}-cta`"
            :default-value="`Learn More`"
            tag="button"
            class-name="service-button"
            :rows="1"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'
</script>

<style scoped>
.services-section {
  padding: 4rem 2rem;
  background-color: #ffffff;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
}

.services-title {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.services-description {
  font-size: 1.25rem;
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.service-card {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.service-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 1.5rem;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.service-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.service-button {
  padding: 0.75rem 1.5rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.service-button:hover {
  background-color: #1976d2;
}

@media (max-width: 768px) {
  .services-section {
    padding: 2rem 1rem;
  }

  .services-title {
    font-size: 2rem;
  }

  .services-description {
    font-size: 1rem;
  }
}
</style>
