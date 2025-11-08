<template>
  <section id="About-Section" class="section-7 gray-without-top-space">
    <div class="w-layout-blockcontainer base-container-19 w-container">
      <div class="home-3-about">
        <div class="home-3-about-text-wrapper">
          <div class="rich-text-style-3 w-richtext">
            <h3 class="heading-41">
              <EditableText page-name="services" component-name="about-section" element-id="main-title"
                default-value="Start free and get in 3 steps your website with us." tag="span" :rows="2" />
            </h3>
            <p>
              <EditableText page-name="services" component-name="about-section" element-id="description-1"
                default-value="We deliver a fast and reliable service for you, taking care of all technological part of it. You click the coupon button and go straight to login into the platform for editing a template like this one you are seeing right now."
                tag="span" :rows="3" />
            </p>
            <p>
              <EditableText page-name="services" component-name="about-section" element-id="description-2"
                default-value="First step: answer the questions; Second step:&nbsp;edit the content and Third step:&nbsp;link your domain."
                tag="span" :rows="2" />
            </p>
            <p>
              <EditableText page-name="services" component-name="about-section" element-id="description-3"
                default-value="That's it ! You have all you need to start networking and closing deals." tag="span"
                :rows="1" />
            </p>
            <blockquote>
              <EditableText page-name="services" component-name="about-section" element-id="quote"
                default-value='"A pre-build website like this is waiting.. you may launch your business today without spending a dime, start selling right away. --Platheo"'
                tag="span" :rows="2" />
            </blockquote>
            <h1>‍</h1>
          </div>
        </div>
        <div data-w-id="02cf9177-62ad-5792-9e99-3d082babb6b0"
          style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
          class="home-3-about-photo">
          <div class="about-photo-text-grid">
            <h5 class="text-white-5">
              <EditableText page-name="services" component-name="about-section" element-id="photo-text"
                default-value="Building community is at the core of our approach to modern software." tag="span"
                :rows="2" />
            </h5>
            <a href="#Post-Hero" data-w-id="02cf9177-62ad-5792-9e99-3d082babb6b4"
              class="plus-button mb10 w-inline-block">
              <img loading="lazy" :src="plusIcon" alt="" class="plus-icon">
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'

// Importar icono local usando ?url
import plusIcon from '@/assets/images/Frame-48.svg?url'
</script>

<style scoped></style>
