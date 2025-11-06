<template>
  <div class="container">
    <div class="column-wrap">
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
                  <div class="author-block">
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
          <div class="w-layout-hflex about-flex-block">
            <div v-for="label in labels" :key="label" class="about-section-label">
              <img loading="lazy" height="16" alt="Icon"
                src="https://cdn.prod.website-files.com/681cb7286bd6eba158e8c6a6/6884edc656053e23bd011c14_butt-icon.svg"
                class="image-22">
              <div class="text-block-32">{{ label }}</div>
            </div>
          </div>
          <br />
          <h2 class="content-h2">
            <span class="text-span-24">Happy</span> Entrepreneurs in Moncton and Fredericton, NB
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
                      <div class="text-neutral-light">
                        <div class="inner-container _320px center">
                          <p class="paragraph-12">
                            <span class="text-span-23">FREE WEBSITE</span><br>
                            <span class="text-span-22">NB Business mentored by:</span><br>
                            Ignite Incubator BIE Program and<br>
                            Oulton College Business Program
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Terms Checkbox -->
                  <div class="div-block-33">
                    <label class="w-checkbox checkbox-wrapper">
                      <input v-model="termsAccepted" type="checkbox" name="terms" id="terms-checkbox" required>
                      <span class="checkbox-text neutral w-form-label w-form-label-inner" @click="toggleTerms">
                        I have read and agree to the
                        <router-link to="/terms" class="text-link mid" @click.stop>Terms &amp; Conditions</router-link>
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
                        <div class="text-block-77">CAD 200 Gift</div>
                      </div>
                    </button>
                    <div class="text">
                      Supported by <span class="blue-color">Platheo Service as a Software Inc</span>
                    </div>
                  </div>

                  <!-- Partner Logos -->
                  <div class="w-layout-grid grid">
                    <img src="/src/assets/images/Ignite.svg" loading="lazy" alt="Ignite" class="image-83">
                    <img src="/src/assets/images/oulton.svg" loading="lazy" alt="Oulton" class="image-84">
                  </div>
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
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

const handleGoogleLogin = async () => {
  if (!termsAccepted.value) {
    showError.value = true
    errorMessage.value = 'Please accept the Terms & Conditions'
    return
  }

  try {
    // Aquí iría la lógica de autenticación con Google
    console.log('Google login initiated')

    // Redirigir al home
    router.push('/')
  } catch (error) {
    showError.value = true
    errorMessage.value = 'Oops! Something went wrong while submitting the form.'
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
</style>
