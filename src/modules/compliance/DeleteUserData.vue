<template>
  <main class="main-centered privacy-bg">
    <div class="privacy-content">
      <h1>Solicitar eliminación de datos</h1>
      <p>Si deseas que eliminemos permanentemente tus datos de nuestra plataforma, por favor contáctanos por correo
        electrónico incluyendo el correo con el que te registraste:</p>
      <p><strong>Email de contacto:</strong> ruben.chalco.dev@gmail.com</p>
      <p>Procesaremos tu solicitud en un plazo máximo de 72 horas.</p>
      <button class="btn-login" @click="goToLogin">Volver al Login</button>
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
</style>
