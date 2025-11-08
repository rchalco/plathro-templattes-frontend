<template>
  <div class="contact-page">
    <TemplateHeader />
    <main class="main-content">
      <ContactHeroSection />
      <ContactFormSection />
    </main>
    <TemplateFooter />
  </div>
</template>

<script setup lang="ts">
import TemplateHeader from '@/components/TemplateHeader.vue'
import TemplateFooter from '@/components/TemplateFooter.vue'
import ContactHeroSection from '../components/ContactHeroSection.vue'
import ContactFormSection from '../components/ContactFormSection.vue'
</script>

<style scoped>
.contact-page {
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
