import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/modules/security/store/userStore'

// Importación directa solo para rutas críticas (login)
import Login from '../modules/security/views/AuthLogin.vue'
import PerfilUser from '@/modules/security/views/PerfilUser.vue'

// Questionnaire
import QuestionnairePage from '@/modules/questionnaire/routes/QuestionnairePage.vue'

// Customer template pages
import HomePage from '@/modules/customer-template/home/routes/HomePage.vue'
import AboutPage from '@/modules/customer-template/about/routes/AboutPage.vue'
import TeamPage from '@/modules/customer-template/team/routes/TeamPage.vue'
import CustomersPage from '@/modules/customer-template/customers/routes/CustomersPage.vue'
import ContactPage from '@/modules/customer-template/contact/routes/ContactPage.vue'
import ServicesPage from '@/modules/customer-template/services/routes/ServicesPage.vue'
import Terms from '@/modules/compliance/Terms.vue'
import PrivacyPolicy from '@/modules/compliance/PrivacyPolicy.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
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
  {
    path: '/questionnaire',
    name: 'questionnaire',
    component: QuestionnairePage,
    meta: {
      preload: false,
      title: 'Client Questionnaire',
    },
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: {
      preload: true,
      title: 'Home',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
    meta: {
      preload: false,
      title: 'About Us',
    },
  },
  {
    path: '/team',
    name: 'team',
    component: TeamPage,
    meta: {
      preload: false,
      title: 'Our Team',
    },
  },
  {
    path: '/customers',
    name: 'customers',
    component: CustomersPage,
    meta: {
      preload: false,
      title: 'Customer Success',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage,
    meta: {
      preload: false,
      title: 'Contact Us',
    },
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesPage,
    meta: {
      preload: false,
      title: 'Our Services',
    },
  },
  {
    path: '/terms',
    name: 'terms',
    component: Terms,
    meta: {
      preload: false,
      title: 'Terms & Conditions',
    },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyPolicy,
    meta: {
      preload: false,
      title: 'Privacy Policy',
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
  document.title = `${to.meta.title} - Platheo Templates` || 'Platheo Templates'

  // Permitir acceso libre a rutas públicas
  const publicRoutes = [
    'login',
    'questionnaire',
    'home',
    'about',
    'team',
    'customers',
    'contact',
    'services',
    'terms',
    'privacy',
    '',
  ]

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
