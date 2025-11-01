<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import environment from "@/_enviroments/enviroment";
import CustomAlert from "@/components/alerts/CustomAlert.vue";
import RegisterUser from "@/modules/security/components/register-user.vue";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import { loginWithProvider } from "@/firebase/useFirebaseAuth";
import { RouterLink } from "vue-router";

const router = useRouter();

// Referencias para los valores de los inputs
const appVersion = environment.appVersion;
const errorDetails = ref<object | string>({});
const isErrorVisible = ref(false);

const showRegister = ref(false);
const email = ref('');
const password = ref('');
const agreeToTerms = ref(false);

const loginOAuth = async (provider: 'google' | 'facebook' | 'apple') => {
  try {
    await loginWithProvider(provider)
    console.log(`Login successful with ${provider}`);
    router.push({ name: 'perfil-user' });

    console.log(`Attempting OAuth login with ${provider}`);
    if (!['google', 'facebook', 'apple'].includes(provider)) {
      throw new Error("Proveedor no soportado");
    }
  } catch (error) {
    console.error(`Error during OAuth login with ${provider}:`, error);
    errorDetails.value = "Error al iniciar sesión con su proveedor." + provider;
    isErrorVisible.value = true;
    return;
  }
}

const handleSignIn = () => {
  if (!email.value || !password.value) {
    errorDetails.value = "Por favor, complete todos los campos";
    isErrorVisible.value = true;
    return;
  }

  if (!agreeToTerms.value) {
    errorDetails.value = "Debe aceptar los términos y condiciones";
    isErrorVisible.value = true;
    return;
  }

  // Implement email/password login logic here
  console.log('Email login:', email.value);
  router.push({ name: 'perfil-user' });
}

const handleAlertClose = () => {
  isErrorVisible.value = false;
};

// Carousel functionality
const currentSlide = ref(0);
const slides = ref([
  {
    image: "https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68ebc60ffedac3885d2e5af7_slide-img.jpg",
    quote: "There are many different ways a business can display customer testimonials — And when determining the best approach...",
    author: {
      name: "Sam Kennedy",
      title: "Marketing Lead, Twitter",
      avatar: "https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68ebc60ffedac3885d2e5b06_slide-img-02.jpg"
    }
  },
  {
    image: "https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68ebc60ffedac3885d2e5b06_slide-img-02-p-1080.jpeg",
    quote: "Customer success is not just about solving problems, it's about creating experiences that customers will remember and share with others.",
    author: {
      name: "Bella Smith",
      title: "Customer Success Manager, Platheo",
      avatar: "https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68ebc60ffedac3885d2e5b06_slide-img-02.jpg"
    }
  },
  {
    image: "https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68ebc60ffedac3885d2e5af7_slide-img.jpg",
    quote: "The best marketing strategy is to create genuine value for your customers. When you focus on their success, your success follows naturally.",
    author: {
      name: "Alex Thompson",
      title: "Business Development, Ignite",
      avatar: "https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68ebc60ffedac3885d2e5b06_slide-img-02.jpg"
    }
  }
]);

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = slides.value.length - 1;
  }
};

const nextSlide = () => {
  if (currentSlide.value < slides.value.length - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0;
  }
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
};

// Auto-play functionality (optional)
// Uncomment the following to enable auto-play
/*
import { onMounted, onUnmounted } from 'vue';

let autoPlayInterval: NodeJS.Timeout | null = null;

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
*/
</script>

