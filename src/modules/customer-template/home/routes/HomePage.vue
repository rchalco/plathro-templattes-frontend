<template>
  <div class="home-page">
    <TemplateHeader />
    <main class="main-content">
      <HeroSection />
      <HomeMessage />
      <HomeSectionTestimony />
      <HomeLogosMarquee />
    </main>
    <TemplateFooter />
  </div>
</template>

<script setup lang="ts">
import TemplateHeader from '@/components/TemplateHeader.vue'
import TemplateFooter from '@/components/TemplateFooter.vue'
import HeroSection from '../components/HeroSection.vue'
import HomeMessage from '../components/HomeMessage.vue'
import HomeSectionTestimony from '../components/HomeSectionTestimony.vue'
import HomeLogosMarquee from '../components/HomeLogosMarquee.vue'
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: 40px;
  /* Espacio para el header fijo */
}

/* Ajuste responsive para tablets y móviles */
@media screen and (max-width: 991px) {
  .main-content {
    margin-top: 70px;
    /* Menos espacio en pantallas pequeñas */
  }
}

@media screen and (max-width: 600px) {
  .main-content {
    margin-top: 50px;
    /* Aún menos espacio en móviles */
  }
}
</style>
