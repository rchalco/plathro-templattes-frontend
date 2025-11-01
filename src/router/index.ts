import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/modules/security/store/userStore'

// Importación directa solo para rutas críticas (login)
import Login from '../modules/security/views/AuthLogin.vue'
import PerfilUser from '@/modules/security/views/PerfilUser.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Login,
    meta: {
      preload: true,
      title: 'Inicio',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      preload: true,
      title: 'Login',
    },
  },
  {
    path: '/perfil',
    name: 'perfil-user',
    component: PerfilUser,
    meta: {
      preload: false,
      title: 'Perfil de Usuario',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  // Actualizar el título de la página
  document.title = `${to.meta.title} - Base App` || 'Base App'

  // Permitir acceso libre a rutas públicas
  const publicRoutes = ['login', 'home']

  if (!publicRoutes.includes(to.name as string)) {
    const userStore = useUserStore()

    // Inicializar el store si no se ha hecho
    if (!userStore.user.value) {
      await userStore.init()
    }

    // Verificar si el usuario está autenticado
    if (!userStore.isAuthenticated.value) {
      console.log('Usuario no autenticado, redirigiendo al login')
      return next({ name: 'login' })
    }
  }

  next()
})

export default router
