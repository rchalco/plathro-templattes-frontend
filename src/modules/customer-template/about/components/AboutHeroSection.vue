<template>
  <div id="Post-Hero" class="about-hero-section">
    <div class="w-layout-blockcontainer about-base-container w-container">
      <div class="about-inner-banner">
        <div class="about-content-wrapper">
          <div class="about-inner-banner-wrap">
            <div class="w-layout-hflex about-flex-block">
              <div v-for="label in labels" :key="label.text" data-w-id="f78d4981-ca12-7772-aafb-88646e7444fe"
                class="about-section-label">
                <div class="text-block-32">{{ label.text }}</div>
              </div>
            </div>
            <div class="div-block-11">
              <h1 data-w-id="f78d4981-ca12-7772-aafb-88646e74450b" class="heading-16">
                <EditableText page-name="about" component-name="hero" element-id="main-heading"
                  default-value="Elevating Corporate Management Standards" tag="span" :rows="2" />
              </h1>
              <p data-w-id="f78d4981-ca12-7772-aafb-88646e74450d" class="inner-banner-paragraph blog-2">
                <EditableText page-name="about" component-name="hero" element-id="description"
                  default-value="We are a company that believes in the power of the community, from the creation of a new solution to a new add-on implementation we work closely with partners, sellers and clients for an amazing end result."
                  tag="span" :rows="3" />
              </p>
              <div class="w-layout-blockcontainer categories w-container">
                <div fs-cmsfilter-field="category" class="button-s is-small is-xsmall is-new-category-tag">
                  <EditableText page-name="about" component-name="hero" element-id="category-tag"
                    default-value="BE PART OF THE TEAM" tag="span" :rows="1" />
                </div>
              </div>
            </div>
            <div class="div-block-12">
              <div class="publisher-post-wrapper">
                <div class="publisher-image-wrapper">
                  <EditableImage :page-name="'about'" :component-name="'hero'" :element-id="'author-image'"
                    :default-value="authorImage" :alt="'Author'" :img-class="'author-image'" />
                </div>
                <div class="testimony-client-details-1-4">
                  <div class="author-name">
                    <EditableText page-name="about" component-name="hero" element-id="author-name"
                      default-value="Guillermo Montenegro" tag="span" :rows="1" />
                  </div>
                  <div class="author-expertise">
                    <EditableText page-name="about" component-name="hero" element-id="author-role"
                      default-value="Director & CEO" tag="span" :rows="1" />
                  </div>
                  <div class="author-country">
                    <EditableText page-name="about" component-name="hero" element-id="author-company"
                      default-value="Platheo" tag="span" :rows="1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="about-video-wrapper">
            <AboutVideoSection />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'
import AboutVideoSection from './AboutVideoSection.vue'
import buttIconSvg from '@/assets/images/butt-icon.svg'

const labels = [
  { text: 'launch fast', icon: buttIconSvg },
  { text: 'partner fast', icon: buttIconSvg },
  { text: 'sell fast', icon: buttIconSvg }
]

const authorImage = new URL('../../../../assets/images/team_guillermo.jpg', import.meta.url).href
</script>

<style scoped>
/* Mobile first - stack vertically */
.about-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.about-inner-banner-wrap {
  width: 100%;
}

.about-video-wrapper {
  width: 100%;
}

/* Tablet - start side by side */
@media (min-width: 768px) {
  .about-content-wrapper {
    flex-direction: row;
    align-items: flex-start;
    gap: 32px;
  }

  .about-inner-banner-wrap {
    flex: 1;
    width: auto;
  }

  .about-video-wrapper {
    width: 45%;
  }
}

/* Desktop - 60/40 split */
@media (min-width: 1024px) {
  .about-content-wrapper {
    gap: 40px;
  }

  .about-inner-banner-wrap {
    width: 60%;
    flex: none;
  }

  .about-video-wrapper {
    width: 40%;
  }
}

/* Large desktop - maintain proportions */
@media (min-width: 1440px) {
  .about-content-wrapper {
    gap: 48px;
  }
}
</style>
