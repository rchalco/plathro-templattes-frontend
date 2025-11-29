<template>
  <div class="container">
    <!-- Terms & Conditions Modal -->
    <div v-if="showTermsModal" class="terms-modal-overlay" @click.self="closeTermsModal">
      <div class="terms-modal-content">
        <div class="terms-modal-header">
          <h2>Terms &amp; Conditions</h2>
          <button class="terms-modal-close" @click="closeTermsModal">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="terms-modal-body">
          <TermsContent />
        </div>
        <div class="terms-modal-footer">
          <button class="terms-modal-accept" @click="acceptTerms">Accept &amp; Close</button>
        </div>
      </div>
    </div>

    <!-- Mobile Warning Overlay -->
    <!-- <div v-if="isMobileDevice" class="mobile-warning-overlay">
      <div class="mobile-warning-content">
        <i class="bi bi-display"></i>
        <h2>Desktop Required</h2>
        <p>This application requires a desktop environment for optimal functionality. Please access this site from a
          desktop or laptop computer.</p>
      </div>
    </div> -->

    <div class="column-wrap" :class="{ 'blur-content': isMobileDevice }">
      <!-- Left Column - Carousel -->
      <div class="column-left">
        <div class="slider w-slider" role="region" aria-label="carousel">
          <div class="mask w-slider-mask">
            <!-- Slide 1 -->
            <div v-for="(slide, index) in slides" :key="index" class="slide w-slide"
              :class="{ 'active': currentSlide === index }" :aria-label="`${index + 1} of ${slides.length}`"
              role="group">
              <div class="testimonial-card">
                <div class="image-wrapper-2">
                  <img :src="slide.image" :alt="slide.imageAlt" class="testimonial-image" loading="lazy">
                  <img
                    src="https://cdn.prod.website-files.com/68ebc5d5e10cd5746e72bddf/68ebc5d7e10cd5746e72bee2_shape.svg"
                    alt="Decorative shape" class="curve-rough">
                </div>
                <div class="content-block">
                  <div class="text-fixed-height">
                    <h4 class="quote-h4">{{ slide.quote }}</h4>
                  </div>
                  <div class="author-block" @click="goToDashboard" style="cursor: pointer;">
                    <img :src="slide.avatar" :alt="`${slide.author} photo`" class="author-image-2">
                    <div class="author-detail-wrap">
                      <h4 class="author-name-2">{{ slide.author }}</h4>
                      <div class="author-job">{{ slide.position }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Arrows -->
          <button class="left-arrow w-slider-arrow-left" type="button" aria-label="previous slide"
            @click="previousSlide">
            <div class="w-icon-slider-left"></div>
          </button>
          <button class="right-arrow w-slider-arrow-right" type="button" aria-label="next slide" @click="nextSlide">
            <div class="w-icon-slider-right"></div>
          </button>

          <!-- Slide Indicators -->
          <div class="slide-nav w-slider-nav w-slider-nav-invert w-round">
            <button v-for="(slide, index) in slides" :key="`indicator-${index}`" class="w-slider-dot"
              :class="{ 'w-active': currentSlide === index }"
              :aria-label="`Show slide ${index + 1} of ${slides.length}`" :aria-pressed="currentSlide === index"
              type="button" @click="goToSlide(index)"></button>
          </div>
        </div>
      </div>

      <!-- Right Column - Login Form -->
      <div class="column-right">
        <div class="w-layout-blockcontainer container-default width-100 z-index-1 w-container">
          <!-- Labels -->
          <!-- <div class="w-layout-hflex about-flex-block">
            <div v-for="label in labels" :key="label" class="about-section-label">
              <img loading="lazy" height="16" alt="Icon"
                src="https://cdn.prod.website-files.com/681cb7286bd6eba158e8c6a6/6884edc656053e23bd011c14_butt-icon.svg"
                class="image-22">
              <div class="text-block-32">{{ label }}</div>
            </div>
          </div> -->
          <br />
          <h2 class="content-h2">
            <span class="text-span-24">Refer</span> colleagues and start earning.. your community is:
          </h2>

          <div class="inner-container _480px center">
            <div class="card-2 create-account-card">
              <div class="form-block w-form">
                <form @submit.prevent="handleGoogleLogin" class="form-2" aria-label="Sign In Form">
                  <!-- Logo and Header -->
                  <div class="center-content">
                    <router-link to="/" class="logo-wrapper v2 w-nav-brand">
                      <img width="Auto" height="100" alt="Platheo Logo" src="/src/assets/images/plogo.svg"
                        loading="eager">
                    </router-link>
                    <div class="mg-top-extra-small">
                      <h1 class="display-7 mid">Welcome</h1>
                      <div class="text-neutral-light">
                        <div class="inner-container _320px center">
                          <p class="paragraph-12"><span class="text-span-23">COMMUNITIES</span><br></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <select id="field" name="field" data-name="Field" class="select-field w-select">
                    <option value="">Select for better support...</option>
                    <option value="First">Handy People (maintain and repair homes)</option>
                    <option value="Second">Second choice</option>
                    <option value="Third">Third choice</option>
                  </select>
                  <!-- Terms Checkbox -->
                  <div class="div-block-33">
                    <label class="w-checkbox checkbox-wrapper">
                      <input v-model="termsAccepted" type="checkbox" name="terms" id="terms-checkbox" required>
                      <span class="checkbox-text neutral w-form-label w-form-label-inner" @click="toggleTerms">
                        I have read and agree to the
                        <a href="#" class="text-link mid" @click.stop.prevent="openTermsModal">Terms &amp; Conditions</a>
                      </span>
                    </label>
                  </div>

                  <!-- Google Login Button -->
                  <div class="w-layout-grid grid-1-column gap-row-small">
                    <button type="submit" class="secondary-button-10 small w-inline-block" :disabled="!termsAccepted">
                      <div class="w-layout-blockcontainer container-12 w-container">
                        <img width="Auto" height="30" alt="Google Icon"
                          src="/src/assets/images/google-icon-dashbrd-x-webflow-template.svg" loading="eager"
                          class="badge-icon">
                        <div class="text-block-77">Continue with Google</div>
                        <div class="text-block-77">CAD 20 Gift</div>
                      </div>
                    </button>
                    <div class="text">
                      Supported by <span class="blue-color">Platheo Service as a Software Inc</span>
                    </div>
                  </div>

                  <!-- Partner Logos -->
                  <!-- <div class="w-layout-grid grid">
                    <img src="/src/assets/images/Ignite.svg" loading="lazy" alt="Ignite" class="image-83">
                    <img src="/src/assets/images/oulton.svg" loading="lazy" alt="Oulton" class="image-84">
                  </div> -->
                </form>

                <!-- Success Message -->
                <div v-if="showSuccess" class="success-message-wrapper w-form-done">
                  <div class="card-2 contact-form-card">
                    <img alt="Success"
                      src="/src/assets/images/success-message-icon-top-dashbrd-webflow-ecommerce-template.png"
                      class="success-message-icon-top">
                    <div class="mg-top-default">
                      <div class="text-titles">
                        <div class="display-7 mid">Welcome back!</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Error Message -->
                <div v-if="showError" class="error-message-wrapper w-form-fail">
                  <div>{{ errorMessage }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loginWithProvider } from '@/firebase/useFirebaseAuth'
import TermsContent from '@/modules/compliance/TermsContent.vue'

const router = useRouter()

// Modal state
const showTermsModal = ref(false)

const openTermsModal = () => {
  showTermsModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeTermsModal = () => {
  showTermsModal.value = false
  document.body.style.overflow = ''
}

const acceptTerms = () => {
  termsAccepted.value = true
  closeTermsModal()
}

// Mobile detection
const isMobileDevice = ref(false)

onMounted(() => {
  // Check if device is mobile
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
  const isSmallScreen = window.innerWidth < 1024

  isMobileDevice.value = isMobile || isSmallScreen
})

// Carousel slides data
// Use import.meta.url + new URL(...) so Vite includes these images in the build output
const slides = [
  {
    image: new URL('../../../assets/images/slide-img-02.jpg', import.meta.url).href,
    imageAlt: 'Testimonial Image',
    quote: 'There are many different ways a business can display customer testimonials — And when determining the best approach...',
    avatar: new URL('../../../assets/images/avatar.png', import.meta.url).href,
    author: 'Sam Kennedy',
    position: 'Marketing Lead, Twitter'
  },
  {
    image: new URL('../../../assets/images/slide-img.jpg', import.meta.url).href,
    imageAlt: 'Customer Testimonial',
    quote: 'To show the value of what you have to offer, why not let your happy customers do the talking? It\'s a simple but powerful tool for establishing trust...',
    avatar: new URL('../../../assets/images/avatar-02.png', import.meta.url).href,
    author: 'Bella Smith',
    position: 'Customer Success Manager, Flowbase'
  }
]

const labels = ['launch fast', 'partner fast', 'sell fast']

// Carousel state
const currentSlide = ref(0)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

// Form state
const termsAccepted = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

// Toggle terms checkbox
const toggleTerms = () => {
  termsAccepted.value = !termsAccepted.value
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const handleGoogleLogin = async () => {
  if (!termsAccepted.value) {
    showError.value = true
    errorMessage.value = 'Please accept the Terms & Conditions'
    return
  }

  try {
    showError.value = false
    showSuccess.value = false

    // Call Firebase authentication with Google provider
    //await loginWithProvider('google')

    showSuccess.value = true

    // Redirect to dashboard after successful login
    /*setTimeout(() => {
      router.push('/dashboard')
    }, 1000)*/
  } catch (error) {
    showError.value = true
    errorMessage.value = 'Oops! Something went wrong while submitting the form.'
    console.error('Login error:', error)
  }
}

// Auto-play carousel
let autoplayInterval: ReturnType<typeof setInterval> | null = null

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextSlide()
  }, 3000)
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
}

