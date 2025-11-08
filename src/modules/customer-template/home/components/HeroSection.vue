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
              <EditableText page-name="home" component-name="hero"
                :element-id="`home-hero-label-${label.text.replace(/\s+/g, '-')}`" :default-value="label.text" tag="h6"
                class-name="text-white-2" :rows="1" />
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
          <div v-for="(face, index) in heroFaces" :key="face.id" class="hero-face-container">
            <EditableImage :page-name="'home'" :component-name="'hero'" :element-id="`hero-face-${index + 1}`"
              :default-value="face.src" :alt="face.alt" :img-class="'hero-face-image'" />
          </div>
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
  { text: '| partner fast', imgClass: 'image-10' },
  { text: '| sell fast', imgClass: 'image-10' }
]

// Hero faces data - 4 team photos with rounded borders
const heroFaces = [
  {
    id: 'hero-face-photo-1',
    src: new URL('../../../../assets/images/team_guillermo.jpg', import.meta.url).href,
    alt: 'Team member Guillermo',
    imgClass: 'hero-face-image'
  },
  {
    id: 'hero-face-photo-2',
    src: new URL('../../../../assets/images/team_katty.jpg', import.meta.url).href,
    alt: 'Team member Katty',
    imgClass: 'hero-face-image'
  },
  {
    id: 'hero-face-photo-3',
    src: new URL('../../../../assets/images/team_ronald.jpg', import.meta.url).href,
    alt: 'Team member Ronald',
    imgClass: 'hero-face-image'
  },
  {
    id: 'hero-face-photo-4',
    src: new URL('../../../../assets/images/team_jacques.jpg', import.meta.url).href,
    alt: 'Team member Jacques',
    imgClass: 'hero-face-image'
  }
]
</script>

<style scoped>
.hero-faces {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 100%;
  margin-top: -6rem;
}

/* Contenedor aislado para cada imagen - permite botón de edición en esquina */
.hero-face-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
  border: 3px solid #e0e0e0;
  background-color: #f5f5f5;
}

/* Estilos para el wrapper de EditableImage */
.hero-face-container :deep(> div) {
  width: 100%;
  height: 100%;
}

/* Estilos para la imagen */
.hero-face-container :deep(.hero-face-image),
.hero-face-container :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

@media (max-width: 768px) {
  .hero-faces {
    gap: 0.5rem;
  }

  .hero-face-container {
    border-radius: 12px;
    border-width: 2px;
  }
}

@media (max-width: 479px) {
  .hero-faces {
    gap: 0.375rem;
  }

  .hero-face-container {
    border-radius: 10px;
  }
}
</style>
