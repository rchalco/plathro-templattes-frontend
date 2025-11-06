<template>
  <section class="team-section">
    <div class="w-layout-blockcontainer base-container-16 w-container">
      <div class="w-layout-grid team-grid-large">
        <div v-for="(member, index) in teamMembers" :key="index" :id="`w-node-f9fec589-d14e-1865-5515-01329e06b${619 + index * 7}-3615ffd7`" class="team-card">
          <EditableImage 
            :page-name="'team'" 
            :component-name="'members'" 
            :element-id="`member-image-${index}`"
            :default-value="member.image" 
            :alt="member.name" 
            :img-class="'team-member-photo'" 
          />
          <div class="team-member-info">
            <h4>
              <EditableText 
                page-name="team" 
                component-name="members" 
                :element-id="`member-name-${index}`"
                :default-value="member.name" 
                tag="span"
                :rows="1" 
              />
            </h4>
            <div class="founder-text gray-text">
              <EditableText 
                page-name="team" 
                component-name="members" 
                :element-id="`member-role-${index}`"
                :default-value="member.role" 
                tag="span"
                :rows="2" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'

const teamMembers = [
  {
    name: 'Ronald Caceres',
    role: 'Full Stack Software Engineer - Chief Technological Officer',
    image: new URL('../../../../assets/images/team_ronald.jpg', import.meta.url).href
  },
  {
    name: 'Katty Cordova',
    role: 'Information Security Specialist - Cybersecurity Officer',
    image: new URL('../../../../assets/images/team_katty.jpg', import.meta.url).href
  },
  {
    name: 'Ruben Dario',
    role: 'Backend Software Engineer - Software Architect Officer',
    image: new URL('../../../../assets/images/team_ruben.jpg', import.meta.url).href
  },
  {
    name: "It's coming..",
    role: 'Marketing & Branding - Content Creation Officer',
    image: new URL('../../../../assets/images/team_girl.jpg', import.meta.url).href
  },
  {
    name: 'Jacques Vidoret',
    role: 'Networks Architecture - UK and Europe Regional Manager',
    image: new URL('../../../../assets/images/team_jacques.jpg', import.meta.url).href
  },
  {
    name: 'Daniel Dominguez',
    role: 'Industrial Engineer - South America Regional Manager',
    image: new URL('../../../../assets/images/team_daniel.jpg', import.meta.url).href
  },
  {
    name: 'George Mazulis',
    role: 'Human Resources - Central America Regional Manager',
    image: new URL('../../../../assets/images/photo_george.jpg', import.meta.url).href
  },
  {
    name: "It's coming..",
    role: 'Sales Specialist - Canada & United States Regional Manager',
    image: new URL('../../../../assets/images/team_girl.jpg', import.meta.url).href
  }
]
</script>

<style scoped>
</style>
