<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from '@/modules/security/store/userStore';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import Sidebar from '@/components/Sidenav/side-bar.vue';
import MobileNav from '@/components/Navigation/mobile-nav.vue';

const menuItems = [
  { id: 'buscar', icon: 'bi-search', text: 'Buscar', path: '/modules/host/home/buscar' },
  { id: 'publicar', icon: 'bi-plus-square', text: 'Publicar', path: '/modules/host/home/publicar' },
  // { id: 'bandeja', icon: 'bi-inbox', text: 'Mis Registros', path: '/modules/host/home/mi-bandeja' },
  { id: 'calendario', icon: 'bi-calendar', text: 'Calendario', path: '/modules/host/home/calendario' },
  { id: 'perfil', icon: 'bi-person-circle', text: 'Perfil', path: '/modules/security/perfil' }
];

const menuOpen = ref(false);
const activeItem = ref('buscar');
const isAvailablePhoto = ref(false);

onMounted(async () => {
  document.addEventListener('click', handleClickOutside);
  // Initialize user store
  await userStore.init();
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleClickOutside(event: MouseEvent) {
  // Solo aplicar en escritorio
  if (window.innerWidth <= 768) return;

  // Busca el sidebar en el DOM
  const sidebar = document.querySelector('.sidebar');
  if (sidebar && !sidebar.contains(event.target as Node)) {
    menuOpen.value = false;
  }
}

// Obtener datos del usuario desde secure storage
const userStore = useUserStore();
setTimeout(() => {
  isAvailablePhoto.value = true
}, 1000); // Espera un segundo para simular la carga de datos

</script>

<template>
  <div class="layout">
    <Sidebar v-model:menuOpen="menuOpen" v-model:activeItem="activeItem" :menuItems="menuItems" class="sidebar" />

    <div class="main-content-container">
      <div class="modern-banner desktop-only">
        <div class="overlay"></div>
        <div class="banner-content">
          <h1 class="banner-title">¡Bienvenid@ a Jato!</h1>
          <p class="banner-text">Explora nuevas oportunidades y crece con nosotros.</p>
          <!-- Foto y nombre en la esquina superior derecha -->
          <div class="user-info-banner-top" v-if="userStore.userName.value || userStore.userPicture.value">
            <img v-if="userStore.userPicture.value && isAvailablePhoto" :src="userStore.userPicture.value" alt="Foto de usuario"
              class="user-banner-photo-top" loading="lazy" referrerpolicy="no-referrer" />
            <div class="user-banner-name-top" v-if="userStore.userName.value">{{ userStore.userName.value }}</div>
          </div>
        </div>
      </div>

      <main class="main-content">
        <router-view class="router-view-content" :key="$route.fullPath" />
      </main>
    </div>

    <MobileNav v-model:activeItem="activeItem" :menuItems="menuItems" />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #fcebdd;
  overflow: hidden;
}

.main-content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-left: 80px;
  transition: padding-left 0.3s ease;
  background-color: #fcebdd;
}

.main-content {
  flex: 1;
  width: 100%;
  padding: 1rem;
  background-color: #d3e7c6;
  min-height: calc(100vh - 200px);
  overflow-x: hidden;
  transition: opacity 0.3s ease;
}

.modern-banner {
  width: 100%;
  min-height: 70px;
  position: relative;
  background-image: url('../../../assets/img/banner.jpeg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: #20c997;
  opacity: 0.6;
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
}

.banner-title {
  font-size: 1.1rem;
  margin: 0.3rem 0 0.1rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.12);
}

.banner-text {
  font-size: 0.85rem;
  opacity: 0.8;
  line-height: 1.2;
  max-width: 400px;
  margin: 0 auto;
}

.router-view-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
}

.desktop-only {
  display: block;
}

.user-info-banner {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
}

.user-banner-photo {
  width: 82px;
  height: 82px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  margin-bottom: 0.5rem;
  background: #f8f9fa;
}

.user-banner-name {
  font-size: 1.15rem;
  font-weight: 600;
  color: #fff;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.18);
  margin-top: 0.2rem;
  word-break: break-word;
  text-align: center;
  max-width: 220px;
  line-height: 1.2;
}

.user-info-banner-top {
  position: absolute;
  top: 0.4rem;
  right: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 10;
  background: rgba(32, 201, 151, 0.10);
  border-radius: 0.6rem;
  padding: 0.15rem 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
}

.user-banner-photo-top {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  margin-right: 0.5rem;
  background: #e9ecef;
  display: block;
  overflow: hidden;
}

.user-banner-name-top {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.18);
  margin-top: 0;
  word-break: break-word;
  text-align: left;
  max-width: 110px;
  line-height: 1.1;
  background: rgba(32, 201, 151, 0.22);
  border-radius: 0.4rem;
  padding: 0.1rem 0.4rem;
}

@media (max-width: 768px) {
  .main-content-container {
    padding-left: 0;
    border-top: 10px solid #0E462D;
  }

  .modern-banner,
  .desktop-only {
    display: none;
  }

  .main-content {
    padding: 20px;
  }

  .user-info-banner-top {
    display: none;
  }
}

@media (max-width: 576px) {
  .main-content {
    padding: 0.5em 0;
    padding-bottom: 80px;
    border-top: 8px solid #0E462D;
    /* Línea verde oscura añadida */
  }

  .router-view-content {
    margin-top: 0.5em;
    /* Ajuste adicional para el contenido */
  }
}
</style>
