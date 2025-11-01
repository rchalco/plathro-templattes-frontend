<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  menuOpen: boolean;
  activeItem: string;
  menuItems: Array<{
    id: string;
    icon: string;
    text: string;
    path: string;
  }>;
}>();

const emit = defineEmits<{
  (e: 'update:menuOpen', value: boolean): void;
  (e: 'update:activeItem', value: string): void;
}>();

const router = useRouter();

const toggleMenu = () => {
  emit('update:menuOpen', !props.menuOpen);
};

const setActiveItem = async (item: string) => {
  try {
    emit('update:activeItem', item);
    const selectedItem = props.menuItems.find(menuItem => menuItem.id === item);
    console.log('Selected item:', selectedItem); // Agrega esta línea para verificar el valor de selectedItem en las consolaselectio
    if (selectedItem) {
      // Esperamos a que la navegación se complete
      await router.push(selectedItem.path);
      //implementar la navegación ya que con la primera no se estaba navegando fix temporal
      await router.push(selectedItem.path);
      // Solo cerramos el menú en modo móvil después de la navegación
      if (window.innerWidth <= 768) {
        emit('update:menuOpen', false);
      }
    }
  } catch (error) {
    console.error('Error durante la navegación:', error);
  }
};
</script>

<template>
  <nav class="desktop-sidebar" :class="{ 'sidebar-collapsed': !menuOpen }">
    <div class="sidebar-header" @click="toggleMenu" style="cursor: pointer;">
      <img src="@/assets/img/logo-ct.png" alt="Logo" class="sidebar-logo" />
      <h2 class="sidebar-title" v-show="menuOpen">Jato</h2>
    </div>

    <div class="sidebar-menu">
      <a href="#" v-for="item in menuItems" :key="item.id" class="menu-item"
        :class="{ 'active': activeItem === item.id }" @click="setActiveItem(item.id)">
        <i :class="['bi', item.icon]"></i>
        <span v-show="menuOpen">{{ item.text }}</span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.desktop-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 250px;
  background-color: #206B4B;
  color: #ffffff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 9999;
}

.sidebar-collapsed {
  width: 80px;
  padding: 1.5rem 0.5rem;
}

.sidebar-collapsed .sidebar-title,
.sidebar-collapsed .menu-item span {
  display: none;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  justify-content: center;
  transition: all 0.3s ease;
}

.sidebar-header:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.sidebar-logo {
  width: 40px;
  height: 40px;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  white-space: nowrap;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.menu-item i {
  font-size: 1.25rem;
  min-width: 24px;
  text-align: center;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-weight: 500;
}

@media (max-width: 768px) {
  .desktop-sidebar {
    transform: translateX(-100%);
    width: 250px !important;
  }
}
</style>
