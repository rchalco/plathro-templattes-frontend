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
    icon: new URL('../assets/images/yt.svg', import.meta.url).href,
    height: 22
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: new URL('../assets/images/fb.svg', import.meta.url).href,
    height: 20
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: new URL('../assets/images/insta.svg', import.meta.url).href,
    height: 20
  }
];

// Dynamic year
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
/* Mobile-first approach */
.brand-image-footer {
  max-width: 80px;
  margin: 0 auto 20px;
  display: block;
}

/* Footer wrapper - stack vertically on mobile */
.site-footer-wrapper {
  display: flex;
  flex-direction: column;
}

/* Footer content - single column on mobile */
.site-footer-content {
  display: grid;
  grid-template-columns: 1fr;
}

/* Footer blocks - better spacing on mobile */
.site-footer-block {
  display: flex;
  flex-direction: column;
}

/* Title spacing */
.title-small {
  margin-bottom: 8px;
  font-weight: 600;
}

/* Links - larger touch targets for mobile */
.footer-link {
  padding: 2px 0;
  font-size: 14px;
  line-height: 1.5;
}

/* Social links - larger and centered on mobile */
.footer-social-block {
  display: flex;
  gap: 20px;
  margin-top: 16px;
  justify-content: center;
}

.footer-social-link {
  padding: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.footer-social-link img {
  min-width: 24px;
  min-height: 24px;
}

/* Address section */
.address-section {
  font-size: 14px;
  line-height: 1.6;
}

/* Copyright - better mobile spacing */
.site-footer-copyright-center {
  padding: 20px 16px;
  font-size: 13px;
  text-align: center;
}

/* Tablet breakpoint (768px+) */
@media screen and (min-width: 768px) {
  .brand-image-footer {
    max-width: 100px;
    margin: 0 0 0 2px;
    display: block;
  }

  .site-footer-wrapper {
    flex-direction: row;
    gap: 40px;
  }

  .site-footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  .footer-social-block {
    justify-content: flex-start;
  }
}

/* Desktop breakpoint (1024px+) */
@media screen and (min-width: 1024px) {
  .brand-image-footer {
    margin-right: 100px;
    margin-top: 15%;
  }

  .site-footer-content {
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
}
</style>
