<template>
  <div class="affiliates-page">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="sidebar-header">
        <div class="logo">
          <span class="logo-icon">P</span>
          <span class="logo-text">Platheo</span>
        </div>
        <button class="close-sidebar" @click="toggleSidebar" v-if="isMobile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Search -->
      <div class="sidebar-search">
        <input type="text" placeholder="Search dashboard..." class="search-input" />
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <div class="nav-item">
          <div class="nav-link">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
            <span>CRM</span>
            <svg class="nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        <div class="nav-item">
          <div class="nav-link">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z">
              </path>
            </svg>
            <span>LMS</span>
            <svg class="nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        <div class="nav-item nav-expanded">
          <div class="nav-link active" @click="toggleWebMenu">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
              </path>
            </svg>
            <span>WEB</span>
            <svg class="nav-arrow" :class="{ 'rotate': isWebMenuOpen }" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          <!-- Submenu -->
          <div class="submenu" v-show="isWebMenuOpen">
            <RouterLink to="/home" class="submenu-link">Overview: visitors</RouterLink>
            <RouterLink to="/home" class="submenu-link active">Pages: Canvas, products</RouterLink>
            <div class="submenu-link">Email accounts</div>
            <div class="submenu-link">Integrations</div>
            <div class="submenu-link">Pricing</div>
            <div class="submenu-link">Settings, etc</div>
          </div>
        </div>

        <div class="nav-item">
          <div class="nav-link">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>Checkout</span>
            <svg class="nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        <div class="nav-item">
          <div class="nav-link">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Marketing</span>
            <svg class="nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        <div class="nav-item">
          <div class="nav-link">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <polyline points="17 11 19 13 23 9"></polyline>
            </svg>
            <span>Affiliates</span>
            <svg class="nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        <div class="nav-item">
          <div class="nav-link">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span>Suppliers</span>
            <svg class="nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        <div class="nav-item">
          <div class="nav-link">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
              </path>
            </svg>
            <span>Accounting</span>
            <svg class="nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </nav>

      <!-- User Profile -->
      <div class="sidebar-footer">
        <div class="user-profile">
          <img src="https://via.placeholder.com/40" alt="User" class="user-avatar" />
          <div class="user-info">
            <div class="user-name">Tenant - Manager</div>
            <div class="user-role">Profile settings</div>
          </div>
          <button class="user-menu-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Mobile Header -->
      <header class="mobile-header" v-if="isMobile">
        <button class="menu-toggle" @click="toggleSidebar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div class="logo-mobile">
          <span class="logo-icon">P</span>
          <span class="logo-text">Platheo</span>
        </div>
        <div class="header-actions">
          <button class="icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span class="badge">4</span>
          </button>
          <button class="icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span class="badge">3</span>
          </button>
        </div>
      </header>

      <!-- Top Header -->
      <div class="top-header">
        <div class="breadcrumb">
          <span>Affiliates</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span class="active">Overview</span>
        </div>
        <div class="header-actions-desktop">
          <button class="icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span class="badge">4</span>
          </button>
          <button class="icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span class="badge">3</span>
          </button>
          <button class="user-btn">
            <img src="https://via.placeholder.com/32" alt="User" class="user-avatar-sm" />
            <span>AI Assistant</span>
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <polyline points="17 11 19 13 23 9"></polyline>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-label">Active</div>
            <div class="stat-value">100</div>
            <div class="stat-change positive">+15.3%</div>
          </div>
          <button class="stat-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>

        <div class="stat-card">
          <div class="stat-icon inactive">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-label">Inactive</div>
            <div class="stat-value">12</div>
            <div class="stat-change positive">+8%</div>
          </div>
          <button class="stat-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>

        <div class="stat-card">
          <div class="stat-icon pending">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-label">Pending</div>
            <div class="stat-value">0</div>
            <div class="stat-change negative">-10%</div>
          </div>
          <button class="stat-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>

        <div class="stat-card">
          <div class="stat-icon all">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-label">All Affiliates</div>
            <div class="stat-value">128</div>
            <div class="stat-change positive">+5%</div>
          </div>
          <button class="stat-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>

      <!-- Affiliates Table -->
      <div class="table-section">
        <div class="table-header">
          <h2>Affiliates</h2>
          <div class="table-actions">
            <div class="search-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input type="text" placeholder="Search contact..." v-model="searchQuery" />
            </div>
            <div class="view-toggle">
              <button class="view-btn active">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                Table view
              </button>
              <button class="view-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Cards view
              </button>
            </div>
          </div>
        </div>

        <div class="filter-bar">
          <div class="filter-tabs">
            <button class="filter-tab active">Registered: All time <span class="tab-count">{{ affiliates.length
                }}</span></button>
            <button class="filter-tab">Next</button>
          </div>
          <button class="invite-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Invite an affiliate
          </button>
        </div>

        <!-- Table -->
        <div class="table-container">
          <table class="affiliates-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>CLICKS</th>
                <th>SALES</th>
                <th>CONVER</th>
                <th>REFUND</th>
                <th>EARNED</th>
                <th>DUE</th>
                <th>EPC</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="affiliate in filteredAffiliates" :key="affiliate.id">
                <td>
                  <div class="affiliate-info">
                    <img :src="affiliate.avatar" :alt="affiliate.name" class="affiliate-avatar" />
                    <div>
                      <div class="affiliate-name">{{ affiliate.name }}</div>
                      <div class="affiliate-email">{{ affiliate.email }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ affiliate.clicks }}</td>
                <td>{{ affiliate.sales }}</td>
                <td>{{ affiliate.conversion }}%</td>
                <td>{{ affiliate.refund }}%</td>
                <td>{{ affiliate.earned }}</td>
                <td>{{ affiliate.due }}</td>
                <td>{{ affiliate.epc }}</td>
                <td>
                  <span class="status-badge" :class="affiliate.status.toLowerCase()">
                    {{ affiliate.status }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="action-btn" title="Edit">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button class="action-btn" title="Delete">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <button class="pagination-btn" :disabled="currentPage === 1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Previous
          </button>
          <div class="pagination-info">
            Rows per page: <select v-model="rowsPerPage" class="rows-select">
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="24">24</option>
            </select>
            <span class="page-count">1-8 of {{ affiliates.length }}</span>
          </div>
          <button class="pagination-btn" :disabled="currentPage * rowsPerPage >= affiliates.length">
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </main>

    <!-- Overlay for mobile sidebar -->
    <div class="overlay" v-if="isSidebarOpen && isMobile" @click="toggleSidebar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

// State
const isSidebarOpen = ref(false)
const isWebMenuOpen = ref(true)
const isMobile = ref(false)
const searchQuery = ref('')
const currentPage = ref(1)
const rowsPerPage = ref(8)

// Mock data
const affiliates = ref([
  {
    id: 1,
    name: 'John Carter',
    email: 'hello@johncarter.com',
    avatar: 'https://via.placeholder.com/40',
    clicks: 100,
    sales: 50,
    conversion: 50,
    refund: 1,
    earned: 'US $ 1,000',
    due: 'US $ 200',
    epc: 'US $ 2',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Sophie Moore',
    email: 'info@sophiemoore.com',
    avatar: 'https://via.placeholder.com/40',
    clicks: 100,
    sales: 50,
    conversion: 50,
    refund: 1,
    earned: 'US $ 1,000',
    due: 'US $ 200',
    epc: 'US $ 2',
    status: 'Inactive'
  },
  {
    id: 3,
    name: 'Matt Cannon',
    email: 'hi@mattcannon.com',
    avatar: 'https://via.placeholder.com/40',
    clicks: 100,
    sales: 50,
    conversion: 50,
    refund: 1,
    earned: 'US $ 1,000',
    due: 'US $ 200',
    epc: 'US $ 2',
    status: 'Inactive'
  },
  {
    id: 4,
    name: 'Lilly Woods',
    email: 'hello@lillywoods.com',
    avatar: 'https://via.placeholder.com/40',
    clicks: 100,
    sales: 50,
    conversion: 50,
    refund: 1,
    earned: 'US $ 1,000',
    due: 'US $ 200',
    epc: 'US $ 2',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Andy Smith',
    email: 'info@andysmith.com',
    avatar: 'https://via.placeholder.com/40',
    clicks: 100,
    sales: 50,
    conversion: 50,
    refund: 1,
    earned: 'US $ 1,000',
    due: 'US $ 200',
    epc: 'US $ 2',
    status: 'Inactive'
  },
  {
    id: 6,
    name: 'Karina Carl',
    email: 'contact@carlericor.com',
    avatar: 'https://via.placeholder.com/40',
    clicks: 100,
    sales: 50,
    conversion: 50,
    refund: 1,
    earned: 'US $ 1,000',
    due: 'US $ 200',
    epc: 'US $ 2',
    status: 'Active'
  },
  {
    id: 7,
    name: 'Patrick Meyes',
    email: 'hello@patrickmeyes.com',
    avatar: 'https://via.placeholder.com/40',
    clicks: 100,
    sales: 50,
    conversion: 50,
    refund: 1,
    earned: 'US $ 1,000',
    due: 'US $ 200',
    epc: 'US $ 2',
    status: 'Inactive'
  },
  {
    id: 8,
    name: 'Sandy Houston',
    email: 'info@sandyhouston.com',
    avatar: 'https://via.placeholder.com/40',
    clicks: 100,
    sales: 50,
    conversion: 50,
    refund: 1,
    earned: 'US $ 1,000',
    due: 'US $ 200',
    epc: 'US $ 2',
    status: 'Active'
  }
])

// Computed
const filteredAffiliates = computed(() => {
  if (!searchQuery.value) return affiliates.value

  const query = searchQuery.value.toLowerCase()
  return affiliates.value.filter(affiliate =>
    affiliate.name.toLowerCase().includes(query) ||
    affiliate.email.toLowerCase().includes(query)
  )
})

// Methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleWebMenu = () => {
  isWebMenuOpen.value = !isWebMenuOpen.value
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
  if (!isMobile.value) {
    isSidebarOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
/* Base styles */
.affiliates-page {
  display: flex;
  min-height: 100vh;
  background: #0f172a;
  color: #e2e8f0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: #1e293b;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #334155;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 100;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #334155;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 700;
}

.close-sidebar {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
}

.sidebar-search {
  padding: 16px 20px;
  border-bottom: 1px solid #334155;
}

.search-input {
  width: 100%;
  padding: 10px 12px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #e2e8f0;
  font-size: 14px;
}

.search-input::placeholder {
  color: #64748b;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.nav-item {
  margin: 2px 12px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  color: #94a3b8;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #334155;
  color: #e2e8f0;
}

.nav-link.active {
  background: #334155;
  color: #e2e8f0;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-arrow {
  margin-left: auto;
  transition: transform 0.3s;
}

.nav-arrow.rotate {
  transform: rotate(180deg);
}

.submenu {
  padding: 4px 0 4px 44px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.submenu-link {
  display: block;
  padding: 8px 12px;
  color: #64748b;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.submenu-link:hover {
  background: #334155;
  color: #e2e8f0;
}

.submenu-link.active {
  background: #334155;
  color: #3b82f6;
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid #334155;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #e2e8f0;
}

.user-role {
  font-size: 12px;
  color: #64748b;
}

.user-menu-btn {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
}

/* Main Content */
.main-content {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}

.mobile-header {
  display: none;
  padding: 16px 20px;
  background: #1e293b;
  border-bottom: 1px solid #334155;
  align-items: center;
  gap: 16px;
}

.menu-toggle {
  background: none;
  border: none;
  color: #e2e8f0;
  cursor: pointer;
  padding: 4px;
}

.logo-mobile {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.top-header {
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #334155;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 14px;
}

.breadcrumb .active {
  color: #e2e8f0;
}

.header-actions-desktop {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn {
  position: relative;
  background: #1e293b;
  border: 1px solid #334155;
  padding: 8px;
  border-radius: 8px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: #334155;
  color: #e2e8f0;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1e293b;
  border: 1px solid #334155;
  padding: 6px 12px;
  border-radius: 8px;
  color: #e2e8f0;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.user-btn:hover {
  background: #334155;
}

.user-avatar-sm {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 24px 32px;
}

.stat-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon.active {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.stat-icon.inactive {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.stat-icon.pending {
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
}

.stat-icon.all {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 4px;
}

.stat-change {
  font-size: 14px;
  font-weight: 500;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.stat-menu {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
}

/* Table Section */
.table-section {
  margin: 24px 32px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #334155;
}

.table-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #e2e8f0;
  margin: 0;
}

.table-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #0f172a;
  border: 1px solid #334155;
  padding: 8px 12px;
  border-radius: 8px;
}

.search-box input {
  background: none;
  border: none;
  color: #e2e8f0;
  font-size: 14px;
  width: 200px;
  outline: none;
}

.search-box input::placeholder {
  color: #64748b;
}

.view-toggle {
  display: flex;
  gap: 8px;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #0f172a;
  border: 1px solid #334155;
  color: #94a3b8;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.view-btn:hover {
  background: #334155;
  color: #e2e8f0;
}

.view-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.filter-bar {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #334155;
}

.filter-tabs {
  display: flex;
  gap: 8px;
}

.filter-tab {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid transparent;
  color: #94a3b8;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.filter-tab:hover {
  background: #334155;
  color: #e2e8f0;
}

.filter-tab.active {
  background: #334155;
  border-color: #3b82f6;
  color: #e2e8f0;
}

.tab-count {
  background: #0f172a;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 8px;
  font-size: 12px;
}

.invite-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #3b82f6;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.invite-btn:hover {
  background: #2563eb;
}

/* Table */
.table-container {
  overflow-x: auto;
}

.affiliates-table {
  width: 100%;
  border-collapse: collapse;
}

.affiliates-table thead {
  background: #0f172a;
}

.affiliates-table th {
  padding: 12px 24px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.affiliates-table td {
  padding: 16px 24px;
  border-top: 1px solid #334155;
  color: #cbd5e1;
  font-size: 14px;
}

.affiliate-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.affiliate-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.affiliate-name {
  font-weight: 500;
  color: #e2e8f0;
  margin-bottom: 2px;
}

.affiliate-email {
  font-size: 13px;
  color: #64748b;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.active {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.status-badge.inactive {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #334155;
  color: #e2e8f0;
}

/* Pagination */
.pagination {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #334155;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #0f172a;
  border: 1px solid #334155;
  color: #94a3b8;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background: #334155;
  color: #e2e8f0;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #94a3b8;
  font-size: 14px;
}

.rows-select {
  background: #0f172a;
  border: 1px solid #334155;
  color: #e2e8f0;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  margin: 0 8px;
}

.page-count {
  margin-left: 8px;
}

/* Overlay */
.overlay {
  display: none;
}

/* Mobile Responsive */
@media (max-width: 1023px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
    z-index: 200;
  }

  .sidebar-open {
    transform: translateX(0);
  }

  .mobile-header {
    display: flex;
  }

  .header-actions-desktop {
    display: none;
  }

  .overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 150;
  }

  .top-header {
    padding: 16px 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    padding: 16px 20px;
    gap: 16px;
  }

  .table-section {
    margin: 16px 20px;
  }

  .table-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .table-actions {
    width: 100%;
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

  .search-box input {
    width: 100%;
  }

  .view-toggle {
    width: 100%;
  }

  .view-btn {
    flex: 1;
    justify-content: center;
  }

  .filter-bar {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .filter-tabs {
    width: 100%;
    overflow-x: auto;
  }

  .invite-btn {
    width: 100%;
    justify-content: center;
  }

  .pagination {
    flex-direction: column;
    gap: 12px;
  }

  .pagination-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .affiliates-table {
    font-size: 12px;
  }

  .affiliates-table th,
  .affiliates-table td {
    padding: 12px 16px;
  }

  .stat-value {
    font-size: 24px;
  }
}
</style>
