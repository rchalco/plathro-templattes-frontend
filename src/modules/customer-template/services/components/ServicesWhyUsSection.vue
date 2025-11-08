<script setup lang="ts">
import { ref } from 'vue'
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'
import iconUrl from '@/assets/images/butt-icon.svg?url'

interface Card {
  id: string
  image: string
  title: string
  description: string
  cardClass: string
}

const cards = ref<Card[]>([
  {
    id: 'card1',
    image: 'https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68da8ff9cf83b67e61ec0cdf_sustainability.jpg',
    title: 'Sustainable Practices',
    description: 'From managed-free solutions to complex deployments, we are committed to privacy and efficiency for the future generations.',
    cardClass: 'black-card'
  },
  {
    id: 'card2',
    image: 'https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68da8ff9cf83b67e61ec0ce1_coding.jpg',
    title: 'Team Expertise',
    description: 'Years of international experience delivering scalable software solutions across diverse sectors and regions.',
    cardClass: 'light-gray-card'
  },
  {
    id: 'card3',
    image: 'https://cdn.prod.website-files.com/68da7df8090cb5cda1162387/68da8ff9cf83b67e61ec0ce3_people.jpg',
    title: 'Trusted by Thousands',
    description: 'Sellers and partners; our stakeholders worldwide rely on us for quality, reliability, and long-term success.',
    cardClass: 'primary-card'
  }
])

const updateCardImage = (index: number, value: string) => {
  cards.value[index].image = value
}

const updateCardTitle = (index: number, value: string) => {
  cards.value[index].title = value
}

const updateCardDescription = (index: number, value: string) => {
  cards.value[index].description = value
}
</script>

<template>
  <section class="why-us-section without-top-spacing">
    <div class="w-layout-blockcontainer base-container-20 w-container">
      <div class="center-title-wrapper">
        <div class="section-label-2">
          <EditableText page-name="services" component-name="why-us" element-id="label" class-name="text-block-106"
            default-value="Why choose us" tag="div" />
        </div>
        <EditableText page-name="services" component-name="why-us" element-id="heading" class-name="heading-7"
          default-value="We are more than just a service — we are your trusted partner in sustainable software development."
          tag="h2" />
      </div>

      <div class="home-1-cards-wrapper">
        <div v-for="(card, index) in cards" :key="card.id" :class="['why-us-card', card.cardClass]">
          <EditableImage page-name="services" component-name="why-us" :element-id="`card-${index}-image`"
            :default-value="card.image" alt="Card image" img-class="card-image" />
          <div class="card-content">
            <EditableText page-name="services" component-name="why-us" :element-id="`card-${index}-title`"
              class-name="card-title" :default-value="card.title" tag="h5" />
            <EditableText page-name="services" component-name="why-us" :element-id="`card-${index}-description`"
              class-name="card-description" :default-value="card.description" tag="p" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-us-section {
  padding: 5rem 0;
  background-color: #fff;
}

.without-top-spacing {
  padding-top: 2rem;
}

.base-container-20 {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header section */
.center-title-wrapper {
  text-align: center;
  margin-bottom: 3.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.section-label-2 {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  border-radius: 50px;
  margin-bottom: 1.5rem;
}

.image-97 {
  width: auto;
  height: 16px;
}

.text-block-106 {
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.heading-7 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1a1a1a;
  margin: 0;
}

/* Cards grid - ancho ajustado */
.home-1-cards-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 3rem;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.why-us-card {
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

.why-us-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
}

.card-content {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  line-height: 1.3;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.card-description {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 0.5rem 0;
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  overflow: visible;
}

/* Card variants */
.black-card {
  background-color: #1a1a1a;
  width: 300px;
  translate: 60px;
}

.black-card .card-title,
.black-card .card-description {
  color: #ffffff;
}

.light-gray-card {
  background-color: #f8f9fa;
}

.light-gray-card .card-title,
.light-gray-card .card-description {
  color: #1a1a1a;
}

.primary-card {
  background-color: #035925;
  width: 300px;
  translate: -50px;
}

.primary-card .card-title,
.primary-card .card-description {
  color: #ffffff;
}

/* Tablet */
@media (max-width: 991px) {
  .heading-7 {
    font-size: 2rem;
  }

  .home-1-cards-wrapper {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .card-image {
    height: 200px;
  }

  .card-content {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .card-description {
    font-size: 0.95rem;
  }

  .primary-card {
    translate: 0px;
    width: 100%;
  }

  .black-card {
    translate: 0px;
    width: 100%;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .why-us-section {
    padding: 2.5rem 0;
  }

  .without-top-spacing {
    padding-top: 1rem;
  }

  .base-container-20 {
    padding: 0 1rem;
  }

  .center-title-wrapper {
    margin-bottom: 2rem;
  }

  .heading-7 {
    font-size: 1.75rem;
  }

  .home-1-cards-wrapper {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .why-us-card {
    min-height: auto;
  }

  .card-image {
    height: 220px;
  }

  .card-content {
    padding: 1rem;
    padding-bottom: 1rem;
  }

  .card-title {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  .card-description {
    font-size: 0.875rem;
    line-height: 1.4;
    margin-bottom: 0;
  }

  .section-label-2 {
    padding: 0.4rem 0.85rem;
  }

  .text-block-106 {
    font-size: 0.8rem;
  }
}

/* Small mobile */
@media (max-width: 479px) {
  .why-us-section {
    padding: 2rem 0;
  }

  .without-top-spacing {
    padding-top: 0.75rem;
  }

  .center-title-wrapper {
    margin-bottom: 1.5rem;
  }

  .heading-7 {
    font-size: 1.5rem;
  }

  .home-1-cards-wrapper {
    gap: 0.875rem;
    margin-top: 1.25rem;
  }

  .card-image {
    height: 200px;
  }

  .card-content {
    padding: 0.875rem;
    padding-bottom: 0.875rem;
  }

  .card-title {
    font-size: 1rem;
    margin-bottom: 0.4rem;
  }

  .card-description {
    font-size: 0.85rem;
    line-height: 1.35;
  }
}
</style>
