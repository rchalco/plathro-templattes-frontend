<template>
  <div class="contact-hero-section">
    <div class="w-layout-blockcontainer base-hero-section w-container">
      <div class="inner-banner inner-banner-flex">
        <div class="inner-banner-text-wrap blog-2 banner-left">
          <div>
            <h1 data-w-id="cab6ebe4-ebba-30a8-7ef1-79fbc56b1b33" class="heading-6">
              <EditableText page-name="contact" component-name="hero" element-id="main-heading"
                default-value="We look forward to hearing from you." tag="span" :rows="1" />
            </h1>
            <p data-w-id="cab6ebe4-ebba-30a8-7ef1-79fbc56b1b35" class="inner-banner-paragraph blog-2">
              <EditableText page-name="contact" component-name="hero" element-id="description"
                default-value="Feel free to have a look our program and the modules we have and / or drop us an email, we will reply you back as soon as possible. If you are already a client or partner please login into the platform."
                tag="span" :rows="3" />
            </p>
          </div>
        </div>
        <div class="inner-labels-wrapper blog-2">
          <div v-for="label in labels" :key="label.text" data-w-id="cab6ebe4-ebba-30a8-7ef1-79fbc56b1b38"
            class="video-label inner-page">
            <EditableText
              page-name="contact"
              component-name="hero"
              :element-id="`contact-hero-label-${label.text.replace(/\s+/g, '-')}`"
              :default-value="label.text"
              tag="div"
              :class-name="label.textClass"
              :rows="1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'

const labels = [
  { text: 'launch fast', textClass: 'text-block-13' },
  { text: 'partner fast', textClass: 'text-block-14' },
  { text: 'sell fast', textClass: 'text-block-15' }
]
</script>

<style scoped>
/* Layout 70-30: texto izquierda, labels derecha */
.inner-banner-flex {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
}

.banner-left {
  width: 100%;
  text-align: left;
}

/* Asegurar que los labels no se corten */
.video-label {
  white-space: nowrap;
  overflow: visible;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  min-width: max-content;
}

/* Tablet y Desktop: 70-30 layout */
@media screen and (min-width: 768px) {
  .inner-banner-flex {
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
  }

  .banner-left {
    flex: 0 0 65%;
    max-width: 65%;
  }

  .banner-right {
    flex: 0 0 35%;
    max-width: 35%;
    align-items: flex-end;
    min-width: 0;
  }

  /* Los labels en la derecha */
  .video-label {
    width: auto;
    min-width: max-content;
  }
}

/* Desktop grande: mejor separación */
@media screen and (min-width: 1200px) {
  .inner-banner-flex {
    gap: 60px;
  }

  .banner-left {
    flex: 0 0 70%;
    max-width: 70%;
  }

  .banner-right {
    flex: 0 0 30%;
    max-width: 30%;
  }
}
</style>