<template>
  <section class="auth-page">
    <!-- Error Alert -->
    <CustomAlert v-if="isErrorVisible" :message="errorDetails" color="danger" icon="bi bi-exclamation-circle"
      :dismissible="true" :duration="5000" @closed="handleAlertClose" />

    <!-- Main Layout Container -->
    <main class="auth-container">
      <!-- Left Column - Video/Testimonial Section -->
      <div class="testimonial-section">
        <div class="carousel-container">
          <!-- Navigation arrows -->
          <button class="carousel-nav prev" @click="previousSlide">
            <i class="bi bi-chevron-left"></i>
          </button>
          <button class="carousel-nav next" @click="nextSlide">
            <i class="bi bi-chevron-right"></i>
          </button>

          <!-- Video/Image area -->
          <div class="carousel-content">
            <div class="play-button">
              <i class="bi bi-play-circle-fill"></i>
            </div>
            <!-- Dynamic slide image -->
            <img :src="slides[currentSlide].image" :alt="`Slide ${currentSlide + 1}`" class="carousel-image"
              onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM4OGQ4YjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM2NDk5N2QiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PHBhdGggZD0iTTUwIDUwbDEwMCAxMDBIMTUwbC01MC01MHoiIGZpbGw9IiM1YTc4NmEiIGZpbGwtb3BhY2l0eT0iMC44Ii8+PHBhdGggZD0iTTIwMCA1MFMxODAgMzAgMTUwIDMwczUwIDIwIDUwIDIwIiBmaWxsPSIjNzNhNDkzIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjx0ZXh0IHg9IjUwJSIgeT0iODAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TbGlkZSAke2N1cnJlbnRTbGlkZSArIDF9PC90ZXh0Pjwvc3ZnPg=='" />
          </div>

          <!-- Slide Indicators -->
          <div class="carousel-indicators">
            <button v-for="(slide, index) in slides" :key="index" @click="goToSlide(index)"
              :class="['indicator-dot', { active: index === currentSlide }]"></button>
          </div>

          <!-- Testimonial text overlay -->
          <div class="testimonial-overlay">
            <p class="testimonial-quote">
              {{ slides[currentSlide].quote }}
            </p>
            <div class="testimonial-author">
              <img :src="slides[currentSlide].author.avatar" :alt="slides[currentSlide].author.name"
                class="author-avatar"
                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzM0OTVlNiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMTYiIHI9IjYiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0ibTEwIDMwIGMwLTUgNC05IDktOXM3IDQgNyA5djEiIGZpbGw9IndoaXRlIi8+PC9zdmc+'" />
              <div class="author-info">
                <strong>{{ slides[currentSlide].author.name }}</strong>
                <span>{{ slides[currentSlide].author.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Login Form -->
      <div class="login-section">
        <article class="login-card">
          <section class="card-body body-login">
            <div v-if="!showRegister">
              <!-- Speed indicators -->
              <div class="speed-indicators">
                <div class="indicator">
                  <span class="indicator-icon">⚡</span>
                  <span class="indicator-text">launch fast</span>
                </div>
                <div class="indicator">
                  <span class="indicator-icon">🤝</span>
                  <span class="indicator-text">partner fast</span>
                </div>
                <div class="indicator">
                  <span class="indicator-icon">💼</span>
                  <span class="indicator-text">sell fast</span>
                </div>
              </div>

              <!-- Main Title -->
              <div class="main-header">
                <h1 class="main-title"> <span>Happy</span> Entrepreneurs in Moncton and Fredericton, NB</h1>
              </div>

              <!-- Login Card -->
              <div class="login-card-inner">
                <!-- Two Column Layout -->
                <div class="two-column-layout">
                  <!-- Logo/Brand Column -->
                  <div class="brand-header">
                    <div class="logo-placeholder-platheo ignite-logo large-logo">
                      <img
                        src="https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68da7eb037c47e5d339a23fd_plogo.svg"
                        alt="Ignite"
                        onerror="this.outerHTML='<div class=&quot;logo-text large-logo-text&quot;>IGNITE</div>'" />
                    </div>
                  </div>

                  <!-- FREE WEBSITE section Column -->
                  <div class="free-website-section">
                    <div class="free-website-badge">FREE WEBSITE</div>
                    <p class="mentor-text-by">NB Business mentored by:</p>
                    <p class="mentor-text">Ignite Incubator BIE Program and Oulton College Business Program</p>
                  </div>
                </div>

                <!-- Terms Checkbox -->
                <div class="form-group checkbox-group">
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="agreeToTerms" class="checkbox-input">
                    <span class="checkbox-text">I have read and agree to the
                      <a href="#" class="link">Terms & Conditions</a>
                    </span>
                  </label>
                </div>

                <!-- Google Login -->
                <div class="social-login-section">
                  <button class="btn-google" type="button" @click="loginOAuth('google')">
                    <img
                      src="https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68da96abd705332224fa68cc_google-icon-dashbrd-x-webflow-template.svg"
                      alt="Google" class="google-icon-img"
                      onerror="this.outerHTML='<i class=&quot;bi bi-google google-icon&quot;></i>'" />
                    <span class="google-text">Continue with Google CAD 200 Gift</span>
                    <!-- <span class="gift-badge">CAD 200 Gift</span> -->
                  </button>
                </div>

                <!-- Support Footer -->
                <div class="support-footer">
                  <p class="support-text">
                    Supported by <strong>Platheo Service as a Software Inc</strong>
                  </p>
                </div>

                <!-- Partner Logos -->
                <div class="partner-logos">
                  <div class="logo-placeholder ignite-logo">
                    <img
                      src="https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68e90a5b3babb53367855ae2_Ignite.svg"
                      alt="Ignite" onerror="this.outerHTML='<div class=&quot;logo-text&quot;>IGNITE</div>'" />
                  </div>
                  <div class="logo-placeholder oulton-logo">
                    <img
                      src="https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68e90b0d9d0a014a764fff20_oulton.svg"
                      alt="Oulton College"
                      onerror="this.outerHTML='<div class=&quot;logo-text&quot;>Oulton College</div>'" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Componente RegisterUser modal -->
            <RegisterUser v-if="showRegister" @close="showRegister = false" />
          </section>
        </article>
      </div>
    </main>
  </section>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #f8f9fa;
}

.auth-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}

