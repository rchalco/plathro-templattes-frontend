<template>
  <div :class="['values-tab-pane', 'w-tab-pane', { 'w--tab-active': isActive }]" role="tabpanel">
    <div class="values-tab-grid">
      <div class="values-text-wrapper">
        <div class="values-text">
          <div class="values-heading-wrap animated-element">
            <h4 class="heading-12">
              <EditableText :page-name="pageName" :component-name="componentName" :element-id="`${tabId}-title`"
                :default-value="title" tag="span" :rows="2" />
            </h4>
            <p class="paragraph-7">
              <EditableText :page-name="pageName" :component-name="componentName" :element-id="`${tabId}-description`"
                :default-value="description" tag="span" :rows="4" />
            </p>
            <div class="div-block-37">
              <div class="publisher-post-wrapper">
                <div class="w-layout-blockcontainer categories w-container">
                  <div class="button-s is-small is-xsmall is-new-category-tag">Platheo</div>
                </div>
                <div class="publisher-image-wrapper">
                  <EditableImage :page-name="pageName" :component-name="componentName"
                    :element-id="`${tabId}-author-image`" :default-value="authorImage" alt="Author"
                    img-class="author-image" />
                </div>
                <div class="testimony-client-details-1-14">
                  <div class="w-layout-blockcontainer container-8 w-container">
                    <div class="author-name">
                      <EditableText :page-name="pageName" :component-name="componentName"
                        :element-id="`${tabId}-author-name`" default-value="Ronald Caceres" tag="span" :rows="1" />
                    </div>
                    <div class="text-block-99">|</div>
                    <div class="author-country">
                      <EditableText :page-name="pageName" :component-name="componentName"
                        :element-id="`${tabId}-author-role`" default-value="CTO Canada" tag="span" :rows="1" />
                    </div>
                  </div>
                  <div class="w-layout-blockcontainer container-8 w-container">
                    <div class="text-block-104">Monthly</div>
                    <div class="text-block-109">CAD 17/mo</div>
                  </div>
                  <div class="w-layout-blockcontainer container-8 w-container">
                    <div class="text-block-104">Yearly</div>
                    <div class="text-block-110">CAD 200/yr</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="post-button-wrapper">
              <a href="/contact" class="secondary-button w-inline-block">
                <div class="clip">
                  <div class="button-text-wrap-14">
                    <img loading="lazy" height="25" alt="" :src="iconPlatheo" class="image-94">
                    <div class="text-block-103">Book a meeting</div>
                  </div>
                  <div class="button-text-wrap-14 bottom-wrap">
                    <img loading="lazy" height="25" alt="" :src="iconPlatheo" class="image-93">
                    <div class="text-block-100">Book a meeting</div>
                  </div>
                </div>
              </a>
              <a href="/login" class="secondary-button w-inline-block">
                <div class="clip">
                  <div class="button-text-wrap-13">
                    <img loading="lazy" height="25" alt="" :src="iconCart" class="image-95">
                    <div class="text-block-101">Coupon CAD - 200.00</div>
                  </div>
                  <div class="button-text-wrap-13 bottom-wrap">
                    <img loading="lazy" height="25" alt="" :src="iconCart" class="image-95">
                    <div class="text-block-105">Coupon CAD - 200.00</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="values-images-grid animated-element">
        <EditableImage :page-name="pageName" :component-name="componentName" :element-id="`${tabId}-image-1`"
          :default-value="image1" alt="Value image 1" img-class="values-img" />
        <EditableImage :page-name="pageName" :component-name="componentName" :element-id="`${tabId}-image-2`"
          :default-value="image2" alt="Value image 2" img-class="values-img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'
import iconPlatheo from '@/assets/images/icon-platheo.svg?url'
import iconCart from '@/assets/images/cart.svg?url'

interface Props {
  isActive: boolean
  tabId: string
  title: string
  description: string
  image1: string
  image2: string
  authorImage: string
  pageName?: string
  componentName?: string
}

