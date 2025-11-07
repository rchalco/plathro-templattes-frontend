<template>
  <section class="team-section">
    <div class="w-layout-blockcontainer base-container-16 w-container">
      <div class="team-founder-block">
        <div id="w-node-f9fec589-d14e-1865-5515-01329e06b60c-3615ffd7" class="founder-text-wrapper">
          <div data-w-id="f9fec589-d14e-1865-5515-01329e06b60d" style="opacity:0" class="founder-quote home-2">
            <!-- <img loading="lazy" :src="quoteIcon" alt="icon" class="quotes-icon"> -->
            <div class="founder-quote-text black">
              <EditableText page-name="team" component-name="founder" element-id="quote-text"
                default-value="We started this journey with a simple belief — that everyone should start for free and pay as they grow. Every step we take, every partnership we build, reflects our commitment to innovation and common good."
                tag="span" :rows="3" />
            </div>
          </div>
          <div class="founder-name-wrapper">
            <div data-w-id="f9fec589-d14e-1865-5515-01329e06b612" style="opacity:0" class="founder-name">
              <div class="large-text team-page">
                <EditableText page-name="team" component-name="founder" element-id="name"
                  default-value="Guillermo Montenegro" tag="span" :rows="1" />
              </div>
              <div class="founder-text gray-text">
                <EditableText page-name="team" component-name="founder" element-id="title"
                  default-value="Director & CEO - Accounting, Payroll & Investor" tag="span" :rows="2" />
              </div>
            </div>
          </div>
        </div>
        <div id="w-node-f9fec589-d14e-1865-5515-01329e06b617-3615ffd7" data-w-id="f9fec589-d14e-1865-5515-01329e06b617"
          style="opacity:0" class="team-founder-image">
          <EditableImage :page-name="'team'" :component-name="'founder'" :element-id="'founder-image'"
            :default-value="founderImage" :alt="'Founder'" :img-class="'team-founder-image'" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'

const quoteIcon = new URL('../../../../assets/images/"-5.svg', import.meta.url).href
const founderImage = new URL('../../../../assets/images/team_guillermo.jpg', import.meta.url).href
</script>

<style scoped></style>
