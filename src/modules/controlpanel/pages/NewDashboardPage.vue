<template>
  <div class="new-dashboard">
    <!-- Top Header -->
    <header class="top-header">
      <div class="header-left">
        <img src="@/assets/images/picon.svg" alt="Platheo" class="header-logo" />
        <nav class="header-nav">
          <router-link to="/new-dashboard" class="nav-link active">Dashboard</router-link>
          <div class="nav-dropdown" @click="toggleAppsMenu">
            <span class="nav-link">Apps</span>
            <i class="bi bi-chevron-down dropdown-icon"></i>
            <div v-if="showAppsMenu" class="dropdown-menu apps-menu">
              <a href="#" class="dropdown-item" @click.prevent="selectApp('micro-websites')">Micro Websites</a>
              <a href="#" class="dropdown-item" @click.prevent="selectApp('referrals')">Referrals</a>
              <a href="#" class="dropdown-item" @click.prevent="selectApp('simplified-crm')">Simplified CRM</a>
              <a href="#" class="dropdown-item" @click.prevent="selectApp('work-submission')">Work submission form</a>
              <a href="#" class="dropdown-item" @click.prevent="selectApp('ai-appointments')">AI Appointments</a>
            </div>
          </div>
        </nav>
      </div>
      <div class="header-right">
        <button class="notification-btn">
          <i class="bi bi-bell"></i>
        </button>
        <div class="account-dropdown" @click="toggleAccountMenu">
          <div class="user-avatar-small">
            <span>{{ userInitials }}</span>
          </div>
          <span class="account-text">Account</span>
          <i class="bi bi-chevron-down dropdown-icon"></i>
          <div v-if="showAccountMenu" class="dropdown-menu account-menu">
            <router-link to="/perfil" class="dropdown-item">Profile</router-link>
            <a href="#" class="dropdown-item" @click.prevent="logout">Logout</a>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Container -->
    <div class="main-container">
      <!-- Left Sidebar -->
      <aside class="left-sidebar">
        <!-- Workspace Selector -->
        <div class="workspace-selector" @click="toggleWorkspaceMenu">
          <div class="workspace-icon">
            <i class="bi bi-x-circle"></i>
          </div>
          <span class="workspace-name">Guillermo's Workspace</span>
          <i class="bi bi-chevron-down dropdown-icon"></i>
          <div v-if="showWorkspaceMenu" class="dropdown-menu workspace-menu">
            <a href="#" class="dropdown-item selected">
              <i class="bi bi-x-circle"></i>
              <span>Guillermo's Workspace</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item" @click.prevent>Create Workspace</a>
            <a href="#" class="dropdown-item" @click.prevent>Manage Workspaces</a>
          </div>
        </div>

        <!-- Sidebar Navigation -->
        <nav class="sidebar-nav">
          <a href="#" class="sidebar-item" :class="{ active: activeSection === 'micro-websites' }" @click.prevent="activeSection = 'micro-websites'">
            <i class="bi bi-folder"></i>
            <span>Micro Websites</span>
          </a>
          
          <div class="sidebar-section-title">Settings</div>
          
          <a href="#" class="sidebar-item" :class="{ active: activeSection === 'general' }" @click.prevent="activeSection = 'general'">
            <i class="bi bi-sliders"></i>
            <span>General</span>
          </a>
          <a href="#" class="sidebar-item" :class="{ active: activeSection === 'team' }" @click.prevent="activeSection = 'team'">
            <i class="bi bi-people"></i>
            <span>Team</span>
          </a>
          <a href="#" class="sidebar-item" :class="{ active: activeSection === 'plans' }" @click.prevent="activeSection = 'plans'">
            <i class="bi bi-broadcast"></i>
            <span>Plans</span>
          </a>
          <a href="#" class="sidebar-item" :class="{ active: activeSection === 'billing' }" @click.prevent="activeSection = 'billing'">
            <i class="bi bi-currency-dollar"></i>
            <span>Billing</span>
          </a>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="content-area">
        <!-- Content Header -->
        <div class="content-header">
          <h2 class="content-title">All enable to refer</h2>
          <div class="content-actions">
            <div class="search-box">
              <i class="bi bi-search"></i>
              <input type="text" v-model="searchQuery" placeholder="Search colleagues or type Platheo" />
            </div>
            <div class="location-dropdown" @click="toggleLocationMenu">
              <i class="bi bi-calendar"></i>
              <span>Location</span>
              <i class="bi bi-chevron-down dropdown-icon"></i>
              <div v-if="showLocationMenu" class="dropdown-menu location-menu">
                <a href="#" class="dropdown-item" :class="{ selected: selectedLocation === 'Moncton' }" @click.prevent="selectLocation('Moncton')">Moncton</a>
                <a href="#" class="dropdown-item" :class="{ selected: selectedLocation === 'Fredericton' }" @click.prevent="selectLocation('Fredericton')">Fredericton</a>
              </div>
            </div>
            <button class="invite-btn">
              <i class="bi bi-person-plus"></i>
              <span>Invite</span>
            </button>
          </div>
        </div>

        <!-- Content Table -->
        <div class="content-table">
          <div class="table-header">
            <div class="col-name">Name</div>
            <div class="col-modified">Last modified</div>
            <div class="col-published">Last published</div>
            <div class="col-created">Date created <i class="bi bi-chevron-down"></i></div>
          </div>
          <div class="table-body">
            <div v-for="item in filteredItems" :key="item.id" class="table-row">
              <div class="col-name">
                <div class="item-icon">
                  <i class="bi bi-globe"></i>
                </div>
                <div class="item-info">
                  <router-link to="/home" class="item-name">{{ item.name }}</router-link>
                  <span class="item-subtitle">{{ item.subtitle }}</span>
                </div>
              </div>
              <div class="col-modified">{{ item.lastModified }}</div>
              <div class="col-published">
                <i class="bi bi-cloud-check published-icon"></i>
                {{ item.lastPublished }}
              </div>
              <div class="col-created">{{ item.dateCreated }}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/modules/security/store/userStore'

