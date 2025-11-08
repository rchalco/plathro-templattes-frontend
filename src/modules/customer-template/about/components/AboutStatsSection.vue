<template>
  <section id="About-Us-Section" class="section-2 gray-bg">
    <div class="w-layout-blockcontainer base-container-14 w-container">
      <div class="home-2-numbers-grid">
        <div v-for="(stat, index) in stats" :key="index" class="home-2-number-cell">
          <div class="number-cell home-2">
            <div class="large-text numbers">
              <EditableText 
                page-name="about" 
                component-name="stats" 
                :element-id="`stat-number-${index}`"
                :default-value="stat.number" 
                tag="span"
                :rows="1" 
              />
            </div>
            <h5>
              <EditableText 
                page-name="about" 
                component-name="stats" 
                :element-id="`stat-title-${index}`"
                :default-value="stat.title" 
                tag="span"
                :rows="1" 
              />
            </h5>
            <div class="number-text-wrapper">
              <p>
                <EditableText 
                  page-name="about" 
                  component-name="stats" 
                  :element-id="`stat-description-${index}`"
                  :default-value="stat.description" 
                  tag="span"
                  :rows="2" 
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'

const stats = [
  {
    number: '99%',
    title: 'On-time delivery rate',
    description: 'Efficient distribution across regions, supporting businesses with reliability and precision.'
  },
  {
    number: '15',
    title: 'Countries reached',
    description: 'Our software solutions are trusted by partners and farmers in more than 15 countries worldwide.'
  },
  {
    number: '100+',
    title: 'Clients has launched with us',
    description: 'We promote a free business quick start worldwide for self-employed business who sell services.'
  }
]
</script>

<style scoped>
</style>
