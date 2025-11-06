<template>
  <div class="contact-hero-section">
    <div class="w-layout-blockcontainer base-hero-section w-container">
      <div class="inner-banner">
        <div class="inner-banner-text-wrap blog-2">
          <div>
            <h1 data-w-id="cab6ebe4-ebba-30a8-7ef1-79fbc56b1b33" style="opacity:0" class="heading-6">
              <EditableText 
                page-name="contact" 
                component-name="hero" 
                element-id="main-heading"
                default-value="We look forward to hearing from you." 
                tag="span"
                :rows="1" 
              />
            </h1>
            <p data-w-id="cab6ebe4-ebba-30a8-7ef1-79fbc56b1b35" style="opacity:0" class="inner-banner-paragraph blog-2">
              <EditableText 
                page-name="contact" 
                component-name="hero" 
                element-id="description"
                default-value="Feel free to have a look our program and the modules we have and / or drop us an email, we will reply you back as soon as possible. If you are already a client or partner please login into the platform." 
                tag="span"
                :rows="3" 
              />
            </p>
          </div>
        </div>
        <div class="inner-labels-wrapper blog-2">
          <div v-for="label in labels" :key="label.text" data-w-id="cab6ebe4-ebba-30a8-7ef1-79fbc56b1b38" style="opacity:0" class="video-label inner-page">
            <img loading="lazy" height="16" alt="" :src="label.icon" :class="label.imgClass">
            <div :class="label.textClass">{{ label.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'

const labels = [
  { text: 'launch fast', icon: new URL('../../../../assets/images/ligera.svg', import.meta.url).href, imgClass: 'image-12', textClass: 'text-block-13' },
  { text: 'partner fast', icon: new URL('../../../../assets/images/ligera.svg', import.meta.url).href, imgClass: 'image-13', textClass: 'text-block-14' },
  { text: 'sell fast', icon: new URL('../../../../assets/images/ligera.svg', import.meta.url).href, imgClass: 'image-14', textClass: 'text-block-15' }
]
</script>

<style scoped>
</style>