/* Left Column - Carousel Section */
.testimonial-section {
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
}

.carousel-container {
  position: relative;
  width: 100%;
  max-width: 520px;
  height: 500px;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12), 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Carousel Indicators */
.carousel-indicators {
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator-dot:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.indicator-dot.active {
  background: white;
  transform: scale(1.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s;
}

.carousel-nav:hover {
  background: #0056b3;
  transform: translateY(-50%) scale(1.1);
}

.carousel-nav.prev {
  left: 20px;
}

.carousel-nav.next {
  right: 20px;
}

.carousel-content {
  position: relative;
  width: 100%;
  height: 65%;
  background: linear-gradient(135deg, #88d8b0 0%, #64997d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  transition: opacity 0.5s ease-in-out;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  color: rgba(255, 255, 255, 0.9);
  font-size: 64px;
  cursor: pointer;
  opacity: 0.95;
  transition: all 0.3s ease;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.play-button:hover {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.1);
  color: white;
}

.testimonial-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  padding: 24px;
  height: 35%;
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.testimonial-quote {
  font-size: 15px;
  line-height: 1.5;
  color: #444;
  margin: 0 0 18px 0;
  font-weight: 400;
  letter-spacing: 0.2px;
  transition: opacity 0.3s ease-in-out;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(52, 149, 230, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-info strong {
  font-size: 15px;
  font-weight: 600;
  color: #222;
  letter-spacing: 0.3px;
}

.author-info span {
  font-size: 13px;
  color: #777;
  font-weight: 400;
}

/* Right Column - Login Section */
.login-section {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-card {
  width: 100%;
  max-width: 450px;
}

.body-login {
  background-color: white;
  padding: 0;
}

/* Speed Indicators */
.speed-indicators {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;
}

.indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border: 2px dotted #ddd;
  border-radius: 8px;
  min-width: 80px;
}

.indicator-icon {
  font-size: 20px;
}

.indicator-text {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

/* Main Header */
.main-header {
  text-align: left;
  margin-bottom: 40px;
}

.main-title {
  color: #151c34;
  letter-spacing: -1px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-family: Noto Sans, sans-serif;
  font-size: 27px;
  font-weight: 300;
  line-height: 1.2;
}

.main-title span {
  color: #007bfc;
}

/* Login Card Inner */
.login-card-inner {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Two Column Layout */
.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: center;
  margin-bottom: 25px;
}

/* Brand Header */
.brand-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.large-logo {
  width: 120px;
  height: 120px;
}

.large-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.large-logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #007bff;
  border-color: #007bff;
  padding: 20px;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.brand-title {
  font-size: 48px;
  font-weight: 300;
  margin: 0;
  letter-spacing: 2px;
}

.pla {
  color: #333;
}

.theo {
  color: #007bff;
  font-weight: 400;
}

/* Free Website Section */
.free-website-section {
  text-align: right;
  display: flex;
  flex-direction: column;
  color: #ff6b35;
  justify-content: center;
}

.free-website-badge {
  background: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 15px;
}

.mentor-text {
  font-size: 14px;
  color: #666;
  margin: 3px 0;
  line-height: 1.4;
}

.mentor-text-by {
  font-size: 14px;
  color: #011f8d;
  margin: 3px 0;
  line-height: 1.4;
}

.link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

/* Form Styles - Not used in this design but kept for potential future use */
.form-group {
  margin-bottom: 20px;
}

/* Checkbox */
.checkbox-group {
  margin-bottom: 20px;
  text-align: center;
}

.checkbox-label {
  display: inline-flex;
  align-items: flex-start;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  gap: 8px;
}

.checkbox-input {
  margin: 0;
  flex-shrink: 0;
  accent-color: #007bff;
}

.checkbox-text {
  line-height: 1.4;
}

/* Google Button */
.social-login-section {
  margin-bottom: 20px;
}

.btn-google {
  width: 100%;
  padding: 15px 20px;
  background: #333;
  color: white;
  border: none;
  border-radius: 28px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  font-weight: 500;
  position: relative;
}

.btn-google:hover {
  background: #444;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.google-icon-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
}

.google-icon {
  color: #ea4335;
  font-size: 20px;
  flex-shrink: 0;
}

.google-text {
  flex: 1;
  text-align: center;
  margin: 0 15px;
}

.gift-badge {
  background: #ff6b35;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

/* Support Footer */
.support-footer {
  text-align: center;
  margin-bottom: 20px;
}

.support-text {
  font-size: 12px;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

/* Partner Logos */
.partner-logos {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
  align-items: center;
}

.logo-placeholder {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-placeholder-platheo {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-placeholder img {
  max-height: 100%;
  max-width: 120px;
  object-fit: contain;
}

.logo-text {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  padding: 8px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: #f8f9fa;
}

.ignite-logo .logo-text {
  color: #007bff;
  border-color: #007bff;
}

.oulton-logo .logo-text {
  color: #28a745;
  border-color: #28a745;
}

/* Version Info */
.version-info {
  text-align: center;
  margin-top: 16px;
}

.version-info p {
  font-size: 11px;
  color: #999;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 968px) {
  .auth-container {
    grid-template-columns: 1fr;
    max-width: 100%;
  }

  .testimonial-section {
    display: none;
  }

  .login-section {
    padding: 20px;
  }

  .speed-indicators {
    flex-direction: row;
    gap: 15px;
  }

  .indicator {
    min-width: 70px;
  }
}

@media (max-width: 600px) {
  .login-section {
    padding: 16px;
  }

  .body-login {
    padding: 0;
  }

  .brand-title {
    font-size: 36px;
  }

  .main-title {
    font-size: 20px;
  }

  .login-card-inner {
    padding: 20px;
  }

  .two-column-layout {
    grid-template-columns: 1fr;
    gap: 20px;
    text-align: center;
  }

  .free-website-section {
    text-align: center;
  }

  .large-logo {
    width: 80px;
    height: 80px;
  }

  .large-logo-text {
    width: 80px;
    height: 80px;
    font-size: 16px;
    padding: 15px;
  }

  .speed-indicators {
    flex-wrap: wrap;
    gap: 10px;
  }

  .indicator {
    min-width: 60px;
    padding: 8px;
  }

  .indicator-text {
    font-size: 11px;
  }

  .partner-logos {
    flex-direction: column;
    gap: 15px;
  }

  .carousel-container {
    height: 300px;
  }
}

/* Loading and animation states */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-card {
  animation: fadeIn 0.6s ease-out;
}

.testimonial-content {
  animation: fadeIn 0.8s ease-out 0.2s both;
}
</style>
