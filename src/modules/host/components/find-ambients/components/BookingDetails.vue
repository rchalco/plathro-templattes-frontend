<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import { useGoogleMap } from '@/modules/host/usecase/google-maps/UseGoogleMaps'
import type Card from '../models/CardModel'
import ListService from './ListService.vue'
import { FindAmbientCompleteResponseStore } from '@/modules/host/store/find-ambients/FindAmbientCompleteResponseStore'
import { watch } from 'vue'
import { StepFindAmbientsStore } from '@/modules/host/store/find-ambients/StepFindAmbientsStore'


const { center, zoom, markerPosition } = useGoogleMap()
const apiKey = 'AIzaSyDXrZiXuUraWzXwB_hoTRI3RZN-XyTp8pM'
const props = defineProps<{ card: Card }>()

const images = computed(() => ambient?.b64Images || [])
const modalOpen = ref(false)
const currentIndex = ref(0)
const store = FindAmbientCompleteResponseStore();

const storeStepe = StepFindAmbientsStore();

function openModal(index: number) {
  currentIndex.value = index
  modalOpen.value = true
}
function closeModal() {
  modalOpen.value = false
}
function prevImage() {
  if (currentIndex.value > 0) currentIndex.value--
  else currentIndex.value = images.value.length - 1
}
function nextImage() {
  if (currentIndex.value < images.value.length - 1) currentIndex.value++
  else currentIndex.value = 0
}

// Rating dinámico
const maxRating = 5
const filledStars = computed(() => Math.round(props.card.rating ?? 0))
const emptyStars = computed(() => maxRating - filledStars.value)

onMounted(() => {

})

const handleMapClick = (event: google.maps.MapMouseEvent) => {
  if (event.latLng) {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    markerPosition.value = newPosition
    center.value = newPosition
  }
}

const ambient = store.getAmbient()
//console.log('Ambient completo:', ambient)
//props.card.city  = ambient?.city ?? '';
// Si ambient.latitud y ambient.longitud son strings, conviértelas a número
function getLatLng() {
  return {
    lat: Number(ambient?.latitud) || -17.7833, // valor por defecto si no hay datos
    lng: Number(ambient?.longitud) || -63.1821
  }
}
center.value = getLatLng()
markerPosition.value = getLatLng()

// Si ambient puede cambiar dinámicamente, observa los cambios:
watch(
  () => [ambient?.latitud, ambient?.longitud],
  () => {
    const pos = getLatLng()
    center.value = pos
    markerPosition.value = pos
  }
)

const goBack = () => {
  storeStepe.setStepByIdStep('buscar-ambientes')
}
const paymentAmbient = () => {
  console.log('Realizando reserva para el ambiente:', ambient)
  storeStepe.setStepByIdStepWithCard('pago-reserva', props.card)
}
</script>

