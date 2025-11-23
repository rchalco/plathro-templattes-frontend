<template>
  <div class="dashboard-page">
    <div class="dashboard-container">
      <!-- Left Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <img src="@/assets/img/plogo.svg" alt="Platheo" class="logo" />
          <h2>Dashboard</h2>
        </div>

        <div class="user-info">
          <div class="user-avatar">
            <span>{{ userInitials }}</span>
          </div>
          <div class="user-details">
            <p class="user-name">{{ userName }}'s Workspace</p>
          </div>
        </div>

        <nav class="sidebar-nav">
          <a
            v-for="item in menuItems"
            :key="item.path"
            :href="item.path"
            class="nav-item"
            @click.prevent="navigateTo(item.path)"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <header class="content-header">
          <h1>All sites</h1>
        </header>

        <div class="cards-grid">
          <div
            v-for="item in menuItems"
            :key="item.path"
            class="site-card"
            @click="navigateTo(item.path)"
          >
            <div class="card-image">
              <img :src="item.image" :alt="item.label" />
            </div>
            <div class="card-content">
              <h3>{{ item.label }}</h3>
              <p class="card-description">{{ item.description }}</p>
              <button class="card-action">
                {{ item.path === '/home' ? 'Edit Site' : 'View Details' }}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/modules/security/store/userStore'

// Import images
import homeDecor1 from '@/assets/img/home-decor-1.jpg'
import homeDecor2 from '@/assets/img/home-decor-2.jpg'
import homeDecor3 from '@/assets/img/home-decor-3.jpg'
import meetingImg from '@/assets/img/meeting.jpg'
import product12 from '@/assets/img/product-12.jpg'
import bgSmartHome1 from '@/assets/img/bg-smart-home-1.jpg'
import bgSmartHome2 from '@/assets/img/bg-smart-home-2.jpg'
import bgPricing from '@/assets/img/bg-pricing.jpg'
import team1 from '@/assets/img/team-1.jpg'

const router = useRouter()
const userStore = useUserStore()

const userName = computed(() => userStore.userName.value || 'User')
const userInitials = computed(() => {
  const name = userName.value
  const parts = name.split(' ')
  if (parts.length >= 2 && parts[0]?.[0] && parts[1]?.[0]) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, Math.min(2, name.length)).toUpperCase()
})

const menuItems = [
  {
    label: 'Corporate Site',
    path: '/home',
    icon: 'bi bi-building',
    image: homeDecor1,
    description: 'Manage your corporate website and landing pages',
  },
  {
    label: 'AI Appointments',
    path: '/ai-appointments',
    icon: 'bi bi-calendar-check',
    image: homeDecor2,
    description: 'AI-powered appointment scheduling system',
  },
  {
    label: 'Checkout Funnels',
    path: '/checkout-funnels',
    icon: 'bi bi-cart-check',
    image: homeDecor3,
    description: 'Optimize your sales funnels and checkout process',
  },
  {
    label: 'Referrals System',
    path: '/referrals',
    icon: 'bi bi-people',
    image: meetingImg,
    description: 'Track and manage customer referrals',
  },
  {
    label: 'Affiliates System',
    path: '/affiliates-system',
    icon: 'bi bi-share',
    image: product12,
    description: 'Manage your affiliate marketing program',
  },
  {
    label: 'Suppliers System',
    path: '/suppliers',
    icon: 'bi bi-truck',
    image: bgSmartHome1,
    description: 'Supplier and inventory management',
  },
  {
    label: 'JV Partners System',
    path: '/jv-partners',
    icon: 'bi bi-handshake',
    image: bgSmartHome2,
    description: 'Joint venture partnerships management',
  },
  {
    label: 'Billing',
    path: '/billing',
    icon: 'bi bi-credit-card',
    image: bgPricing,
    description: 'Billing and payment management',
  },
  {
    label: 'Account',
    path: '/perfil',
    icon: 'bi bi-person-circle',
    image: team1,
    description: 'Manage your account settings',
  },
]

const navigateTo = (path: string) => {
  if (path === '/home') {
    router.push(path)
  } else if (path === '/perfil') {
    router.push(path)
  } else {
    router.push('/under-construction')
  }
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.dashboard-container {
  display: flex;
  min-height: 100vh;
}

/* Sidebar Styles */
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
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.user-info {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.sidebar-nav {
  flex: 1;
  padding: 12px 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #4a4a4a;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 4px;
  transition: all 0.2s ease;
  font-size: 14px;
}

.nav-item:hover {
  background-color: #f5f5f5;
  color: #1a1a1a;
}

.nav-item i {
  font-size: 18px;
  width: 20px;
  text-align: center;
}

/* Main Content */
.main-content {
  margin-left: 280px;
  flex: 1;
  padding: 32px;
}

.content-header {
  margin-bottom: 32px;
}

.content-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.site-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}

.site-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-content h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.card-description {
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.card-action {
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.card-action:hover {
  background-color: #333;
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

  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
