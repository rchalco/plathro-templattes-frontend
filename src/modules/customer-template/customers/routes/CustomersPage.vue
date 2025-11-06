<template>
  <div class="customers-page">
    <TemplateHeader />
    <main class="main-content">
      <CustomersHeroSection />
      <CustomersStorySection />
    </main>
    <TemplateFooter />
  </div>
</template>

<script setup lang="ts">
import TemplateHeader from '@/components/TemplateHeader.vue'
import TemplateFooter from '@/components/TemplateFooter.vue'
import CustomersHeroSection from '../components/CustomersHeroSection.vue'
import CustomersStorySection from '../components/CustomersStorySection.vue'
</script>

<style scoped>
.customers-page {
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
