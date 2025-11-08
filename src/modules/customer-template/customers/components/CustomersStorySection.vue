<template>
  <div v-for="story in stories" :key="story.id" :id="story.containerId || undefined" :class="story.rootClass">
    <div :class="story.baseContainerClass">
      <div :class="story.innerBannerClass">
        <div :class="story.wrapClass">
          <div class="div-block-28">
            <div :class="story.categoryContainerClass">
              <div fs-cmsfilter-field="category" :class="story.categoryButtonClass">
                <EditableText page-name="customers" :component-name="story.componentName" element-id="category-tag"
                  :default-value="story.defaultCategory" tag="span" :rows="1" />
              </div>
            </div>
            <h1 :class="story.headingClass">
              <EditableText page-name="customers" :component-name="story.componentName" element-id="title"
                :default-value="story.defaultTitle" tag="span" :rows="2" />
            </h1>
            <p :class="story.paragraphClass">
              <EditableText page-name="customers" :component-name="story.componentName" element-id="description"
                :default-value="story.defaultDescription" tag="span" :rows="4" />
            </p>
          </div>
        </div>
        <div :class="story.videoLinkClass" :target="story.videoLink !== '#' ? '_blank' : undefined"
          :rel="story.videoLink !== '#' ? 'noopener noreferrer' : undefined">
          <div :class="story.videoWrapperClass">
            <EditableVideo page-name="customers" :component-name="story.componentName" element-id="video"
              :default-value="story.defaultVideo" width="100%" height="315" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableVideo from '@/components/EditableVideo.vue'

interface StoryConfig {
  id: string
  componentName: string
  containerId?: string
  rootClass?: string
  baseContainerClass: string
  innerBannerClass: string
  wrapClass: string
  categoryContainerClass: string
  categoryButtonClass: string
  headingClass: string
  paragraphClass: string
  videoLinkClass: string
  videoWrapperClass: string
  videoLink: string
  defaultCategory: string
  defaultTitle: string
  defaultDescription: string
  defaultVideo: string
}

const stories: StoryConfig[] = [
  {
    id: 'story-1',
    componentName: 'story-1',
    containerId: 'Post-Hero',
    rootClass: 'case-study',
    baseContainerClass: 'w-layout-blockcontainer case-base-container w-container',
    innerBannerClass: 'post-inner-banner',
    wrapClass: 'post-inner-banner-wrap blog-2',
    categoryContainerClass: 'w-layout-blockcontainer category-case w-container',
    categoryButtonClass: 'button-s is-small is-xsmall is-new-category-tag',
    headingClass: 'heading-33',
    paragraphClass: 'inner-banner-paragraph blog-2',
    videoLinkClass: 'post-services-banner-video w-inline-block w-lightbox',
    videoWrapperClass: '',
    videoLink: '#',
    defaultCategory: 'Corporate site',
    defaultTitle: 'I launched the web in one day, it was that easy!',
    defaultDescription:
      "From the first moment I used Platheo, I knew it was different. The interface is so intuitive that within 5 minutes I was already doing tasks that previously took me hours. That feeling of 'wow, this works!' is priceless. - Javier López, UX Designer",
    defaultVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'story-2',
    componentName: 'story-2',
    rootClass: 'case-study',
    baseContainerClass: 'w-layout-blockcontainer case-base-container-left w-container',
    innerBannerClass: 'post-inner-banner-left',
    wrapClass: 'post-inner-banner-right blog-2',
    categoryContainerClass: 'w-layout-blockcontainer category-case w-container',
    categoryButtonClass: 'button-s is-small is-xsmall is-new-category-tag',
    headingClass: 'heading-33',
    paragraphClass: 'inner-banner-paragraph blog-2',
    videoLinkClass: 'case-banner-video-left w-inline-block w-lightbox',
    videoWrapperClass: '',
    videoLink: '#',
    defaultCategory: 'Corporate site',
    defaultTitle: 'First Interaction with Customer Service',
    defaultDescription:
      '"My first meeting with the team made it clear they were genuinely interested in understanding my needs. Instead of trying to sell me, they listened and asked intelligent questions. That personalized attention from the very first minute immediately won me over." - Laura Mendoza, Small Business Owner',
    defaultVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'story-3',
    componentName: 'story-3',
    rootClass: 'case-study',
    baseContainerClass: 'w-layout-blockcontainer case-base-container w-container',
    innerBannerClass: 'post-inner-banner',
    wrapClass: 'post-inner-banner-wrap blog-2',
    categoryContainerClass: 'w-layout-blockcontainer category-case w-container',
    categoryButtonClass: 'button-s is-small is-xsmall is-new-category-tag',
    headingClass: 'heading-33',
    paragraphClass: 'inner-banner-paragraph blog-2',
    videoLinkClass: 'post-services-banner-video w-inline-block w-lightbox',
    videoWrapperClass: '',
    videoLink: '#',
    defaultCategory: 'Corporate site',
    defaultTitle: 'Great design, very professional.',
    defaultDescription:
      '"When I visited your website, everything radiated professionalism and trust. The clear messages, clean design, and ease of finding what I was looking for made me feel like I was in the right place. That first impression was decisive in my decision to contact you." - Roberto Silva, Potential Client',
    defaultVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
]
</script>

<style scoped></style>
