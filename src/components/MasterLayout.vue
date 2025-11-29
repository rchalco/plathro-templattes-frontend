<template>
  <div class="master-layout">
    <!-- Left Sidebar -->
    <aside class="layout-sidebar">
      <div class="sidebar-header">
        <img src="@/assets/images/picon.svg" alt="Platheo" class="logo" />
      </div>

      <nav class="sidebar-nav">
        <!-- Edit Mode Toggle -->
        <div class="sidebar-section">
          <EditModeToggle />
        </div>

        <!-- Save Changes Button -->
        <div class="sidebar-section">
          <button class="save-content-button" @click="openSaveModal">
            <i class="bi bi-floppy"></i>
            <span>Save Content</span>
          </button>
          <SaveChangesModal :is-open="isSaveModalOpen" @close="closeSaveModal" />
        </div>

        <!-- Publish Site Button -->
        <div class="sidebar-section">
          <PublishSiteButton />
        </div>

        <!-- Analytics Button -->
        <div class="sidebar-section">
          <button class="analytics-button" @click="goToAnalytics">
            <i class="bi bi-graph-up-arrow"></i>
            <span>View Analytics</span>
          </button>
        </div>

        <!-- Site Management Actions -->
        <div class="sidebar-section site-actions">
          <button class="save-content-button" @click="deactivateSite">
            <i class="bi bi-pause-circle"></i>
            <span>Disabled Site</span>
          </button>

          <button class="save-content-button" @click="deleteSite">
            <i class="bi bi-trash3"></i>
            <span>Delete Site</span>
          </button>
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
import PublishSiteButton from './PublishSiteButton.vue'
import SaveChangesModal from './SaveChangesModal.vue'

const router = useRouter()

const menuOptions = ref({
  services: true,
  team: true,
  customers: true
})

const isSaveModalOpen = ref(false)

const openSaveModal = () => {
  isSaveModalOpen.value = true
}

const closeSaveModal = () => {
  isSaveModalOpen.value = false
}

const updateMenuOptions = () => {
  // TODO: Implement menu options update logic
  console.log('Menu options updated:', menuOptions.value)
}

const goToDashboard = () => {
  router.push('/new-dashboard')
}

const goToAnalytics = () => {
  router.push('/under-construction')
}

const deactivateSite = () => {
  if (confirm('¿Estás seguro de que quieres desactivar el sitio? Los visitantes no podrán acceder hasta que lo reactives.')) {
    // TODO: Implement site deactivation logic
    alert('Sitio desactivado correctamente')
  }
}

const deleteSite = () => {
  const confirmText = 'ELIMINAR'
  const userInput = prompt(`Esta acción NO se puede deshacer. Se eliminarán todos los datos del sitio.\n\nEscribe "${confirmText}" para confirmar:`)

  if (userInput === confirmText) {
    // TODO: Implement site deletion logic
    alert('Sitio eliminado. Redirigiendo al dashboard...')
    router.push('/dashboard')
  } else if (userInput !== null) {
    alert('Cancelado. El texto no coincide.')
  }
}
</script>

<style scoped>
.master-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
}

/* Sidebar Styles */
.layout-sidebar {
  width: 260px;
  background-color: #3a3a3a;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
  backdrop-filter: blur(20px);
}

