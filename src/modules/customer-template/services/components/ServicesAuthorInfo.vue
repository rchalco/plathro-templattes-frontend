<template>
  <div class="div-block-7">
    <div class="publisher-post-wrapper">
      <div class="w-layout-blockcontainer categories w-container">
        <div fs-cmsfilter-field="category" class="button-s is-small is-xsmall is-new-category-tag">
          <EditableText 
            page-name="services" 
            component-name="author-info" 
            element-id="category-tag"
            default-value="Platheo" 
            tag="span"
            :rows="1" 
          />
        </div>
      </div>
      <div class="publisher-image-wrapper">
        <EditableImage 
          :page-name="'services'" 
          :component-name="'author-info'" 
          :element-id="'author-image'"
          :default-value="authorImage" 
          :alt="'Author'" 
          :img-class="'author-image'" 
        />
      </div>
      <div class="testimony-client-details-1-14">
        <div class="w-layout-blockcontainer container-8 w-container">
          <div class="author-name">
            <EditableText 
              page-name="services" 
              component-name="author-info" 
              element-id="author-name"
              default-value="Ronald Caceres" 
              tag="span"
              :rows="1" 
            />
          </div>
          <div class="text-block-90">|</div>
          <div class="author-country">
            <EditableText 
              page-name="services" 
              component-name="author-info" 
              element-id="author-title"
              default-value="CTO Canada" 
              tag="span"
              :rows="1" 
            />
          </div>
        </div>
        <div class="w-layout-blockcontainer container-8 w-container">
          <div class="text-block-93">
            <EditableText 
              page-name="services" 
              component-name="author-info" 
              element-id="pricing-monthly-label"
              default-value="Monthly" 
              tag="span"
              :rows="1" 
            />
          </div>
          <div class="text-block-107">
            <EditableText 
              page-name="services" 
              component-name="author-info" 
              element-id="pricing-monthly-value"
              default-value="CAD 17/mo" 
              tag="span"
              :rows="1" 
            />
          </div>
        </div>
        <div class="w-layout-blockcontainer container-8 w-container">
          <div class="text-block-93">
            <EditableText 
              page-name="services" 
              component-name="author-info" 
              element-id="pricing-yearly-label"
              default-value="Yearly" 
              tag="span"
              :rows="1" 
            />
          </div>
          <div class="text-block-108">
            <EditableText 
              page-name="services" 
              component-name="author-info" 
              element-id="pricing-yearly-value"
              default-value="CAD 200/yr" 
              tag="span"
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
import EditableImage from '@/components/EditableImage.vue'

const authorImage = new URL('../../../../assets/images/team_ronald.jpg', import.meta.url).href
</script>

<style scoped>
</style>