const router = useRouter()
const userStore = useUserStore()

// Dropdown states
const showAppsMenu = ref(false)
const showAccountMenu = ref(false)
const showWorkspaceMenu = ref(false)
const showLocationMenu = ref(false)

// Active section
const activeSection = ref('micro-websites')

// Search and filter
const searchQuery = ref('')
const selectedLocation = ref('')

// User info
const userName = computed(() => userStore.userName.value || 'Guillermo')
const userInitials = computed(() => {
  const name = userName.value
  const parts = name.split(' ')
  if (parts.length >= 2 && parts[0]?.[0] && parts[1]?.[0]) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, Math.min(2, name.length)).toUpperCase()
})

// Mock items - 2 items with globe icon
const items = ref([
  {
    id: 1,
    name: 'Platheo SaaS',
    subtitle: '3 sites',
    lastModified: '5 hours ago',
    lastPublished: 'Nov 19, 2025',
    dateCreated: 'Jul 30, 2025'
  },
  {
    id: 2,
    name: 'Sign-in Portal',
    subtitle: 'sign-in-3f85c8.webflow.io',
    lastModified: '3 hours ago',
    lastPublished: 'Nov 25, 2025',
    dateCreated: 'Nov 25, 2025'
  }
])

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value
  return items.value.filter(item => 
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Toggle functions
const toggleAppsMenu = () => {
  showAppsMenu.value = !showAppsMenu.value
  showAccountMenu.value = false
  showWorkspaceMenu.value = false
  showLocationMenu.value = false
}

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value
  showAppsMenu.value = false
  showWorkspaceMenu.value = false
  showLocationMenu.value = false
}

const toggleWorkspaceMenu = () => {
  showWorkspaceMenu.value = !showWorkspaceMenu.value
  showAppsMenu.value = false
  showAccountMenu.value = false
  showLocationMenu.value = false
}

const toggleLocationMenu = () => {
  showLocationMenu.value = !showLocationMenu.value
  showAppsMenu.value = false
  showAccountMenu.value = false
  showWorkspaceMenu.value = false
}

const selectApp = (app: string) => {
  showAppsMenu.value = false
  // Navigate based on app selection
  switch (app) {
    case 'micro-websites':
      activeSection.value = 'micro-websites'
      break
    case 'referrals':
      router.push('/referrals')
      break
    case 'ai-appointments':
      router.push('/ai-appointments')
      break
    default:
      router.push('/under-construction')
  }
}