// Start autoplay on mount
startAutoplay()

// Cleanup on unmount
onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
/* Mobile Warning Overlay */
.mobile-warning-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.mobile-warning-content {
  text-align: center;
  color: white;
  padding: 40px;
  max-width: 500px;
}

.mobile-warning-content i {
  font-size: 80px;
  margin-bottom: 24px;
  color: #667eea;
}

.mobile-warning-content h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
}

.mobile-warning-content p {
  font-size: 18px;
  line-height: 1.6;
  color: #ccc;
}

.blur-content {
  filter: blur(10px);
  pointer-events: none;
}

/* Responsive Layout - Login primero en móviles */
.column-wrap {
  display: flex;
  flex-direction: column-reverse;
}

@media screen and (min-width: 768px) {
  .column-wrap {
    flex-direction: row;
  }
}

/* Carousel transitions */
.slide {
  transition: opacity 0.5s ease-in-out;
}

.slide:not(.active) {
  display: none;
}

/* Disabled button */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Hidden checkbox */
input[type="checkbox"] {
  opacity: 100;
  position: absolute;
}

.w-form-label-inner {
  margin-left: 10px;
}

.select-field {
  color: #000;
  background-color: #f3f5f8;
  border: 1px dashed #0000000f;
  border-radius: 9px;
  margin-left: auto;
  margin-right: auto;
}

/* Terms Modal Styles */
.terms-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.terms-modal-content {
  background-color: #ffffff;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.terms-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e5e5;
}

.terms-modal-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.terms-modal-close {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 18px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.terms-modal-close:hover {
  background-color: #f0f0f0;
}

.terms-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.terms-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: flex-end;
}

.terms-modal-accept {
  padding: 12px 24px;
  background-color: #1a1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.terms-modal-accept:hover {
  background-color: #333;
}
</style>
