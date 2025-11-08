<template>
  <main class="main-centered privacy-bg">
    <!-- Hero Section -->
    <div id="Post-Hero" class="terms-hero-section">
      <div class="w-layout-blockcontainer about-base-container w-container">
        <div class="about-inner-banner">
          <div class="about-inner-banner-wrap blog-2">
            <div class="div-block-11">
              <h1 class="heading-16">Privacy Policy</h1>
              <p class="last-updated">Last updated: {{ lastUpdated }}</p>
            </div>
          </div>
          <router-link to="/" class="brand w-nav-brand" aria-label="Go to home">
            <img width="Auto" height="100" alt="Platheo logo" :src="logoImage" loading="lazy" class="logo">
          </router-link>
        </div>
      </div>
    </div>

    <!-- Privacy Content Sections -->
    <div v-for="section in privacySections" :key="section.id" class="w-layout-blockcontainer terms-base-container w-container">
      <div class="post-inner-banner">
        <div class="inner-terms-wrap blog-2">
          <div class="div-block-28">
            <div class="w-layout-blockcontainer category-case w-container">
              <div class="button-s is-small is-xsmall is-new-category-tag">
                {{ section.title }}
              </div>
            </div>
            <div class="inner-terms-paragraph blog-2" v-html="section.content"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Divider -->
    <section class="section-divider">
      <div class="divider-line"></div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const logoImage = new URL('../../assets/images/platheo-logo-footer.png', import.meta.url).href

const lastUpdated = computed(() => {
  return new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})

const privacySections = ref([
  {
    id: 'introduction',
    title: 'Introduction',
    content: '<p>Platheo is a platform designed to make it easy for businesses owners who sell services launch faster and deliver their services to their customers.</p><p>We are committed to protecting your privacy, and this policy explains how we collect and process personal information about you when you visit our website (platheo.com), when you use our products and services (our "Services"), or when you otherwise do business or contact us.</p><p>Please read this policy carefully to understand how we handle your personal information.</p>'
  },
  {
    id: 'information-collected',
    title: 'What information do we collect?',
    content: '<p>We may collect and process the following personal information from you:</p><p><strong>Information you provide to us:</strong> We collect personal information when you voluntarily provide us with such information in the course of using our website or Services.</p><p><strong>Information we collect when you do business with us:</strong> We may process your personal information when you do business with us.</p><p><strong>Information we automatically collect:</strong> We may also collect certain technical information by automatic means when you visit our website.</p>'
  }
])
</script>

<style scoped>
.last-updated {
  margin-top: 12px;
  font-size: 14px;
  color: #64748b;
  font-style: italic;
}

.inner-terms-paragraph :deep(p) {
  margin-bottom: 16px;
  line-height: 1.8;
}

.inner-terms-paragraph :deep(a) {
  color: #3b82f6;
  text-decoration: underline;
}

.section-divider {
  padding: 40px 0;
}

.divider-line {
  max-width: 1200px;
  margin: 0 auto;
  height: 1px;
  background: linear-gradient(to right, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent);
}
</style>