<template>
  <section class="container-fluid booking-details-mobile">
    <div class="row">
      <div class="col-12">
        <article class="card">
          <div class="card-body p-3 p-md-4">
            <header>
              <h2 class="mb-3 h4 h3-md">Detalle del Hospedaje</h2>
            </header>
            <div class="row flex-column flex-lg-row">
              <!-- Columna izquierda: galería + servicios -->
              <div class="col-12 col-lg-5 d-flex flex-column gap-3 mb-3 mb-lg-0 h-100" style="min-height: 480px;">
                <!-- Galería tipo Airbnb -->
                <div class="airbnb-gallery d-flex flex-lg-row flex-column gap-2">
                  <!-- Imagen principal -->
                  <div class="main-image-container flex-shrink-0 mb-2 mb-lg-0" style="flex:2; cursor:pointer;"
                    @click="openModal(0)">
                    <img :src="ambient?.b64Images[0]?.b64Images" :alt="`Imagen principal de ${card.title}`"
                      class="shadow w-100 border-radius-lg" style="height: 240px; object-fit: cover;" />
                  </div>
                  <!-- Miniaturas -->
                  <div class="d-flex flex-lg-column flex-row gap-2 justify-content-center align-items-center"
                    style="flex:1;">
                    <div v-for="(image, idx) in ambient?.b64Images.slice(1, 5)" :key="idx" class="thumbnail-container"
                      @click="openModal(idx + 1)" style="cursor:pointer;">
                      <img :src="image.b64Images" :alt="`Miniatura ${idx + 2} de ${card.title}`"
                        class="shadow border-radius-lg" style="width: 60px; height: 60px; object-fit: cover;" />
                    </div>
                    <div v-if="ambient && ambient.b64Images && ambient.b64Images.length > 5"
                      class="thumbnail-container more-thumbnails" @click="openModal(5)"
                      style="cursor:pointer; display: flex; align-items: center; justify-content: center; background: #eee; width: 60px; height: 60px; border-radius: 8px;">
                      +{{ ambient?.b64Images.length - 5 }}
                    </div>
                  </div>
                </div>
                <!-- Servicios debajo de la galería -->
                <div class="services-block mt-2">
                  <h6 class="mb-2">Servicios incluidos</h6>
                  <div class="services-grid">
                    <ListService v-for="(servicios, idx) in ambient?.services" :key="servicios.id"
                      :servicios="servicios" :index="idx" />

                  </div>
                </div>

              </div>
              <!-- Columna derecha: detalle -->
              <section class="col-12 col-lg-7 px-2 px-md-4">
                <h3 class="mt-2 mt-lg-0 h5 h4-md">
                  {{ ambient?.city }} - {{ card.title || '' }}
                </h3>
                <!-- Fila de estrellas -->
                <div class="row mb-2">
                  <div class="col-auto">
                    <div class="rating" aria-label="Calificación">
                      <i v-for="n in filledStars" :key="'filled-' + n" class="bi bi-star-fill text-warning text-md"
                        aria-hidden="true"></i>
                      <i v-for="n in emptyStars" :key="'empty-' + n" class="bi bi-star text-muted text-md"
                        aria-hidden="true"></i>
                    </div>
                  </div>
                </div>

                <!-- Fila de precio -->
                <div class="row mb-2">
                  <div class="col-auto">
                    <h5 class="mb-2 h6 h5-md">
                      Precio: Bs. {{ card.price }}
                    </h5>
                    <span class="badge badge-success mb-2">Disponible</span>
                  </div>
                </div>



                <section class="mt-2">
                  <label class="mb-1 small">Descripción</label>
                  <ul class="mb-2 ps-3">
                    <li class="small">
                      Zona - {{ ambient?.zona }} - Dirección - {{ ambient?.addressMap }}
                    </li>
                  </ul>
                  <ul class="mb-2 ps-3">
                    <li class="small">
                      {{ card.description }}
                    </li>
                  </ul>
                </section>
                <section class="mt-2">
                  <label class="form-label text-muted small">Ubicación en el mapa</label>
                  <div class="map-container mb-2">
                    <GoogleMap :api-key="apiKey" :center="center" :zoom="zoom" class="map" >
                      <Marker :options="{ position: markerPosition, draggable: false }" />
                    </GoogleMap>
                  </div>
                </section>
              </section>
            </div>
            <footer
              class="d-flex justify-content-between align-items-center gap-2 p-2 p-md-4 shadow rounded-lg mt-3 flex-wrap">
              <button class="btn btn-secondary d-flex align-items-center gap-2 flex-grow-1 flex-sm-grow-0" type="button"
                name="volver" @click="goBack">
                <i class="bi bi-arrow-left"></i>
                <span>Volver</span>
              </button>
              <button class="btn btn-success d-flex align-items-center gap-2 flex-grow-1 flex-sm-grow-0" type="button"
                name="reservar" @click="paymentAmbient">
                <i class="bi bi-calendar-check"></i>
                <span>Reservar</span>
              </button>
            </footer>
          </div>
        </article>
      </div>
    </div>

    <!-- Modal personalizado para galería -->
    <div v-if="modalOpen" class="custom-overlay">
      <div class="custom-modal custom-modal-carousel">
        <div class="carousel-img-wrapper">
          <div class="carousel-btn-group">
            <button class="carousel-nav-btn left" @click="prevImage" title="Anterior">
              <i class="bi bi-chevron-left"></i>
            </button>
            <button class="carousel-nav-btn right" @click="nextImage" title="Siguiente">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
          <img :src="ambient?.b64Images[currentIndex]?.b64Images"
            :alt="`Imagen ampliada ${currentIndex + 1} de ${card.title}`" class="custom-modal-img" />
        </div>
        <span class="carousel-counter">{{ currentIndex + 1 }} / {{ ambient?.b64Images.length }}</span>
        <div class="carousel-close-btn-container">
          <button class="carousel-close-btn" @click="closeModal" title="Cerrar">
            <i class="bi bi-x-lg"></i> Cerrar
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.booking-details-mobile {
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  opacity: 0.95;
}

.col-12.col-lg-5.d-flex.flex-column {
  height: 520px;
  /* O el alto que prefieras */
  min-height: 400px;
}

.my-gallery {
  flex-basis: 70%;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 0;
  max-height: 70%;
  overflow-y: auto;
}

.services-block {
  flex-basis: 30%;
  flex-grow: 0;
  flex-shrink: 0;
  max-height: 30%;
  overflow-y: auto;
}

