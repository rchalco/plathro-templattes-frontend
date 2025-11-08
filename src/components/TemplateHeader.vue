<template>
  <header class="navbar-absolute w-nav" role="banner">
    <div class="base-container w-container">
      <div class="nav-menu-wrapper">
        <!-- Logo -->
        <a href="/" aria-current="page" class="brand w-nav-brand w--current" aria-label="home">
          <img width="Auto" height="100" alt="Logo" src="../assets/images/plogo.svg" loading="lazy" class="logo">
        </a>

        <!-- Navigation Menu -->
        <nav role="navigation" class="nav-menu w-nav-menu" :class="{ 'w--open': isMobileMenuOpen }">
          <!-- Mobile Header -->
          <div class="tablet-menu">
            <a href="#" class="brand-tablet w-nav-brand" aria-label="home">
              <img loading="lazy" height="100" alt="Logo" src="../assets/images/plogo.svg" class="logo-tablet-menu">
            </a>
            <button class="close-menu-button w-nav-button" aria-label="Close menu" type="button"
              :aria-expanded="isMobileMenuOpen" @click="closeMobileMenu">
              <img loading="lazy" src="../assets/images/close-btn.svg" alt="Close icon" class="nav-close-icon">
            </button>
          </div>

          <!-- Menu Items -->
          <div class="menu-wrap">
            <router-link v-for="item in menuItems" :key="item.path" :to="item.path" class="nav-link w-inline-block"
              @click="closeMobileMenu">
              <div class="clip">
                <div class="button-text-wrap-5">
                  <p class="nav-item-title">{{ item.label }}</p>
                </div>
                <div class="button-text-wrap-5 bottom-wrap">
                  <p class="nav-item-title">{{ item.label }}</p>
                </div>
              </div>
            </router-link>


            <div class="nav-divider-2"></div>


            <router-link to="/login" class="button-white-menu" @click="closeMobileMenu">
              Sign In
            </router-link>

            <!-- Edit Mode Toggle -->
            <EditModeToggle />

          </div>
        </nav>

        <!-- Mobile Menu Button -->
        <button class="menu-button w-nav-button" aria-label="Open menu" type="button" :aria-expanded="isMobileMenuOpen"
          @click="toggleMobileMenu">
          <img loading="lazy" height="16" alt="Menu icon" src="../assets/images/68da7eb037c47e5d339a23f9_menu-btn.svg"
            class="image-burger white">
        </button>
      </div>

    </div>

    <!-- Overlay -->
    <div class="w-nav-overlay" :class="{ 'w--open': isMobileMenuOpen }" @click="closeMobileMenu">
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EditModeToggle from './EditModeToggle.vue'

const isMobileMenuOpen = ref(false)

const menuItems = [
  { path: '/about', label: 'Overview' },
  { path: '/services', label: 'Services' },
  { path: '/team', label: 'Team' },
  { path: '/customers', label: 'Customers' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
/* Navigation Menu - Desktop */
.w-nav-menu {
  display: block;
}

/* Overlay */
.w-nav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.w-nav-overlay.w--open {
  display: block;
}

/* Mobile Menu Button */
.menu-button {
  cursor: pointer;
  display: none;
  position: relative;
  z-index: 1001;
}

/* Mobile Styles */
@media screen and (max-width: 991px) {
  .menu-button {
    display: block !important;
  }

  .w-nav-menu {
    display: none !important;
    position: fixed;
    inset: 0;
    background: white;
    z-index: 1000;
    padding: 20px;
    overflow-y: auto;
  }

  .w-nav-menu.w--open {
    display: block !important;
  }
}

/* Focus States */
.menu-button:focus,
.close-menu-button:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
</style>
