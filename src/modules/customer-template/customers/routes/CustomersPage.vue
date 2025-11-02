<template>
  <div class="customers-page">
    <TemplateHeader />
    <main class="main-content">
      <SuccessStories />
    </main>
    <TemplateFooter />
  </div>
</template>

<script setup lang="ts">
import TemplateHeader from '@/components/TemplateHeader.vue'
import TemplateFooter from '@/components/TemplateFooter.vue'
import SuccessStories from '../components/SuccessStories.vue'
</script>

<style scoped>
.customers-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
