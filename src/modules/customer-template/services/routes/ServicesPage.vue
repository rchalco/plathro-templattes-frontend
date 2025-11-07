<template>
  <div class="services-page">
    <TemplateHeader />
    <main class="main-content">
      <ServicesHeroSection />
      <ServicesContentSection />
      <AboutSection />
      <ServicesAboutUsSection />
      <ServicesWhyUsSection />
    </main>
    <TemplateFooter />

  </div>
</template>

<script setup lang="ts">
import TemplateHeader from '@/components/TemplateHeader.vue'
import TemplateFooter from '@/components/TemplateFooter.vue'
import ServicesHeroSection from '../components/ServicesHeroSection.vue'
import ServicesContentSection from '../components/ServicesContentSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ServicesAboutUsSection from '../components/ServicesAboutUsSection.vue'
import ServicesWhyUsSection from '../components/ServicesWhyUsSection.vue'
</script>

<style scoped>
.services-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: 40px;
}

/* Ajuste responsive para tablets y móviles */
@media screen and (max-width: 991px) {
  .main-content {
    margin-top: 70px;
  }
}

@media screen and (max-width: 600px) {
  .main-content {
    margin-top: 50px;
  }
}
</style>