#map {
  width: 100%;
  border-radius: 12px;
  z-index: 0;
  min-height: 120px;
  height: 160px;
}

.rating .bi {
  font-size: 1.1rem;
}

.btn {
  font-size: 0.95rem;
  padding: 0.4rem 0.6rem;
  width: 200px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  width: 100%;
}

.airbnb-gallery {
  width: 100%;
  min-height: 240px;
}

.main-image-container img {
  border-radius: 12px;
  object-fit: cover;
  width: 100%;
  height: 240px;
}

@media (max-width: 991px) {
  .airbnb-gallery {
    flex-direction: column !important;
  }

  .main-image-container img {
    height: 180px;
  }
}

@media (max-width: 991px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 576px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .booking-details-mobile {
    padding: 0.2rem !important;
  }

  .card-body {
    padding: 0.7rem !important;
  }

  .my-gallery img {
    max-height: 90px !important;
  }

  .rating .bi {
    font-size: 1rem;
  }

  h2,
  h3,
  h5,
  h6 {
    font-size: 1rem !important;
  }

  .map-container {
    min-height: 100px;
    height: 240px;
  }

  .btn {
    font-size: 0.95rem;
    padding: 0.4rem 0.6rem;
    width: 80px;
  }
}

/* Mejora para el modal/carrusel */
.custom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  /* opacidad para ocultar lo de atrás */
  z-index: 999999;
  /* más alto que cualquier otro */
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  /* aquí decides qué tan abajo quieres el modal */
}

.custom-modal {
  background: transparent;
  border-radius: 16px;
  box-shadow: none;
  max-width: 90vw;
  max-height: 80vh;
  width: 500px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

}

.custom-modal-carousel {
  position: relative;
  background: transparent;
  box-shadow: none;
  max-width: 98vw;
  max-height: 98vh;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.carousel-top-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.2rem 1.5rem 0.5rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  pointer-events: none;
  /* Fondo semitransparente para mejor visibilidad sobre la imagen */
  background: linear-gradient(to bottom, rgba(30, 30, 30, 0.7) 80%, rgba(30, 30, 30, 0.0) 100%);
}

.carousel-top-bar>* {
  pointer-events: all;
}

.carousel-img-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.custom-modal-img {
  width: 90vw;
  height: 50vh;
  /* Limita la altura de la imagen al 70% de la pantalla en desktop */
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.25);
  object-fit: contain;
  margin: 0 auto;
  display: block;
}

.carousel-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(30, 30, 30, 0.7);
  border: none;
  color: #fff;
  font-size: 2.2rem;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  pointer-events: all;
}

.carousel-nav-btn.left {
  left: 2vw;
}

.carousel-nav-btn.right {
  right: 2vw;
}

.carousel-nav-btn:hover {
  background: #fff;
  color: #14532d;
}

/* --- Carrusel Modal Mejorado --- */
.carousel-img-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.custom-modal-img {
  max-width: 90vw;
  max-height: 70vh;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.25);
  background: #fff;
  object-fit: contain;
  margin: 0 auto;
  display: block;
  z-index: 2;
}

/* Botones de navegación y cerrar cerca de la imagen */
.carousel-btn-group {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 90vw;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 3;
  padding: 0 1.5rem;
}

.carousel-nav-btn,
.carousel-close-btn {
  pointer-events: all;
  background: rgba(30, 30, 30, 0.7);
  border: none;
  color: #fff;
  font-size: 2.2rem;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  margin: 0 0.5rem;
}

.carousel-nav-btn:hover,
.carousel-close-btn:hover {
  background: #fff;
  color: #14532d;
}

.carousel-close-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.2rem;
  width: 100%;
  z-index: 20;
}

.carousel-close-btn {
  background: rgba(231, 76, 60, 0.95);
  color: #fff;
  font-size: 1.2rem;
  min-width: 100px;
  height: 40px;
  border-radius: 20px;
  padding: 0 1.5rem;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.18);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s, color 0.2s;
  border: none;
  justify-content: center;
}

.carousel-close-btn:hover {
  background: #fff;
  color: #e74c3c;
}

.carousel-counter {
  display: block;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1rem;
  z-index: 15;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
  background: rgba(30, 30, 30, 0.45);
  border-radius: 12px;
  padding: 0.2rem 0;
}

@media (max-width: 600px) {
  .carousel-counter {
    font-size: 1rem;
    margin-top: 0.7rem;
    margin-bottom: 0rem;
    /* margen inferior extra para evitar el menú inferior */
  }

  .carousel-close-btn-container {
    margin-top: 0.7rem;
    margin-bottom: 6rem;
    /* margen inferior extra para evitar el menú inferior */
  }
}
</style>
