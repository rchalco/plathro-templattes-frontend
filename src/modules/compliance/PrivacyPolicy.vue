<template>
  <main class="main-centered privacy-bg">
    <div class="privacy-content">
      <h1>Política de Privacidad de Jato App</h1>
      <p>Jato App recopila información básica de los usuarios mediante proveedores como Google, Facebook y Apple,
        exclusivamente con fines de autenticación y personalización de la experiencia de usuario.</p>
      <p>No compartimos esta información con terceros y protegemos los datos con las mejores prácticas de seguridad.</p>
      <p>Si deseas más información o tienes dudas sobre esta política, puedes escribirnos a:
        <strong>ruben.chalco.dev@gmail.com</strong>
      </p>
      <button class="btn-login" @click="goToLogin">Volver al Login</button>
      <div class="policy-links">
        <RouterLink class="policy-link" to="/privacy-policy">Política de Privacidad</RouterLink>
        <RouterLink class="policy-link" to="/delete-user-data">Eliminar Datos de Usuario</RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function goToLogin() {
  router.push({ name: 'login' })
}
</script>

<style scoped>
.privacy-bg {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://www.transparenttextures.com/patterns/white-wall-3.png'), #f5f6fa;
  background-size: cover;
}

.privacy-content {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.10);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  max-width: 540px;
  width: 100%;
  text-align: center;
}

.privacy-content h1 {
  font-size: 2rem;
  color: #198754;
  margin-bottom: 1.2rem;
}

.privacy-content p {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
}

.privacy-content strong {
  color: #198754;
}

.btn-login {
  margin-top: 1.5rem;
  background: #198754;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.7rem 2.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-login:hover {
  background: #145c32;
}

.policy-links {
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.policy-link {
  color: #6c757d;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s;
  border-bottom: 1px dotted #b0b8be;
  padding-bottom: 2px;
}

.policy-link:hover {
  color: #198754;
  border-bottom: 1px solid #198754;
}
</style>
