<script setup lang="ts">
import { computed, ref, watch } from "vue";
import LazyBookingCard from "./LazyBookingCard.vue";
import type Card from "../models/CardModel";
import { FindAmbientsResponseStore } from "@/modules/host/store/find-ambients/FindAmbientsResponseStore";
// Usar el store de Pinia
const findAmbientsStore = FindAmbientsResponseStore();

// Convertir los ambientes del store a Card[]
const cards = computed<Card[]>(() =>
  findAmbientsStore.getAmbients().map(ambient => ({
    title: ambient.title,
    description: ambient.description,
    price: `${ambient.price} por noche`,
    location: ambient.location,
    rating: ambient.rating,
    idAmbient: ambient.idAmbiente,
    fileNameImage: ambient.pathImage,
    services: [],
    b64Images: [],
    city: '',
    zona: '',
    addressMap: '',
    latitud: '',
    longitud: '',
    observacion: '',
    nombreAmbiente: '',
  }))
);
const visibleItems = cards;

watch(cards, () => {
}, { immediate: true });

console.log("Cards:", cards.value);

// Define emits to pass through events
const emit = defineEmits<{
  (e: 'view-details', card: Card): void
}>()
</script>

<template>
  <section class="container-fluid">
    <!-- Mostrar mensaje si no hay resultados -->
    <div v-if="cards.length === 0" class="text-center py-5 text-muted">
      <i class="bi bi-search" style="font-size: 2rem;"></i>
      <div class="mt-2">No hay resultados para la búsqueda.</div>
    </div>
    <!-- Mostrar lista de cards si hay resultados -->
    <div v-else class="cards-grid mt-5">
      <!-- Render visible cards with lazy loading -->
      <article class="card-article-spacing" v-for="(card, index) in visibleItems" :key="`${card.idAmbient}-${index}`">
        <LazyBookingCard :card="card" @view-details="$emit('view-details', $event)" />
      </article>
    </div>
  </section>
</template>

<style scoped>
/* ============================================
   LAYOUT PRINCIPAL
   ============================================ */
.container-fluid {
  padding: 0 1rem;
}

.cards-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem 2rem;
  justify-content: flex-start;
  margin-top: 2rem;
  padding: 0;
}

/* ============================================
   TARJETAS INDIVIDUALES
   ============================================ */
.card-article-spacing {
  flex: 1 1 320px;
  max-width: 340px;
  min-width: 260px;
  display: flex;
  margin-bottom: 1rem;
}

/* ============================================
   ESTADOS DE CARGA
   ============================================ */
.load-more-trigger {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  grid-column: 1 / -1;
}

.loading-indicator {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #6c757d;
  font-size: 0.95rem;
  font-weight: 500;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #198754;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.end-of-results {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 0;
  color: #6c757d;
  font-size: 0.95rem;
  font-weight: 500;
  grid-column: 1 / -1;
}

/* ============================================
   ESTADO VACÍO
   ============================================ */
.text-center.py-5.text-muted {
  padding: 3rem 1rem;
  color: #8e9aaf;
}

.text-center.py-5.text-muted i {
  color: #b8c5d6;
  margin-bottom: 1rem;
}

/* ============================================
   ANIMACIONES
   ============================================ */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 991px) {
  .cards-grid {
    gap: 2rem 1.5rem;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .card-article-spacing {
    flex: 1 1 280px;
    max-width: 320px;
    min-width: 220px;
    margin-bottom: 1.5rem;
  }

  .container-fluid {
    padding: 0 0.75rem;
  }
}

@media (max-width: 600px) {
  .cards-grid {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    margin-top: 1rem;
  }

  .card-article-spacing {
    max-width: 98vw;
    min-width: 0;
    margin-bottom: 1rem;
  }

  .container-fluid {
    padding: 0 0.5rem;
  }

  .load-more-trigger,
  .end-of-results {
    padding: 1.5rem 0;
  }
}
</style>
