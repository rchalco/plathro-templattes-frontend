<template>
  <section class="team-section">
    <div class="w-layout-blockcontainer base-container-16 w-container">
      <div class="w-layout-grid team-grid-large">
        <div v-for="(member, index) in teamMembers" :key="index"
          :id="`w-node-f9fec589-d14e-1865-5515-01329e06b${619 + index * 7}-3615ffd7`" class="team-card">
          <!-- Contenedor aislado para la imagen -->
          <div class="team-member-image-container">
            <EditableImage :page-name="'team'" :component-name="'members'" :element-id="`member-image-${index}`"
              :default-value="member.image" :alt="member.name" :img-class="'team-member-photo'" />
          </div>

          <!-- Información del miembro -->
          <div class="team-member-info">
            <h4 class="team-member-name">
              <EditableText page-name="team" component-name="members" :element-id="`member-name-${index}`"
                :default-value="member.name" tag="span" :rows="1" />
            </h4>
            <div class="team-member-role founder-text gray-text">
              <EditableText page-name="team" component-name="members" :element-id="`member-role-${index}`"
                :default-value="member.role" tag="span" :rows="2" />
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
/* Sección del equipo */
.team-section {
  padding: 4rem 0;
}

/* Card del miembro del equipo */
.team-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
}

/* Contenedor aislado para la imagen - permite que el botón de edición aparezca en la esquina */
.team-member-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 12px;
  background-color: #f5f5f5;
}

/* Asegurar que la imagen ocupe todo el contenedor sin deformarse */
.team-member-image-container :deep(.team-member-photo),
.team-member-image-container :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Información del miembro */
.team-member-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.team-member-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: #1a1a1a;
}

.team-member-role {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #666;
}

/* Tablet (max-width: 991px) */
@media (max-width: 991px) {
  .team-section {
    padding: 3rem 0;
  }

  .team-card {
    gap: 1.25rem;
  }

  .team-member-image-container {
    border-radius: 10px;
  }

  .team-member-name {
    font-size: 1.125rem;
  }

  .team-member-role {
    font-size: 0.875rem;
  }
}

/* Móvil (max-width: 767px) */
@media (max-width: 767px) {
  .team-section {
    padding: 2.5rem 0;
  }

  .team-card {
    gap: 1rem;
  }

  .team-member-image-container {
    border-radius: 10px;
    aspect-ratio: 4 / 5;
    /* Imagen más vertical en móvil */
  }

  .team-member-name {
    font-size: 1.0625rem;
  }

  .team-member-role {
    font-size: 0.8125rem;
    line-height: 1.4;
  }
}

/* Móvil pequeño (max-width: 479px) */
@media (max-width: 479px) {
  .team-section {
    padding: 2rem 0;
  }

  .team-card {
    gap: 0.875rem;
  }

  .team-member-image-container {
    border-radius: 8px;
  }

  .team-member-info {
    gap: 0.375rem;
  }

  .team-member-name {
    font-size: 1rem;
    line-height: 1.25;
  }

  .team-member-role {
    font-size: 0.8125rem;
    line-height: 1.35;
  }
}
</style>
