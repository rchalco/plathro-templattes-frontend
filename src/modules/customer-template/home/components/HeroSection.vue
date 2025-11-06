<template>
  <div class="home-hero-section landing-banner">
    <div class="home-hero-container">
      <div class="home-hero-wrapper">
        <div class="site-hero-content">
          <h1 class="heading">
            <EditableText page-name="home" component-name="hero" element-id="home-hero-heading-span-first-part"
              default-value="Pay as you Go" tag="span" class-name="text-span-8" :rows="1" />
            <br>
            <EditableText page-name="home" component-name="hero" element-id="home-hero-heading-span-second-part"
              default-value="Platform for Business Owners who sell Services Supercharged by " tag="span"
              class-name="education" :rows="1" />
            <EditableText page-name="home" component-name="hero" element-id="home-hero-heading-span-thrid-part"
              default-value="Ai." tag="span" class-name="text-span-21" :rows="1" />
            <br>
          </h1>

          <!-- Labels -->
          <div data-w-id="da27a6f2-b5df-84f6-7c9a-1f99aa604de9"
            style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
            class="home-1-banner-labels-wrap">
            <div v-for="label in labels" :key="label.text" class="label">
              <img loading="lazy" height="16" alt="" src="/src/assets/images/ligera.svg" :class="label.imgClass">
              <h6 class="text-white-2">{{ label.text }}</h6>
            </div>
          </div>

          <h6 class="heading-3">
            <EditableText page-name="home" component-name="hero" element-id="home-hero-heading-span-fourth-part"
              default-value="Headquarters in&nbsp;NB, Canada" tag="span" class-name="text-span-3" :rows="1" />
            <br>
          </h6>

          <div class="hero-div-block">
            <router-link to="/about" class="hero-button-1 w-button">About Us</router-link>
            <router-link to="/contact" class="hero-button-2 w-button">Contact Us</router-link>
          </div>
        </div>

        <!-- Hero Faces -->
        <div class="hero-faces">
          <EditableImage :page-name="'home'" :component-name="'hero'" :element-id="heroFaces[0].id"
            :default-value="heroFaces[0].src" :alt="heroFaces[0].alt" :img-class="heroFaces[0].imgClass" />
        </div>

      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'

// Labels data
const labels = [
  { text: 'launch fast', imgClass: 'image-8' },
  { text: 'partner fast', imgClass: 'image-10' },
  { text: 'sell fast', imgClass: 'image-10' }
]

// Hero faces data
const heroFaces = [
  {
    id: 'hero-face-photo-1',
    src: new URL('../../../../assets/images/team_guillermo.jpg', import.meta.url).href,
    sizes: '(max-width: 800px) 100vw, 800px',
    alt: 'Team member Daniel',
    imgClass: 'face-main-hero'
  }/*,
  {
    src: '/src/assets/images/team_katty.jpg',
    srcset: '/src/assets/images/team_katty-p-500.jpg 500w, /src/assets/images/team_katty.jpg 800w',
    sizes: '(max-width: 800px) 100vw, 800px',
    alt: 'Team member Katty',
    class: 'avatar_6'
  },
  {
    src: '/src/assets/images/team_ronald.jpg',
    srcset: '/src/assets/images/team_ronald-p-500.jpg 500w, /src/assets/images/team_ronald.jpg 800w',
    sizes: '(max-width: 800px) 100vw, 800px',
    alt: 'Team member Ronald',
    class: 'avatar_5'
  },
  {
    src: '/src/assets/images/photo_george.jpg',
    srcset: '',
    sizes: '',
    alt: 'Team member George',
    class: 'avatar_4'
  },
  {
    src: '/src/assets/images/team_jacques.jpg',
    srcset: '/src/assets/images/team_jacques-p-500.jpg 500w, /src/assets/images/team_jacques.jpg 800w',
    sizes: '(max-width: 800px) 100vw, 800px',
    alt: 'Team member Jacques',
    class: 'avatar_3 hide-mobile-portrait'
  },
  {
    src: '/src/assets/images/team_guillermo.jpg',
    srcset: '/src/assets/images/team_guillermo-p-500.jpg 500w, /src/assets/images/team_guillermo.jpg 800w',
    sizes: '(max-width: 800px) 100vw, 800px',
    alt: 'Team member Guillermo',
    class: 'avatar_2'
  }*/
]
</script>

<style scoped></style>
