<template>
  <section class="team-section">
    <div class="w-layout-blockcontainer base-container-16 w-container">
      <div class="team-founder-block">
        <div id="w-node-f9fec589-d14e-1865-5515-01329e06b60c-3615ffd7" class="founder-text-wrapper">
          <div data-w-id="f9fec589-d14e-1865-5515-01329e06b60d"
            style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
            class="founder-quote home-2">
            <img loading="lazy" src="/src/assets/images/green-quotes.svg" alt="icon" class="quotes-icon">
            <div class="founder-quote-text black">
              <EditableText page-name="team" component-name="founder" element-id="quote-text"
                default-value='"We started this journey with a simple belief — that everyone should start for free and pay as they grow. Every step we take, every partnership we build, reflects our commitment to innovation and common good."'
                tag="span" :rows="3" />
            </div>
          </div>
          <div class="founder-name-wrapper">
            <div data-w-id="f9fec589-d14e-1865-5515-01329e06b612"
              style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
              class="founder-name">
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
          style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
          class="team-founder-image">
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

<style scoped>
/* Contenedor de la imagen del fundador */
.team-founder-image {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  overflow: hidden;
  border-radius: 12px;
}

/* Asegurar que la imagen no se estire */
.team-founder-image :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Grid del founder block - mantener layout original */
.team-founder-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

/* Mantener los IDs de nodo para el layout correcto */
#w-node-f9fec589-d14e-1865-5515-01329e06b60c-3615ffd7 {
  grid-area: auto;
}

#w-node-f9fec589-d14e-1865-5515-01329e06b617-3615ffd7 {
  grid-area: auto;
}

/* Texto del fundador */
.founder-text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.founder-quote {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quotes-icon {
  width: 40px;
  height: auto;
}

.founder-quote-text {
  font-size: 1.125rem;
  line-height: 1.6;
}

.founder-name-wrapper {
  margin-top: 1rem;
}

.founder-name {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.large-text {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
}

.founder-text {
  font-size: 1rem;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 991px) {
  .team-founder-block {
    grid-template-columns: 1fr !important;
    gap: 1.5rem;
  }

  .team-founder-image {
    min-height: 320px;
    order: -1;
  }

  .founder-text-wrapper {
    gap: 1.5rem;
  }

  .founder-quote-text {
    font-size: 1rem;
    line-height: 1.5;
  }

  .large-text {
    font-size: 1.25rem;
  }

  .founder-text {
    font-size: 0.95rem;
  }
}

@media (max-width: 767px) {
  .team-founder-block {
    gap: 1.25rem;
  }

  .team-founder-image {
    min-height: 280px;
    border-radius: 10px;
  }

  .founder-text-wrapper {
    gap: 1.25rem;
  }

  .founder-quote {
    gap: 0.75rem;
  }

  .quotes-icon {
    width: 30px;
  }

  .founder-quote-text {
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .large-text {
    font-size: 1.125rem;
    line-height: 1.25;
  }

  .founder-text {
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .founder-name-wrapper {
    margin-top: 0.5rem;
  }
}

@media (max-width: 479px) {
  .team-founder-block {
    gap: 1rem;
  }

  .team-founder-image {
    min-height: 240px;
    border-radius: 8px;
  }

  .founder-text-wrapper {
    gap: 1rem;
  }

  .founder-quote {
    gap: 0.625rem;
  }

  .quotes-icon {
    width: 26px;
  }

  .founder-quote-text {
    font-size: 0.875rem;
    line-height: 1.45;
  }

  .large-text {
    font-size: 1rem;
    line-height: 1.2;
  }

  .founder-text {
    font-size: 0.8125rem;
    line-height: 1.4;
  }

  .founder-name-wrapper {
    margin-top: 0.375rem;
  }

  .founder-name {
    gap: 0.375rem;
  }
}
</style>
