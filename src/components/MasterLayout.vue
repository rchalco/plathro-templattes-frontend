<template>
  <div class="master-layout">
    <!-- Left Sidebar -->
    <aside class="layout-sidebar">
      <div class="sidebar-header">
        <img src="@/assets/img/plogo.svg" alt="Platheo" class="logo" />
      </div>

      <nav class="sidebar-nav">
        <!-- Edit Mode Toggle -->
        <div class="sidebar-section">
          <EditModeToggle />
        </div>

        <!-- Save Changes Button -->
        <div class="sidebar-section">
          <SaveChangesButton />
        </div>

        <!-- Menu Options -->
        <div class="sidebar-section">
          <div class="section-title">Menu Options</div>
          <div class="menu-option">
            <label class="option-label">
              <input type="checkbox" v-model="menuOptions.services" @change="updateMenuOptions" />
              <span>Services</span>
            </label>
          </div>
          <div class="menu-option">
            <label class="option-label">
              <input type="checkbox" v-model="menuOptions.team" @change="updateMenuOptions" />
              <span>Team</span>
            </label>
          </div>
          <div class="menu-option">
            <label class="option-label">
              <input type="checkbox" v-model="menuOptions.customers" @change="updateMenuOptions" />
              <span>Customers</span>
            </label>
          </div>
        </div>
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
      <!-- Page Content (no header) -->
      <main class="layout-content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EditModeToggle from './EditModeToggle.vue'
import SaveChangesButton from './SaveChangesButton.vue'

const router = useRouter()

const menuOptions = ref({
  services: true,
  team: true,
  customers: true
})

const updateMenuOptions = () => {
  // TODO: Implement menu options update logic
  console.log('Menu options updated:', menuOptions.value)
}

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
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-section {
  border-bottom: 1px solid #404040;
  padding-bottom: 16px;
}

.sidebar-section:last-child {
  border-bottom: none;
}

.section-title {
  color: #b0b0b0;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
  padding: 0 8px;
}

.menu-option {
  margin-bottom: 8px;
}

.option-label {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  color: #e0e0e0;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.option-label:hover {
  background-color: #3a3a3a;
}

.option-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #667eea;
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
