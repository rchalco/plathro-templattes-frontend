<template>
  <section class="team-section">
    <div class="team-container">
      <EditableText page-name="team" component-name="header" element-id="title" default-value="Meet Our Team" tag="h1"
        class-name="team-title" :rows="1" />
      <EditableText page-name="team" component-name="header" element-id="description"
        default-value="Our talented team of professionals dedicated to your success" tag="p"
        class-name="team-description" :rows="2" />
      <div class="team-grid">
        <div v-for="i in 6" :key="i" class="team-member">
          <EditableImage :page-name="'team'" :component-name="'members'" :element-id="`member-${i}-photo`"
            :default-value="`https://via.placeholder.com/300x300?text=Member+${i}`" :alt="`Team Member ${i}`"
            img-class="member-photo" />
          <EditableText :page-name="'team'" :component-name="'members'" :element-id="`member-${i}-name`"
            :default-value="`Team Member ${i}`" tag="h3" class-name="member-name" :rows="1" />
          <EditableText :page-name="'team'" :component-name="'members'" :element-id="`member-${i}-role`"
            :default-value="`Position ${i}`" tag="p" class-name="member-role" :rows="1" />
          <EditableText :page-name="'team'" :component-name="'members'" :element-id="`member-${i}-bio`"
            :default-value="`Brief bio about team member ${i} and their expertise in the field.`" tag="p"
            class-name="member-bio" :rows="3" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'
</script>

<style scoped>
.team-section {
  padding: 4rem 2rem;
  background-color: #f9f9f9;
}

.team-container {
  max-width: 1200px;
  margin: 0 auto;
}

.team-title {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.team-description {
  font-size: 1.25rem;
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.team-member {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.member-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.member-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.member-role {
  font-size: 1rem;
  color: #2196f3;
  font-weight: 500;
  margin-bottom: 1rem;
}

.member-bio {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .team-section {
    padding: 2rem 1rem;
  }

  .team-title {
    font-size: 2rem;
  }

  .team-description {
    font-size: 1rem;
  }
}
</style>
