<template>
  <section class="features-section">
    <div class="features-container">
      <EditableText
        page-name="home"
        component-name="features"
        element-id="section-title"
        default-value="Our Features"
        tag="h2"
        class-name="section-title"
        :rows="1"
      />
      <div class="features-grid">
        <div v-for="i in 3" :key="i" class="feature-card">
          <EditableImage
            :page-name="'home'"
            :component-name="'features'"
            :element-id="`feature-${i}-icon`"
            :default-value="`https://via.placeholder.com/80x80?text=Icon+${i}`"
            :alt="`Feature ${i}`"
            img-class="feature-icon"
          />
          <EditableText
            :page-name="'home'"
            :component-name="'features'"
            :element-id="`feature-${i}-title`"
            :default-value="`Feature ${i}`"
            tag="h3"
            class-name="feature-title"
            :rows="1"
          />
          <EditableText
            :page-name="'home'"
            :component-name="'features'"
            :element-id="`feature-${i}-description`"
            :default-value="`This is a description of feature ${i}. It provides great value to our customers.`"
            tag="p"
            class-name="feature-description"
            :rows="3"
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
.features-section {
  padding: 4rem 2rem;
  background-color: #f9f9f9;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1a1a1a;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.feature-description {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .features-section {
    padding: 2rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
