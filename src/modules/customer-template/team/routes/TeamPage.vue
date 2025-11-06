<template>
  <div class="team-page">
    <TemplateHeader />
    <main class="main-content">
      <TeamHeroSection />
      <TeamFounderSection />
      <TeamMembersGrid />
    </main>
    <TemplateFooter />
  </div>
</template>

<script setup lang="ts">
import TemplateHeader from '@/components/TemplateHeader.vue'
import TemplateFooter from '@/components/TemplateFooter.vue'
import TeamHeroSection from '../components/TeamHeroSection.vue'
import TeamFounderSection from '../components/TeamFounderSection.vue'
import TeamMembersGrid from '../components/TeamMembersGrid.vue'
</script>

<style scoped>
.team-page {
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
