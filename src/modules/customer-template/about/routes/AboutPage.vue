<template>
  <div class="about-page">
    <TemplateHeader />
    <main class="main-content">
      <AboutHeroSection />
      <AboutStatsSection />
      <AboutSustainabilitySection />
    </main>
    <TemplateFooter />
  </div>
</template>

<script setup lang="ts">
import TemplateHeader from '@/components/TemplateHeader.vue'
import TemplateFooter from '@/components/TemplateFooter.vue'
import AboutHeroSection from '../components/AboutHeroSection.vue'
import AboutStatsSection from '../components/AboutStatsSection.vue'
import AboutSustainabilitySection from '../components/AboutSustainabilitySection.vue'
</script>

<style scoped>
.about-page {
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
