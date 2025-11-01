<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  activeItem: string;
  menuItems: Array<{
    id: string;
    icon: string;
    text: string;
    path: string;
  }>;
}>();

const emit = defineEmits<{
  (e: 'update:activeItem', value: string): void;
}>();

const router = useRouter();

const setActiveItem = (item: string) => {
  emit('update:activeItem', item);
  const selectedItem = props.menuItems.find(menuItem => menuItem.id === item);
  if (selectedItem?.path) {
    router.push(selectedItem.path);
  }
};
</script>

<template>
  <nav class="mobile-nav">
    <div v-for="item in menuItems" 
         :key="item.id" 
         class="nav-item" 
         :class="{ 'active': activeItem === item.id }"
         @click="setActiveItem(item.id)">
      <i :class="['bi', item.icon]"></i>
      <span>{{ item.text }}</span>
    </div>
  </nav>
</template>

<style scoped>
.mobile-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: 0.5rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  justify-content: space-around;
  align-items: center;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  color: #0E462D;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-item i {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;
  color: #0E462D;
}

.nav-item span {
  font-size: 0.75rem;
  transition: color 0.3s ease;
  color: #0E462D;
}

.nav-item.active {
  color: #0E462D;
  background-color: rgba(14, 70, 45, 0.1);
  border-radius: 8px;
}

.nav-item:hover {
  color: #0E462D;
  background-color: rgba(14, 70, 45, 0.05);
  border-radius: 8px;
}

@media (max-width: 768px) {
  .mobile-nav {
    display: flex;
  }
}
</style>