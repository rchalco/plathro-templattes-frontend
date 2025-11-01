<script setup lang="ts">
import { useUserStore } from '@/modules/security/store/userStore'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const userStore = useUserStore()
const router = useRouter()

// Initialize the store and load user data
onMounted(async () => {
  await userStore.init()
})

async function logout() {
  await userStore.clearOAuthUser()
  router.push({ name: 'login' })
}
</script>
<!-- Prueba comentario adicinado por miVersion 1.0.00-->
<template>
  <!-- Prueba comentario Template Version 1.0.00-->
  <div class="perfil-user-container">
    <div v-if="userStore.userName.value || userStore.userPicture.value" class="perfil-card">
      <img v-if="userStore.userPicture.value" :src="userStore.userPicture.value" alt="Foto de usuario"
        class="perfil-user-photo" loading="lazy" referrerpolicy="no-referrer" />
      <div class="perfil-user-name" v-if="userStore.userName.value">{{ userStore.userName.value }}</div>
      <button @click="logout" class="btn btn-danger mt-3">Cerrar sesión</button>
    </div>
    <div v-else class="perfil-empty">
      <i class="bi bi-person-circle perfil-empty-icon"></i>
      <div class="perfil-empty-text">No hay datos de usuario disponibles</div>
    </div>
  </div>
</template>

<style scoped>
.perfil-user-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background: transparent;
}

.perfil-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.10);
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  min-width: 260px;
}

.perfil-user-photo {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #333333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  margin-bottom: 1.1rem;
  background: #e9ecef;
}

.perfil-user-name {
  font-size: 1.35rem;
  font-weight: 700;
  color: #333333;
  text-align: center;
  word-break: break-word;
  letter-spacing: 0.5px;
}

.perfil-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #bbb;
}

.perfil-empty-icon {
  font-size: 4rem;
  margin-bottom: 0.7rem;
}

.perfil-empty-text {
  font-size: 1.1rem;
  color: #888;
}
</style>
