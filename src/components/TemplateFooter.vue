<template>
  <footer class="site-section-footer">
    <div class="site-footer-container">
      <div class="site-footer-wrapper">
        <!-- Logo -->
        <a href="/" class="site-navbar-brand w-nav-brand" aria-label="Platheo home">
          <img loading="lazy" alt="Platheo logo" src="../assets/images/platheo-logo-footer.png"
            class="brand-image-footer">
        </a>

        <!-- Footer Content -->
        <div class="site-footer-content">
          <!-- Overview Section -->
          <div class="site-footer-block">
            <div class="title-small">OVERVIEW</div>
            <router-link v-for="link in overviewLinks" :key="link.path" :to="link.path" class="footer-link">
              {{ link.label }}
            </router-link>
          </div>

          <!-- Services Section -->
          <div class="site-footer-block">
            <div class="title-small">SERVICES</div>
            <router-link to="/services" class="footer-link">Corporate Site</router-link>
          </div>

          <!-- Address Section -->
          <div class="site-footer-block">
            <div class="title-small">Mail Address</div>
            <div class="address-section">
              <EditableText page-name="shared" component-name="footer" element-id="company-address"
                default-value="404 St. George St. PO Box 28048 Moncton, NB Canada E1C 9N4" tag="p"
                class-name="footer-link" :rows="3" />
            </div>
          </div>

          <!-- Legal Section -->
          <div class="site-footer-block">
            <div class="title-small">LEGAL</div>
            <router-link v-for="link in legalLinks" :key="link.path" :to="link.path" class="footer-link">
              {{ link.label }}
            </router-link>

            <!-- Social Links -->
            <div class="footer-social-block">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" :aria-label="social.name"
                class="footer-social-link" target="_blank" rel="noopener noreferrer">
                <img loading="lazy" :height="social.height" :alt="`${social.name} icon`" :src="social.icon">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="footer-divider"></div>

    <!-- Copyright -->
    <div class="site-footer-copyright-center">
      Copyright © {{ currentYear }} Platheo
    </div>
  </footer>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import EditableText from './EditableText.vue';

// Navigation links
const overviewLinks = [
  { path: '/team', label: 'Team' },
  { path: '/about', label: 'About us' },
  { path: '/contact', label: 'Contact us' }
];

const legalLinks = [
  { path: '/terms', label: 'Terms & Conditions' },
  { path: '/privacy', label: 'Privacy policy' }
];

// Social media links
const socialLinks = [
  {
    name: 'YouTube',
    url: 'https://youtube.com',
    icon: '/src/assets/images/yt.svg',
    height: 22
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: '/src/assets/images/fb.svg',
    height: 20
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: '/src/assets/images/insta.svg',
    height: 20
  }
];

// Dynamic year
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.brand-image-footer {
  max-width: 100px !important;
  margin-top: 15%;
  margin-left: 2px;
  margin-right: 100px;
}
</style>