withDefaults(defineProps<Props>(), {
  pageName: 'services',
  componentName: 'about-us-section'
})
</script>

<style scoped>
.animated-element {
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

/* Grid de imágenes - cada imagen ocupa 50% */
.values-images-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
}

/* Asegurar que las imágenes ocupen todo el espacio disponible */
.values-images-grid :deep(.values-img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Tab grid layout */
.values-tab-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

/* Content wrapper */
.values-text-wrapper {
  width: 100%;
}

.values-heading-wrap {
  margin-bottom: 2rem;
}

/* Títulos responsive */
.heading-12 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  line-height: 1.3;
  margin-bottom: 1rem;
}

.paragraph-7 {
  font-size: clamp(0.95rem, 2vw, 1.125rem);
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* Author section */
.publisher-post-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.publisher-image-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}

.publisher-image-wrapper :deep(.author-image) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimony-client-details-1-14 {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.container-8 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Buttons */
.post-button-wrapper {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.secondary-button {
  flex: 1 1 200px;
  min-width: 200px;
}

/* Tablet */
@media (max-width: 991px) {
  .values-tab-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .values-images-grid {
    order: -1;
    margin-bottom: 1.5rem;
  }

  .heading-12 {
    font-size: 1.75rem;
  }

  .paragraph-7 {
    font-size: 1rem;
  }

  .post-button-wrapper {
    gap: 0.75rem;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .values-tab-grid {
    gap: 1.5rem;
  }

  /* Imágenes más compactas en mobile */
  .values-images-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .values-images-grid :deep(> div) {
    height: 140px;
  }

  .values-images-grid :deep(.values-img),
  .values-images-grid :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }

  .values-heading-wrap {
    margin-bottom: 1.5rem;
  }

  .heading-12 {
    font-size: 1.5rem;
    margin-bottom: 0.875rem;
  }

  .paragraph-7 {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .publisher-post-wrapper {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .publisher-image-wrapper {
    width: 50px;
    height: 50px;
  }

  .testimony-client-details-1-14 {
    font-size: 0.875rem;
  }

  .post-button-wrapper {
    flex-direction: column;
    gap: 0.75rem;
  }

  .secondary-button {
    width: 100%;
    min-width: unset;
    flex: 1 1 auto;
  }

  /* Mejorar legibilidad en móvil */
  .author-name,
  .author-country {
    font-size: 0.9rem;
  }

  .text-block-104,
  .text-block-109,
  .text-block-110 {
    font-size: 0.85rem;
  }
}

/* Small mobile */
@media (max-width: 479px) {
  .values-tab-grid {
    gap: 1rem;
  }

  /* Imágenes aún más compactas */
  .values-images-grid {
    gap: 0.375rem;
  }

  .values-images-grid :deep(> div) {
    height: 120px;
  }

  .values-images-grid :deep(.values-img),
  .values-images-grid :deep(img) {
    border-radius: 4px;
  }

  .heading-12 {
    font-size: 1.25rem;
  }

  .paragraph-7 {
    font-size: 0.9rem;
  }

  .publisher-image-wrapper {
    width: 45px;
    height: 45px;
  }

  .container-8 {
    font-size: 0.8rem;
  }

  .post-button-wrapper {
    gap: 0.5rem;
  }

  /* Optimizar botones para pantallas pequeñas */
  .secondary-button :deep(.button-text-wrap-13),
  .secondary-button :deep(.button-text-wrap-14) {
    font-size: 0.875rem;
    padding: 0.5rem;
  }

  .secondary-button :deep(img) {
    height: 20px !important;
  }
}

/* Mejorar accesibilidad touch en mobile */
@media (hover: none) and (pointer: coarse) {
  .secondary-button {
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .values-tab-link {
    min-height: 44px;
  }
}

/* Ocultar tab inactivo con animación */
.values-tab-pane {
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.values-tab-pane.w--tab-active {
  display: block;
  opacity: 1;
}
</style>
