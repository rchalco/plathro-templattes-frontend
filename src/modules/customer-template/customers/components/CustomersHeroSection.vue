<template>
  <div class="blog-post-hero-section">
    <div class="w-layout-blockcontainer base-hero-section w-container">
      <div class="inner-banner">
        <div class="inner-banner-text-wrap blog-2">
          <div>
            <h1 data-w-id="937fb857-1208-1131-f5b4-97909876e4c0" class="heading-32">
              <EditableText page-name="customers" component-name="hero" element-id="main-heading"
                default-value="Customer Success Stories" tag="span" :rows="1" />
            </h1>
            <p data-w-id="937fb857-1208-1131-f5b4-97909876e4c2" class="inner-banner-paragraph blog-2">
              <EditableText page-name="customers" component-name="hero" element-id="description"
                default-value="Discover how customers across industries increase agility, optimize costs, and accelerate innovation using Platheo"
                tag="span" :rows="2" />
            </p>
          </div>
        </div>
        <div class="inner-labels-wrapper blog-2">
          <div v-for="label in labels" :key="label.text" data-w-id="937fb857-1208-1131-f5b4-97909876e4d5"
            class="video-label inner-page">
            <EditableText
              page-name="customers"
              component-name="hero"
              :element-id="`customers-hero-label-${label.text.replace(/\s+/g, '-')}`"
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
  { text: 'launch fast', textClass: 'text-block-78' },
  { text: 'partner fast', textClass: 'text-block-81' },
  { text: 'sell fast', textClass: 'text-block-80' }
]
</script>

<style scoped></style>
