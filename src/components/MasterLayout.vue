<template>
  <div class="master-layout">
    <!-- Left Sidebar -->
    <aside class="layout-sidebar">
      <div class="sidebar-header">
        <img src="@/assets/img/plogo.svg" alt="Platheo" class="logo" />
      </div>

      <nav class="sidebar-nav">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          active-class="nav-item-active"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button class="dashboard-button" @click="goToDashboard">
          <i class="bi bi-grid-3x3-gap"></i>
          <span>Dashboard</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="layout-main">
      <!-- Top Bar -->
      <header class="layout-header">
        <button class="back-button" @click="goToDashboard" title="Back to Dashboard">
          <i class="bi bi-arrow-left"></i>
        </button>
      </header>

      <!-- Page Content -->
      <main class="layout-content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const menuItems = [
  { path: '/home', label: 'Home', icon: 'bi bi-house' },
  { path: '/about', label: 'About', icon: 'bi bi-info-circle' },
  { path: '/services', label: 'Services', icon: 'bi bi-briefcase' },
  { path: '/team', label: 'Team', icon: 'bi bi-people' },
  { path: '/customers', label: 'Customers', icon: 'bi bi-star' },
  { path: '/contact', label: 'Contact', icon: 'bi bi-envelope' },
]

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
.master-layout {
  display: flex;
  min-height: 100vh;
  background-color: #fafafa;
}

/* Sidebar Styles */
.layout-sidebar {
  width: 240px;
  background-color: #2a2a2a;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid #404040;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 48px;
  height: 48px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  color: #b0b0b0;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 6px;
  transition: all 0.2s ease;
  font-size: 15px;
  font-weight: 500;
}

.nav-item:hover {
  background-color: #3a3a3a;
  color: #ffffff;
}

.nav-item-active {
  background-color: #4a4a4a;
  color: #ffffff;
}

.nav-item i {
  font-size: 20px;
  width: 24px;
  text-align: center;
}

.sidebar-footer {
  padding: 16px 12px;
  border-top: 1px solid #404040;
}

.dashboard-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  background-color: #4a4a4a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dashboard-button:hover {
  background-color: #5a5a5a;
}

.dashboard-button i {
  font-size: 20px;
}

/* Main Content Area */
.layout-main {
  margin-left: 240px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-header {
  background-color: #ffffff;
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  color: #4a4a4a;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background-color: #f5f5f5;
  border-color: #4a4a4a;
  color: #1a1a1a;
}

.back-button i {
  font-size: 18px;
}

.layout-content {
  flex: 1;
  padding: 0;
  overflow-y: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .layout-sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .layout-sidebar.mobile-open {
    transform: translateX(0);
  }

  .layout-main {
    margin-left: 0;
  }

  .layout-header {
    justify-content: space-between;
  }
}
</style>
