<template>
  <section class="section-8">
    <div class="w-layout-blockcontainer base-container-16 w-container">
      <div class="center-title-wrapper">
        <h2 class="heading-11 animated-element">
          <EditableText page-name="services" component-name="about-us-section" element-id="section-title"
            default-value="About Us" tag="span" :rows="1" />
        </h2>
      </div>
      <div class="values-tabs w-tabs">
        <div class="values-tabs-menu w-tab-menu animated-element" role="tablist">
          <a v-for="(tab, index) in tabs" :key="tab.id" @click.prevent="activeTab = tab.id"
            :class="['values-tab-link', 'w-inline-block', 'w-tab-link', { 'w--current': activeTab === tab.id }]"
            :href="`#${tab.id}`" role="tab">
            <div>
              <EditableText page-name="services" component-name="about-us-section" :element-id="`${tab.id}-label`"
                :default-value="tab.label" tag="span" :rows="1" />
            </div>
          </a>
        </div>
        <div class="values-tabs-content w-tab-content">
          <AboutUsTabPane v-for="tab in tabs" :key="tab.id" :is-active="activeTab === tab.id" :tab-id="tab.id"
            :title="tab.title" :description="tab.description" :image1="tab.image1" :image2="tab.image2"
            :author-image="authorImage" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EditableText from '@/components/EditableText.vue'
import AboutUsTabPane from './AboutUsTabPane.vue'
import teamRonaldImg from '@/assets/images/team_ronald.jpg?url'
import sustainabilityImg from '@/assets/images/sustainability.jpg?url'
import image1Tab1 from '@/assets/images/67a56104c4496b00659c1d4a287630a9-1_167a56104c4496b00659c1d4a287630a9 (1).webp?url'
import image1Tab2 from '@/assets/images/11247-1_111247 (1).webp?url'
import codingImg from '@/assets/images/coding.jpg?url'
import image1Tab3 from '@/assets/images/2148013591-1_12148013591 (1).webp?url'

const activeTab = ref('tab1')
const authorImage = teamRonaldImg

const tabs = [
  {
    id: 'tab1',
    label: 'Overview',
    title: 'We protect the pocket of the self-employed business owners in Canada.',
    description: 'We are dedicated to help first while meeting the demands of an entrepreneur. Our software practices are designed to provide a quick start for businesses saving time and money to all who wants to contribute to our economy growth.',
    image1: sustainabilityImg,
    image2: image1Tab1
  },
  {
    id: 'tab2',
    label: 'Integrity',
    title: 'We harness innovation to provide this core service for free.',
    description: 'We believe that progress in new technologies starts with bold thinking. Our innovative approach combines modern develop practices with time-tested techniques to increase efficiency, enhance productivity, and reduce costs for our customers.',
    image1: image1Tab2,
    image2: codingImg
  },
  {
    id: 'tab3',
    label: 'Expertise',
    title: 'We lead with integrity — in every partnership, every practice.',
    description: 'Whether working with seller, partners, or communities, we hold ourselves accountable to the highest standards — ensuring every action aligns with our values and long-term vision for sustainable development.',
    image1: image1Tab3,
    image2: image1Tab2
  }
]
</script>

<style scoped>
.animated-element {
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

/* Mejoras para mobile */
.section-8 {
  padding: 3rem 0;
}

.base-container-16 {
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Título responsive */
.center-title-wrapper {
  margin-bottom: 2rem;
}

.heading-11 {
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  text-align: center;
}

/* Tabs menu responsive */
.values-tabs-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.values-tab-link {
  flex: 1 1 auto;
  min-width: 100px;
  text-align: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.values-tab-link:hover {
  transform: translateY(-2px);
}

/* Tablet */
@media (max-width: 991px) {
  .section-8 {
    padding: 2.5rem 0;
  }

  .values-tabs-menu {
    gap: 0.75rem;
  }

  .values-tab-link {
    padding: 0.625rem 0.875rem;
    font-size: 0.9rem;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .section-8 {
    padding: 2rem 0;
  }

  .base-container-16 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .center-title-wrapper {
    margin-bottom: 1.5rem;
  }

  .heading-11 {
    font-size: 1.75rem;
  }

  /* Tabs horizontales como tabs reales en mobile */
  .values-tabs-menu {
    flex-direction: row;
    gap: 0;
    margin-bottom: 0;
    border-bottom: 2px solid #e5e5e5;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .values-tabs-menu::-webkit-scrollbar {
    display: none;
  }

  .values-tab-link {
    flex: 1 1 auto;
    min-width: 110px;
    padding: 0.875rem 0.75rem;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 0;
    border-bottom: 3px solid transparent;
    background-color: transparent;
    color: #666;
    transition: all 0.25s ease;
    white-space: nowrap;
  }

  .values-tab-link.w--current {
    border-bottom-color: #667eea;
    color: #667eea;
    background-color: rgba(102, 126, 234, 0.05);
  }

  .values-tab-link:hover {
    transform: none;
    background-color: rgba(102, 126, 234, 0.03);
  }

  /* Mejorar espaciado del contenido de tabs */
  .values-tabs-content {
    margin-top: 1.25rem;
  }
}

/* Small mobile */
@media (max-width: 479px) {
  .section-8 {
    padding: 1.5rem 0;
  }

  .base-container-16 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .heading-11 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .values-tab-link {
    min-width: 100px;
    padding: 0.75rem 0.625rem;
    font-size: 0.875rem;
  }

  .values-tabs-content {
    margin-top: 1rem;
  }
}

/* Mejorar accesibilidad touch */
@media (hover: none) and (pointer: coarse) {
  .values-tab-link {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