.sidebar-header {
  padding: 32px 24px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #dbe0e0e6;
  background-image: radial-gradient(#cccccc 1px, transparent 2px);
  background-size: 20px 20px;
}

.sidebar-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 24px;
  right: 24px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.logo {
  width: 52px;
  height: 52px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo:hover {
  transform: scale(1.05);
}

.sidebar-nav {
  flex: 1;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-section {
  padding: 12px 8px 20px;
  position: relative;
}

/* Global button styles for all sidebar buttons */
.sidebar-section :deep(button),
.action-button,
.dashboard-button {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

/* Shimmer effect for all buttons */
.sidebar-section :deep(button)::before,
.action-button::before,
.dashboard-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: #0a0909;
  transition: left 0.5s;
}

.sidebar-section :deep(button):hover::before,
.action-button:hover::before,
.dashboard-button:hover::before {
  left: 100%;
}

/* Icon styles for all buttons */
.sidebar-section :deep(button) i,
.sidebar-section :deep(button) svg,
.action-button i,
.dashboard-button i {
  font-size: 16px;
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.sidebar-section :deep(button):hover i,
.sidebar-section :deep(button):hover svg,
.action-button:hover i,
.dashboard-button:hover i {
  transform: scale(1.1);
}

.sidebar-section:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent);
}

.section-title {
  color: #292727;
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
  padding: 20px 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
}

.sidebar-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 24px;
  right: 24px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.dashboard-button {
  /* Inherits dimensions and layout from global styles above */
  background-color: #0a0909;
  color: #ffffff;
}

.dashboard-button:hover {
  transform: translateY(-2px);
}

.dashboard-button:active {
  transform: translateY(0);
  transition: transform 0.1s;
}

/* Main Content Area */
.layout-main {
  margin-left: 260px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
}

.layout-main::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  z-index: 1;
}

.layout-content {
  flex: 1;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  margin-top: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .layout-sidebar {
    width: 280px;
    transform: translateX(-100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 8px 0 32px rgba(0, 0, 0, 0.2);
  }

  .layout-sidebar.mobile-open {
    transform: translateX(0);
  }

  .layout-main {
    margin-left: 0;
  }

  .layout-content {
    border-top-left-radius: 0;
    margin-top: 0;
  }
}

/* Scrollbar Styling */
.layout-sidebar::-webkit-scrollbar {
  width: 4px;
}

.layout-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.layout-sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.layout-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Animation for sidebar sections */
@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.sidebar-section {
  animation: slideInFromLeft 0.6s ease-out;
}

.sidebar-section:nth-child(1) {
  animation-delay: 0.1s;
}

.sidebar-section:nth-child(2) {
  animation-delay: 0.2s;
}

.sidebar-section:nth-child(3) {
  animation-delay: 0.3s;
}

.sidebar-section:nth-child(4) {
  animation-delay: 0.4s;
}

.sidebar-section:nth-child(5) {
  animation-delay: 0.5s;
}

/* Site Action Buttons */
.site-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Save Content Button */
.save-content-button {
  background-color: #0f0f0f;
  color: white;
}

.save-content-button:hover {
  background-color: #0a0909;
  color: white;
}

/* Analytics Button */
.analytics-button {
  background-color: #0f0f0f;
  color: white;
}

.analytics-button:hover {
  background-color: #0a0909;
  color: white;
}

/* Action buttons inherit global styles but can have specific properties */

/* Deactivate Button */
.deactivate-button {
  background: linear-gradient(135deg, #ffa726 0%, #ff9800 100%);
  color: white;
  box-shadow:
    0 3px 12px rgba(255, 167, 38, 0.3),
    0 2px 6px rgba(255, 167, 38, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.deactivate-button:hover {
  transform: translateY(-1px);
  box-shadow:
    0 6px 20px rgba(255, 167, 38, 0.4),
    0 3px 8px rgba(255, 167, 38, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, #ffb74d 0%, #ffa726 100%);
}

/* Delete Button */
.delete-button {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  color: white;
  box-shadow:
    0 3px 12px rgba(244, 67, 54, 0.3),
    0 2px 6px rgba(244, 67, 54, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.delete-button:hover {
  transform: translateY(-1px);
  box-shadow:
    0 6px 20px rgba(244, 67, 54, 0.4),
    0 3px 8px rgba(244, 67, 54, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, #ef5350 0%, #f44336 100%);
}

/* Global hover effects */
.sidebar-section :deep(button):hover,
.action-button:hover {
  transform: translateY(-1px);
}

.sidebar-section :deep(button):active,
.action-button:active,
.dashboard-button:active {
  transform: translateY(0);
  transition: transform 0.1s;
}
</style>
