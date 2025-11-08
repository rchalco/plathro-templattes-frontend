<template>
  <div class="questionnaire-page">
    <header class="questionnaire-header">
      <div class="header-container">
        <router-link to="/login" class="logo-link">
          <img :src="logoUrl" alt="Platheo Logo" class="logo" />
        </router-link>
      </div>
    </header>
    <main>
      <QuestionnaireForm />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import QuestionnaireForm from '../components/QuestionnaireForm.vue'
import logoUrl from '@/assets/images/platheo-logo-footer.png?url'
</script>

<style scoped>
.questionnaire-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header simple con solo logo */
.questionnaire-header {
  background: #ffffff;
  padding: 1.5rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-link {
  display: block;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.logo {
  height: 64px;
  width: auto;
  display: block;
}

@media (max-width: 991px) {
  .questionnaire-header {
    padding: 1.25rem 0;
  }

  .header-container {
    padding: 0 1.5rem;
  }

  .logo {
    height: 54px;
  }
}

@media (max-width: 767px) {
  .questionnaire-header {
    padding: 1rem 0;
  }

  .header-container {
    padding: 0 1rem;
  }

  .logo {
    height: 32px;
  }

  .questionnaire-main {
    padding: 2rem 0;
  }
}

@media (max-width: 479px) {
  .questionnaire-header {
    padding: 0.875rem 0;
  }

  .header-container {
    padding: 0 0.75rem;
  }

  .logo {
    height: 28px;
  }

  .questionnaire-main {
    padding: 1.5rem 0;
  }
}
</style>
