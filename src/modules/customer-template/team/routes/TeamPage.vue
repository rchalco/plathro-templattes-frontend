<template>
  <div class="team-page">
    <TemplateHeader />
    <main class="main-content">
      <TeamGrid />
    </main>
    <TemplateFooter />
  </div>
</template>

<script setup lang="ts">
import TemplateHeader from '@/components/TemplateHeader.vue'
import TemplateFooter from '@/components/TemplateFooter.vue'
import TeamGrid from '../components/TeamGrid.vue'
</script>

<style scoped>
.team-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
