<template>
  <div id="Post-Hero" class="post-hero-section-2">
    <div class="w-layout-blockcontainer post-base-container w-container">
      <div class="post-inner-banner">
        <div class="services-content-wrapper">
          <div class="post-inner-banner-wrap blog-2">
            <div class="w-layout-hflex about-flex-block">
              <div v-for="label in labels" :key="label.text" data-w-id="89b209c4-d8e0-ac5b-ec21-6ef357b0aa75"
                style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
                class="about-section-label">
                <img loading="lazy" height="16" alt="" :src="label.icon" class="image-22">
                <div class="text-block-32">{{ label.text }}</div>
              </div>
            </div>
            <div class="div-block-6">
              <h1 data-w-id="49c880fa-f17d-da3f-b034-fa57829366bc"
                style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
                class="heading-39">
                <EditableText page-name="services" component-name="hero" element-id="main-heading"
                  default-value="Corporate Site" tag="span" :rows="1" />
              </h1>
              <p data-w-id="49c880fa-f17d-da3f-b034-fa57829366be"
                style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
                class="inner-banner-paragraph blog-2">
                <EditableText page-name="services" component-name="hero" element-id="description"
                  default-value="As a business owner who sell services you face a lot of challenges from the beginning so we want to give you a quick start. You can have a website like this on your own domain. We want to give back to Canadians."
                  tag="span" :rows="3" />
              </p>
            </div>
            <ServicesAuthorInfo />
            <ServicesActionButtons />
          </div>
          <div class="services-video-wrapper">
            <ServicesVideoSection />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import ServicesAuthorInfo from './ServicesAuthorInfo.vue'
import ServicesActionButtons from './ServicesActionButtons.vue'
import ServicesVideoSection from './ServicesVideoSection.vue'

// Importar SVG - Vite procesa esto como módulo
import buttIconSvg from '@/assets/images/butt-icon.svg'

const labels = [
  { text: 'launch fast', icon: buttIconSvg },
  { text: 'partner fast', icon: buttIconSvg },
  { text: 'sell fast', icon: buttIconSvg }
]
</script>

<style scoped>
/* Mobile first - stack vertically */
.services-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.post-inner-banner-wrap {
  width: 100%;
}

.services-video-wrapper {
  width: 100%;
  height: 400px;
}

/* Tablet - start side by side */
@media (min-width: 768px) {
  .services-content-wrapper {
    flex-direction: row;
    align-items: flex-start;
    gap: 32px;
  }

  .post-inner-banner-wrap {
    flex: 1;
    width: auto;
  }

  .services-video-wrapper {
    width: 45%;
    flex-shrink: 0;
  }
}

/* Desktop - 60/40 split */
@media (min-width: 1024px) {
  .services-content-wrapper {
    gap: 40px;
  }

  .post-inner-banner-wrap {
    width: 60%;
    flex: none;
  }

  .services-video-wrapper {
    width: 40%;
  }
}

/* Large desktop - maintain proportions */
@media (min-width: 1440px) {
  .services-content-wrapper {
    gap: 48px;
  }
}

/* Ensure labels wrap properly on small screens */
@media (max-width: 640px) {
  .about-flex-block {
    flex-wrap: wrap;
    gap: 8px;
  }

  .about-section-label {
    flex: 0 0 auto;
  }
}
</style>
