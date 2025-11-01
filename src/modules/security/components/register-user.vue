<script setup lang="ts">
import { loginWithProvider } from '../../../firebase/useFirebaseAuth'

const login = (provider: 'google' | 'facebook' | 'apple') => loginWithProvider(provider)
</script>
<template>
  <div class="register-modal">
    <div class="register-header">
      <button class="close-btn" title="Cerrar" @click="$emit('close')">
        <i class="bi bi-x-lg"></i>
      </button>
      <span class="register-title">Registrarse</span>
    </div>
    <div class="register-content">
      <h2 class="welcome-title">Bienvenid@ a Jato!</h2>
      <div class="divider"><span>o</span></div>
      <div class="social-btns">
        <button class="btn-social google" @click="login('google')">
          <i class="bi bi-google"></i>
          Continúa con Google
        </button>
        <button class="btn-social facebook" @click="login('facebook')">
          <i class="bi bi-facebook"></i>
          Continúa con Facebook
        </button>
        <button class="btn-social apple" @click="login('apple')">
          <i class="bi bi-apple"></i>
          Continúa con Apple
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-modal {
  max-width: 420px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.10);
  overflow: hidden;
  font-family: inherit;
  opacity: 0.9;
  border: 2px solid #198754;
}

.register-header {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem 0.5rem 1.5rem;
  border-bottom: 1px solid #eee;
  position: relative;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #222;
  margin-right: 1rem;
  cursor: pointer;
}

.register-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0 auto;
  color: #198754;
}

.register-content {
  padding: 1.5rem;
}

.welcome-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #198754;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.2rem 0 1rem 0;
  color: #888;
  font-size: 1rem;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ddd;
}

.divider:not(:empty)::before {
  margin-right: .7em;
}

.divider:not(:empty)::after {
  margin-left: .7em;
}

.social-btns {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.btn-social {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  border: 1px solid #bbb;
  border-radius: 0.7rem;
  background: #fff;
  color: #222;
  font-size: 1.05rem;
  font-weight: 500;
  padding: 0.8rem 0.7rem;
  cursor: pointer;
  transition: background 0.15s, border 0.15s;
}

.btn-social:hover {
  background: #f7f7f7;
  border-color: #888;
}

.btn-social .bi-google {
  color: #ea4335;
  font-size: 1.3em;
}

.btn-social .bi-facebook {
  color: #1877f3;
  font-size: 1.3em;
}

.btn-social .bi-apple {
  color: #222;
  font-size: 1.3em;
}
</style>
