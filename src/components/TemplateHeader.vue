<template>
  <header class="site-header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/home">
          <EditableImage
            page-name="shared"
            component-name="header"
            element-id="logo"
            default-value="https://via.placeholder.com/150x50?text=Logo"
            alt="Logo"
            img-class="logo-img"
          />
        </router-link>
      </div>
      <nav class="main-nav">
        <router-link to="/home" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/team" class="nav-link">Team</router-link>
        <router-link to="/customers" class="nav-link">Customers</router-link>
        <router-link to="/services" class="nav-link">Services</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </nav>
      <div class="header-actions">
        <EditModeToggle />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import EditModeToggle from './EditModeToggle.vue'
import EditableImage from './EditableImage.vue'
</script>

<style scoped>
.site-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
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

.logo-img {
  height: 40px;
  width: auto;
}

.main-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover {
  color: #2196f3;
}

.nav-link.router-link-active {
  color: #2196f3;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #2196f3;
}

.header-actions {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
  }

  .main-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
