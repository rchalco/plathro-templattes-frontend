<template>
  <section class="customers-section">
    <div class="customers-container">
      <EditableText page-name="customers" component-name="header" element-id="title"
        default-value="Customer Success Stories" tag="h1" class-name="customers-title" :rows="1" />
      <EditableText page-name="customers" component-name="header" element-id="description"
        default-value="See how our solutions have helped businesses achieve their goals" tag="p"
        class-name="customers-description" :rows="2" />
      <div class="success-stories">
        <div v-for="i in 4" :key="i" class="story-card">
          <EditableImage :page-name="'customers'" :component-name="'stories'" :element-id="`story-${i}-logo`"
            :default-value="`https://via.placeholder.com/200x100?text=Company+${i}`" :alt="`Company ${i}`"
            img-class="company-logo" />
          <EditableText :page-name="'customers'" :component-name="'stories'" :element-id="`story-${i}-quote`"
            :default-value="`Working with this company has been transformative for our business. Their solutions exceeded our expectations.`"
            tag="blockquote" class-name="story-quote" :rows="4" />
          <EditableText :page-name="'customers'" :component-name="'stories'" :element-id="`story-${i}-author`"
            :default-value="`John Doe, CEO`" tag="p" class-name="story-author" :rows="1" />
          <EditableText :page-name="'customers'" :component-name="'stories'" :element-id="`story-${i}-company`"
            :default-value="`Company ${i}`" tag="p" class-name="story-company" :rows="1" />
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
.customers-section {
  padding: 4rem 2rem;
  background-color: #ffffff;
}

.customers-container {
  max-width: 1200px;
  margin: 0 auto;
}

.customers-title {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.customers-description {
  font-size: 1.25rem;
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
}

.success-stories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.story-card {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.company-logo {
  width: 200px;
  height: auto;
  margin-bottom: 1.5rem;
}

.story-quote {
  font-size: 1.125rem;
  font-style: italic;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  border-left: 4px solid #2196f3;
  padding-left: 1rem;
}

.story-author {
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.story-company {
  color: #2196f3;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .customers-section {
    padding: 2rem 1rem;
  }

  .customers-title {
    font-size: 2rem;
  }

  .customers-description {
    font-size: 1rem;
  }
}
</style>
