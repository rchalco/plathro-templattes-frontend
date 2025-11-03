<template>
  <header class="site-header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/home" class="logo-link">
          <EditableText page-name="shared" component-name="header" element-id="logo-text" default-value="home"
            tag="span" class-name="logo-text" :rows="1" />
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <nav class="main-nav desktop-nav">
        <router-link to="/home" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/team" class="nav-link">Team</router-link>
        <router-link to="/customers" class="nav-link">Customers</router-link>
        <router-link to="/services" class="nav-link">Services</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </nav>

      <div class="header-actions">
        <!-- Sign In Button -->
        <router-link to="/sign-in" class="sign-in-btn">
          <svg class="sign-in-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <EditableText page-name="shared" component-name="header" element-id="sign-in-text"
            default-value="Start for free" tag="span" class-name="sign-in-text" :rows="1" />
        </router-link>

        <EditModeToggle />

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle menu">
          <svg class="menu-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path v-if="!isMobileMenuOpen" d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
            <path v-else d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <nav class="mobile-nav" :class="{ 'mobile-nav-open': isMobileMenuOpen }">
      <router-link to="/home" class="mobile-nav-link" @click="closeMobileMenu">Home</router-link>
      <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">About</router-link>
      <router-link to="/team" class="mobile-nav-link" @click="closeMobileMenu">Team</router-link>
      <router-link to="/customers" class="mobile-nav-link" @click="closeMobileMenu">Customers</router-link>
      <router-link to="/services" class="mobile-nav-link" @click="closeMobileMenu">Services</router-link>
      <router-link to="/contact" class="mobile-nav-link" @click="closeMobileMenu">Contact</router-link>
      <div class="mobile-divider"></div>
      <router-link to="/sign-in" class="mobile-nav-link mobile-sign-in" @click="closeMobileMenu">
        <span class="mobile-sign-in-text">Start for free</span>
      </router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EditModeToggle from './EditModeToggle.vue'
import EditableText from './EditableText.vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.site-header {
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo {
  flex-shrink: 0;
}

.logo-link {
  text-decoration: none;
  color: #000;
  font-weight: 600;
  font-size: 1.25rem;
}

.logo-text {
  color: #000;
  font-weight: 600;
  font-size: 1.25rem;
  text-decoration: none;
}

.desktop-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 400;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

.nav-link:hover {
  color: #000;
}

.nav-link.router-link-active {
  color: #000;
  font-weight: 500;
}

.header-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sign-in-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid #000;
}

.sign-in-btn:hover {
  background-color: #333;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sign-in-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.sign-in-text {
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}

.mobile-menu-btn:hover {
  color: #000;
}

.menu-icon {
  width: 24px;
  height: 24px;
}

.mobile-nav {
  display: none;
  background-color: #ffffff;
  border-top: 1px solid #f0f0f0;
  padding: 1rem 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.mobile-nav-open {
  max-height: 400px;
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem 2rem;
  text-decoration: none;
  color: #666;
  font-weight: 400;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.mobile-nav-link:hover {
  color: #000;
  background-color: #f8f9fa;
  border-left-color: #000;
}

.mobile-nav-link.router-link-active {
  color: #000;
  font-weight: 500;
  background-color: #f8f9fa;
  border-left-color: #000;
}

.mobile-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 0.5rem 2rem;
}

.mobile-sign-in {
  background-color: #000;
  color: #fff !important;
  margin: 0.5rem 2rem;
  border-radius: 6px;
  border-left: 3px solid transparent !important;
  text-align: center;
  font-weight: 500;
}

.mobile-sign-in:hover {
  background-color: #333 !important;
  color: #fff !important;
}

.mobile-sign-in-text {
  color: #fff;
  font-weight: 500;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-nav {
    display: block;
  }

  .header-container {
    padding: 0 1rem;
  }

  .sign-in-btn {
    display: none;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 1rem;
  }

  .logo-text {
    font-size: 1.1rem;
  }

  .sign-in-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .sign-in-icon {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 640px) and (min-width: 481px) {
  .sign-in-text {
    display: none;
  }
}
</style>