const selectLocation = (location: string) => {
  selectedLocation.value = location
  showLocationMenu.value = false
}

const logout = () => {
  router.push('/login')
}

// Close dropdowns when clicking outside
const closeAllDropdowns = () => {
  showAppsMenu.value = false
  showAccountMenu.value = false
  showWorkspaceMenu.value = false
  showLocationMenu.value = false
}
</script>

<style scoped>
.new-dashboard {
  min-height: 100vh;
  background-color: #fafafa;
  font-family: 'Noto Sans', sans-serif;
}

/* Top Header */
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.header-logo {
  width: 32px;
  height: 32px;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}

.nav-link.active {
  border-bottom-color: #333;
}

.nav-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.dropdown-icon {
  font-size: 12px;
  color: #666;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notification-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 18px;
}

.account-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
}

.user-avatar-small {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #8b5cf6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.account-text {
  font-size: 14px;
  color: #333;
}

/* Dropdown Menus */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
  margin-top: 8px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-item.selected {
  color: #8b5cf6;
}

.dropdown-divider {
  height: 1px;
  background-color: #e5e5e5;
  margin: 8px 0;
}

.apps-menu {
  left: -50px;
}

.account-menu {
  right: 0;
  left: auto;
}

/* Main Container */
.main-container {
  display: flex;
  min-height: calc(100vh - 61px);
}

/* Left Sidebar */
.left-sidebar {
  width: 280px;
  background-color: #ffffff;
  border-right: 1px solid #e5e5e5;
  padding: 20px 0;
  flex-shrink: 0;
}

.workspace-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  margin: 0 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
}

.workspace-selector:hover {
  background-color: #f5f5f5;
}

.workspace-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.workspace-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.workspace-menu {
  top: 100%;
  left: 0;
  right: 0;
  width: auto;
}

.sidebar-nav {
  padding: 0 12px;
}

.sidebar-section-title {
  font-size: 12px;
  font-weight: 500;
  color: #999;
  padding: 16px 16px 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sidebar-item:hover {
  background-color: #f5f5f5;
}

.sidebar-item.active {
  background-color: #f0f0f0;
  font-weight: 500;
}

.sidebar-item i {
  font-size: 18px;
  color: #666;
}

/* Content Area */
.content-area {
  flex: 1;
  padding: 24px 32px;
  overflow-x: auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.content-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.content-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  min-width: 280px;
}

.search-box i {
  color: #999;
}

.search-box input {
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
  background: transparent;
}

.search-box input::placeholder {
  color: #999;
}

.location-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  color: #333;
}

.location-menu {
  min-width: 150px;
}

.invite-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.2s;
}

.invite-btn:hover {
  background-color: #f5f5f5;
}

/* Content Table */
.content-table {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 16px 24px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e5e5e5;
  font-size: 13px;
  font-weight: 500;
  color: #666;
}

.table-body {
  padding: 8px 0;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 16px 24px;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.table-row:hover {
  background-color: #fafafa;
}

.table-row:last-child {
  border-bottom: none;
}

.col-name {
  display: flex;
  align-items: center;
  gap: 16px;
}

.item-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
}

.item-icon i {
  font-size: 24px;
  color: #666;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  cursor: pointer;
}

.item-name:hover {
  text-decoration: underline;
}

.item-subtitle {
  font-size: 12px;
  color: #999;
}

.col-modified,
.col-published,
.col-created {
  font-size: 13px;
  color: #666;
}

.col-created {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.published-icon {
  color: #10b981;
  margin-right: 4px;
}

/* Responsive */
@media (max-width: 1024px) {
  .left-sidebar {
    width: 240px;
  }
  
  .search-box {
    min-width: 200px;
  }
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }
  
  .left-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e5e5e5;
  }
  
  .content-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .content-actions {
    flex-wrap: wrap;
    width: 100%;
  }
  
  .search-box {
    min-width: 100%;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr;
  }
  
  .col-published,
  .col-created {
    display: none;
  }
}
</style>
