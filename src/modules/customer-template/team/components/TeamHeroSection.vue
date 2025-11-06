<template>
  <div class="team-hero-section">
    <div class="w-layout-blockcontainer base-hero-section w-container">
      <div class="inner-banner">
        <div class="inner-banner-text-wrap blog-2">
          <div>
            <h1 data-w-id="6d55edbc-72a1-635a-a3af-4186d4d6ddf2" style="opacity:0" class="heading-31">
              <EditableText 
                page-name="team" 
                component-name="hero" 
                element-id="main-heading"
                default-value="Rooted in purpose. Driven by passion." 
                tag="span"
                :rows="2" 
              />
            </h1>
            <p data-w-id="6d55edbc-72a1-635a-a3af-4186d4d6ddf6" style="opacity:0" class="inner-banner-paragraph blog-2">
              <EditableText 
                page-name="team" 
                component-name="hero" 
                element-id="description"
                default-value="We bring together a diverse team of experts and innovators united in our mission to create a smarter ecosystem and sustainable future in development solutions." 
                tag="span"
                :rows="3" 
              />
            </p>
          </div>
        </div>
        <div class="inner-labels-wrapper blog-2">
          <div v-for="label in labels" :key="label.text" data-w-id="6d55edbc-72a1-635a-a3af-4186d4d6ddf9" style="opacity:0" class="video-label inner-page">
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
  { text: 'launch fast', icon: new URL('../../../../assets/images/ligera.svg', import.meta.url).href, imgClass: 'image-60', textClass: 'text-block-71' },
  { text: 'partner fast', icon: new URL('../../../../assets/images/ligera.svg', import.meta.url).href, imgClass: 'image-61', textClass: 'text-block-74' },
  { text: 'sell fast', icon: new URL('../../../../assets/images/ligera.svg', import.meta.url).href, imgClass: 'image-64', textClass: 'text-block-73' }
]
</script>

<style scoped>
</style>
