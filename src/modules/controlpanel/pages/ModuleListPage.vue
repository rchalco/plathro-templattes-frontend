<template>
  <div class="module-list-page">
    <div class="module-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <img src="@/assets/img/plogo.svg" alt="Platheo" class="logo" />
          <h2>{{ moduleName }}</h2>
        </div>

        <div class="sidebar-actions">
          <button class="action-button" @click="goToDashboard">
            <i class="bi bi-arrow-left"></i>
            <span>Back to Dashboard</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <header class="content-header">
          <h1>{{ moduleName }} Items</h1>
          <button class="add-button" @click="addItem">
            <i class="bi bi-plus-circle"></i>
            Add New Item
          </button>
        </header>

        <div class="items-list">
          <div v-for="item in items" :key="item.id" class="item-card">
            <div class="item-content">
              <div class="item-icon" v-if="item.icon || item.image">
                <i v-if="item.icon" :class="item.icon" class="item-main-icon"></i>
                <img v-else-if="item.image" :src="item.image" :alt="item.name" class="item-main-image" />
              </div>
              <div class="item-info">
                <h3>{{ item.name }}</h3>
                <p class="item-description">{{ item.description }}</p>
              </div>
              <div class="item-actions">
                <!-- <button class="icon-button" @click="editItem(item)" title="Edit">
                  <i class="bi bi-pencil"></i>
                </button> -->
                <!-- <button class="icon-button danger" @click="deleteItem(item)" title="Delete">
                  <i class="bi bi-trash"></i>
                </button> -->
                <button class="view-button" @click="viewItem(item)">
                  View
                </button>
              </div>
            </div>
          </div>

          <div v-if="items.length === 0" class="empty-state">
            <i class="bi bi-inbox"></i>
            <p>No items yet. Click "Add New Item" to get started.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface Item {
  id: string
  name: string
  description: string
  moduleType: string
  icon?: string
  image?: string
}

const moduleName = computed(() => {
  const path = route.path
  if (path.includes('corporate-site')) return 'Corporate Site'
  if (path.includes('ai-appointments')) return 'AI Appointments'
  if (path.includes('checkout-funnels')) return 'Checkout Funnels'
  if (path.includes('referrals')) return 'Referrals System'
  if (path.includes('affiliates-system')) return 'Affiliates System'
  if (path.includes('suppliers')) return 'Suppliers System'
  if (path.includes('jv-partners')) return 'JV Partners System'
  return 'Module'
})

const items = ref<Item[]>([])

onMounted(() => {
  // Initialize with default item for Corporate Site
  if (route.path.includes('corporate-site')) {
    items.value = [
      {
        id: 'default',
        name: 'Default Template Site',
        description: 'Your main corporate website template',
        moduleType: 'corporate-site',
        icon: 'bi-building'
      }
    ]
  }
})

const goToDashboard = () => {
  router.push('/dashboard')
}

const addItem = () => {
  // TODO: Implement add item functionality
  alert('Add item functionality - to be implemented')
}

const editItem = (item: Item) => {
  // TODO: Implement edit item functionality
  alert(`Edit item: ${item.name}`)
}

const deleteItem = (item: Item) => {
  // TODO: Implement delete item functionality
  if (item.id === 'default') {
    alert('Cannot delete the default template site')
    return
  }
  if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
    items.value = items.value.filter(i => i.id !== item.id)
  }
}

const viewItem = (item: Item) => {
  if (item.id === 'default' && route.path.includes('corporate-site')) {
    router.push('/home')
  } else {
    router.push('/under-construction')
  }
}
</script>

<style scoped>
.module-list-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.module-container {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 32px;
  height: 32px;
}

.sidebar-header h2 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.sidebar-actions {
  padding: 20px;
}

.action-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  background-color: #e8e8e8;
}

.action-button i {
  font-size: 18px;
}

/* Main Content */
.main-content {
  margin-left: 280px;
  flex: 1;
  padding: 32px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.content-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: #1a1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-button:hover {
  background-color: #333;
}

.add-button i {
  font-size: 18px;
}

/* Items List */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.item-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  height: 60px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
}

.item-main-icon {
  font-size: 28px;
  color: #495057;
}

.item-main-image {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.item-description {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.item-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.icon-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-button:hover {
  background-color: #e8e8e8;
}

.icon-button.danger {
  color: #dc3545;
}

.icon-button.danger:hover {
  background-color: #ffe5e8;
  border-color: #dc3545;
}

.icon-button i {
  font-size: 16px;
}

.view-button {
  padding: 10px 20px;
  background-color: #1a1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.view-button:hover {
  background-color: #333;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 16px;
  display: block;
}

.empty-state p {
  font-size: 16px;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    position: relative;
    height: auto;
  }

  .main-content {
    margin-left: 0;
    padding: 20px;
  }

  .item-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
