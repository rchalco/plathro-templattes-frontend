<template>
  <div class="post-button-wrapper">
    <a href="/contact" data-w-id="49c880fa-f17d-da3f-b034-fa57829366da" class="secondary-button w-inline-block">
      <div class="clip">
        <div style="-webkit-transform:translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)" class="button-text-wrap-10">
          <img loading="lazy" height="25" alt="" :src="iconPlatheo" class="image-89">
          <div class="text-block-91">
            <EditableText 
              page-name="services" 
              component-name="action-buttons" 
              element-id="button-meeting-text"
              default-value="Book a meeting" 
              tag="span"
              :rows="1" 
            />
          </div>
        </div>
        <div class="button-text-wrap-10 bottom-wrap">
          <img loading="lazy" height="25" alt="" :src="iconPlatheo" class="image-89">
          <div class="text-block-92">
            <EditableText 
              page-name="services" 
              component-name="action-buttons" 
              element-id="button-meeting-text-hover"
              default-value="Book a meeting" 
              tag="span"
              :rows="1" 
            />
          </div>
        </div>
      </div>
    </a>
    <a href="/auth-login" data-w-id="49c880fa-f17d-da3f-b034-fa57829366e4" class="secondary-button w-inline-block">
      <div class="clip">
        <div style="-webkit-transform:translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)" class="button-text-wrap-10">
          <img loading="lazy" height="25" alt="" :src="iconCart" class="image-89">
          <div class="text-block-91">
            <EditableText 
              page-name="services" 
              component-name="action-buttons" 
              element-id="button-coupon-text"
              default-value="Coupon CAD - 200.00" 
              tag="span"
              :rows="1" 
            />
          </div>
        </div>
        <div class="button-text-wrap-10 bottom-wrap">
          <img loading="lazy" height="25" alt="" :src="iconCart" class="image-89">
          <div class="text-block-94">
            <EditableText 
              page-name="services" 
              component-name="action-buttons" 
              element-id="button-coupon-text-hover"
              default-value="Coupon CAD - 200.00" 
              tag="span"
              :rows="1" 
            />
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'

const iconPlatheo = 'https://cdn.prod.website-files.com/681cb7286bd6eba158e8c6a6/6884f00030ade15b8ffc8ac3_icon-platheo.svg'
const iconCart = 'https://cdn.prod.website-files.com/681cb7286bd6eba158e8c6a6/68669026a4393640fb1124a2_cart.svg'
</script>

<style scoped>
</style>
