<template>
  <div id="Post-Hero" class="case-study">
    <div class="w-layout-blockcontainer case-base-container w-container">
      <div class="post-inner-banner">
        <div class="post-inner-banner-wrap blog-2">
          <div class="div-block-28">
            <div class="w-layout-blockcontainer category-case w-container">
              <div fs-cmsfilter-field="category" class="button-s is-small is-xsmall is-new-category-tag">
                <EditableText 
                  page-name="customers" 
                  component-name="story-1" 
                  element-id="category-tag"
                  default-value="Corporate site" 
                  tag="span"
                  :rows="1" 
                />
              </div>
            </div>
            <h1 data-w-id="25a26090-f37f-56f0-48e1-60239cb35d6d" style="opacity:0" class="heading-33">
              <EditableText 
                page-name="customers" 
                component-name="story-1" 
                element-id="title"
                default-value="I launched the web in one day, it was that easy!" 
                tag="span"
                :rows="2" 
              />
            </h1>
            <p data-w-id="25a26090-f37f-56f0-48e1-60239cb35d6f" style="opacity:0" class="inner-banner-paragraph blog-2">
              <EditableText 
                page-name="customers" 
                component-name="story-1" 
                element-id="description"
                default-value="From the first moment I used Platheo, I knew it was different. The interface is so intuitive that within 5 minutes I was already doing tasks that previously took me hours. That feeling of 'wow, this works!' is priceless. - Javier López, UX Designer" 
                tag="span"
                :rows="4" 
              />
            </p>
          </div>
        </div>
        <a href="#" class="post-services-banner-video w-inline-block w-lightbox">
          <div class="play-button-icon-5">PLAY</div>
          <div class="play-button-hover-3"></div>
          <div class="play-button"></div>
          <div class="services-3-background-video w-background-video w-background-video-atom">
            <EditableVideo
              page-name="customers"
              component-name="story-1-video"
              element-id="video"
              default-value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              width="100%"
              height="315"
            />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableVideo from '@/components/EditableVideo.vue'
</script>

<style scoped>
</style>
