<template>
  <div id="Post-Hero" class="about-hero-section">
    <div class="w-layout-blockcontainer about-base-container w-container">
      <div class="about-inner-banner">
        <div class="about-inner-banner-wrap blog-2">
          <div class="w-layout-hflex about-flex-block">
            <div v-for="label in labels" :key="label.text" data-w-id="f78d4981-ca12-7772-aafb-88646e7444fe" style="opacity:0" class="about-section-label">
              <img loading="lazy" height="16" alt="" :src="label.icon" class="image-22">
              <div class="text-block-32">{{ label.text }}</div>
            </div>
          </div>
          <div class="div-block-11">
            <h1 data-w-id="f78d4981-ca12-7772-aafb-88646e74450b" style="opacity:0" class="heading-16">
              <EditableText 
                page-name="about" 
                component-name="hero" 
                element-id="main-heading"
                default-value="Elevating Corporate Management Standards" 
                tag="span"
                :rows="2" 
              />
            </h1>
            <p data-w-id="f78d4981-ca12-7772-aafb-88646e74450d" style="opacity:0" class="inner-banner-paragraph blog-2">
              <EditableText 
                page-name="about" 
                component-name="hero" 
                element-id="description"
                default-value="We are a company that believes in the power of the community, from the creation of a new solution to a new add-on implementation we work closely with partners, sellers and clients for an amazing end result." 
                tag="span"
                :rows="3" 
              />
            </p>
            <div class="w-layout-blockcontainer categories w-container">
              <div fs-cmsfilter-field="category" class="button-s is-small is-xsmall is-new-category-tag">
                <EditableText 
                  page-name="about" 
                  component-name="hero" 
                  element-id="category-tag"
                  default-value="BE PART OF THE TEAM" 
                  tag="span"
                  :rows="1" 
                />
              </div>
            </div>
          </div>
          <div class="div-block-12">
            <div class="publisher-post-wrapper">
              <div class="publisher-image-wrapper">
                <EditableImage 
                  :page-name="'about'" 
                  :component-name="'hero'" 
                  :element-id="'author-image'"
                  :default-value="authorImage" 
                  :alt="'Author'" 
                  :img-class="'author-image'" 
                />
              </div>
              <div class="testimony-client-details-1-4">
                <div class="author-name">
                  <EditableText 
                    page-name="about" 
                    component-name="hero" 
                    element-id="author-name"
                    default-value="Guillermo Montenegro" 
                    tag="span"
                    :rows="1" 
                  />
                </div>
                <div class="author-expertise">
                  <EditableText 
                    page-name="about" 
                    component-name="hero" 
                    element-id="author-role"
                    default-value="Director & CEO" 
                    tag="span"
                    :rows="1" 
                  />
                </div>
                <div class="author-country">
                  <EditableText 
                    page-name="about" 
                    component-name="hero" 
                    element-id="author-company"
                    default-value="Platheo" 
                    tag="span"
                    :rows="1" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <AboutVideoSection />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'
import AboutVideoSection from './AboutVideoSection.vue'

const labels = [
  { text: 'launch fast', icon: 'https://cdn.prod.website-files.com/681cb7286bd6eba158e8c6a6/6884edc656053e23bd011c14_butt-icon.svg' },
  { text: 'partner fast', icon: 'https://cdn.prod.website-files.com/681cb7286bd6eba158e8c6a6/6884edc656053e23bd011c14_butt-icon.svg' },
  { text: 'sell fast', icon: 'https://cdn.prod.website-files.com/681cb7286bd6eba158e8c6a6/6884edc656053e23bd011c14_butt-icon.svg' }
]

const authorImage = new URL('../../../../assets/images/team_guillermo.jpg', import.meta.url).href
</script>

<style scoped>
</style>
