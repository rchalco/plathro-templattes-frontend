<template>
  <div class="about-page">
    <TemplateHeader />
    <main class="main-content">
      <AboutHero />
      <MissionSection />
    </main>
    <TemplateFooter />
  </div>
</template>

<script setup lang="ts">
import TemplateHeader from '@/components/TemplateHeader.vue'
import TemplateFooter from '@/components/TemplateFooter.vue'
import AboutHero from '../components/AboutHero.vue'
import MissionSection from '../components/MissionSection.vue'
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
