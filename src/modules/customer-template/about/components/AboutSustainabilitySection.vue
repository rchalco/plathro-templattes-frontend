<template>
  <section class="about-section">
    <div class="w-layout-blockcontainer base-container-15 w-container">
      <div data-w-id="73f204e9-a47d-4abd-6a49-101923d041fa" style="opacity:0" class="gray-card">
        <div class="gray-card-text-wrapper">
          <div data-w-id="73f204e9-a47d-4abd-6a49-101923d041fc" style="opacity:0" class="large-text">
            <EditableText 
              page-name="about" 
              component-name="sustainability" 
              element-id="main-title"
              default-value="Sustainability at our core." 
              tag="span"
              :rows="1" 
            />
          </div>
          <p data-w-id="73f204e9-a47d-4abd-6a49-101923d041fe" style="opacity:0">
            <EditableText 
              page-name="about" 
              component-name="sustainability" 
              element-id="main-description"
              default-value="We're committed to development that respects sustainable software development, improve performance and quality, and supports future generations." 
              tag="span"
              :rows="2" 
            />
          </p>
          <div class="solutions-list">
            <div v-for="(solution, index) in solutions" :key="index" data-w-id="73f204e9-a47d-4abd-6a49-101923d04201" style="opacity:0" class="solution-list-item">
              <h5 class="without-space">
                <strong class="bold-text-3">
                  <EditableText 
                    page-name="about" 
                    component-name="sustainability" 
                    :element-id="`solution-title-${index}`"
                    :default-value="solution.title" 
                    tag="span"
                    :rows="1" 
                  />
                </strong>
              </h5>
              <p class="small-paragraph">
                <EditableText 
                  page-name="about" 
                  component-name="sustainability" 
                  :element-id="`solution-description-${index}`"
                  :default-value="solution.description" 
                  tag="span"
                  :rows="2" 
                />
              </p>
            </div>
          </div>
        </div>
        <EditableImage 
          :page-name="'about'" 
          :component-name="'sustainability'" 
          :element-id="'main-image'"
          :default-value="sustainabilityImage" 
          :alt="'Sustainability'" 
          :img-class="'home-1-gray-card-image'" 
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'

const solutions = [
  {
    title: 'Energy-efficient coding practices:',
    description: 'Optimizing algorithms, choosing energy-efficient programming languages, and reducing network traffic are crucial for minimizing power consumption.'
  },
  {
    title: 'Measuring and tracking environmental impact:',
    description: 'Monitoring energy consumption, carbon emissions, and resource utilization allows for identifying areas for improvement and ensuring progress towards sustainability goals.'
  }
]

const sustainabilityImage = new URL('../../../../assets/images/sustain-p-500.jpg', import.meta.url).href
</script>

<style scoped>
</style>
