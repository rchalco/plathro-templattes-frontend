<template>
  <div ref="cardRef" class="booking-card-container">
    <article class="booking-card"
      :class="{ 'booking-card--loading': isProcessingClick, 'booking-card--error': errorMessage }" role="button"
      tabindex="0" :aria-label="`Ver detalles de ${card.title} en ${card.location} por ${card.price}`"
      :aria-busy="isProcessingClick" @click="emitViewDetails" @keydown.enter="emitViewDetails"
      @keydown.space.prevent="emitViewDetails">

      <!-- Imagen del ambiente -->
      <header class="booking-card__header">
        <figure class="booking-card__image-container">
          <!-- Estado de carga -->
          <div v-if="isLoadingImage" class="booking-card__placeholder" role="img" aria-label="Cargando imagen">
            <div class="booking-card__skeleton"></div>
          </div>

          <!-- Imagen cargada -->
          <img v-else-if="imageLoaded && !imageError" :src="imageSrc" :alt="`Imagen de ${card.title}`"
            class="booking-card__image" loading="lazy" />

          <!-- Estado de error -->
          <div v-else class="booking-card__error" role="img" aria-label="Imagen no disponible">
            <i class="bi bi-image booking-card__error-icon" aria-hidden="true"></i>
            <span class="booking-card__error-text">Imagen no disponible</span>
          </div>
        </figure>
      </header>

      <!-- Información principal -->
      <main class="booking-card__content">
        <h3 class="booking-card__title">{{ card.title }}</h3>
        <p class="booking-card__description">{{ card.description }}</p>

        <!-- Estado de disponibilidad -->
        <div class="booking-card__status">
          <span class="booking-card__badge" role="status" aria-label="Estado: Disponible">
            <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
            Disponible
          </span>
        </div>
      </main>

      <!-- Separador visual -->
      <hr class="booking-card__divider" />

      <!-- Información de precio y ubicación -->
      <footer class="booking-card__footer">
        <!-- Precio -->
        <div class="booking-card__price-section">

          <span class="booking-card__price" :aria-label="`Precio: ${card.price}`">
            Bs. {{ card.price }}
          </span>
        </div>

        <!-- Ubicación -->
        <div class="booking-card__location-section">
          <address class="booking-card__location">
            <i class="bi bi-geo-alt-fill" aria-hidden="true"></i>
            <span>{{ card.location }}</span>
          </address>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import type CardModel from '../models/CardModel'
import GetImage from '@/modules/host/usecase/get-image/GetImage'
import type GetImageRequest from '@/modules/host/usecase/get-image/GetImageRequest'
import FindAmbientComplete from '@/modules/host/usecase/find-ambient-complete/FindAmbientComplete'
import FindAmbientCompleteRequest from '@/modules/host/usecase/find-ambient-complete/FindAmbientCompleteRequest'
import type { FindAmbientCompleteResponse } from '@/modules/host/usecase/find-ambient-complete/FindAmbientCompleteResponse'
import { FindAmbientCompleteResponseStore } from '@/modules/host/store/find-ambients/FindAmbientCompleteResponseStore'
import { StepFindAmbientsStore } from '@/modules/host/store/find-ambients/StepFindAmbientsStore'

// ============================================
// INTERFACES Y TIPOS
// ============================================

/**
 * Props del componente LazyBookingCard
 */
interface Props {
  /** Modelo de datos de la tarjeta de ambiente */
  card: CardModel
}

/**
 * Eventos emitidos por el componente
 */
interface Emits {
  /** Emitido cuando el usuario selecciona ver los detalles de una tarjeta */
  'view-details': [card: CardModel]
}

/**
 * Estados de carga de imagen
 */
interface ImageState {
  isLoading: boolean
  isLoaded: boolean
  hasError: boolean
  src: string
}

// ============================================
// PROPS Y EMISORES
// ============================================

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// ============================================
// ESTADO REACTIVO
// ============================================

const cardRef = ref<HTMLElement | null>(null)

// Estado de la imagen
const imageState = ref<ImageState>({
  isLoading: true,
  isLoaded: false,
  hasError: false,
  src: ''
})

// Para compatibilidad con el template existente
const isLoadingImage = computed(() => imageState.value.isLoading)
const imageLoaded = computed(() => imageState.value.isLoaded)
const imageError = computed(() => imageState.value.hasError)
const imageSrc = computed(() => imageState.value.src)

const imageResult = ref<string | null>(null)

// Estado de interacción
const isProcessingClick = ref(false)
const errorMessage = ref<string | null>(null)

// ============================================
// SERVICIOS
// ============================================

const getImageUseCase = new GetImage()
const findAmbientComplete = new FindAmbientComplete()

// ============================================
// MÉTODOS PRINCIPALES
// ============================================

/**
 * Carga la imagen del ambiente de forma asíncrona
 */
async function loadCardImage(): Promise<void> {
  try {
    resetImageState()

    const getImageRequest: GetImageRequest = {
      idAmbiente: props.card.idAmbient,
      nameImage: props.card.fileNameImage,
    }

    const result = await getImageUseCase.execute(getImageRequest)

    if (result?.fotoB64) {
      imageResult.value = result.fotoB64
    } else {
      throw new Error('No image data received')
    }
  } catch (error) {
    console.error(`Error loading image for card ${props.card.idAmbient}:`, error)
    setImageError()
  }
}

/**
 * Maneja el evento de clic/selección de la tarjeta
 */
async function emitViewDetails(): Promise<void> {
  try {
    // Prevenir clicks múltiples
    if (isProcessingClick.value) return
    isProcessingClick.value = true

    const request = new FindAmbientCompleteRequest()
    request.idAmbiente = props.card.idAmbient

    const [response, store, stepStore] = await Promise.all([
      findAmbientComplete.execute(request) as Promise<FindAmbientCompleteResponse>,
      FindAmbientCompleteResponseStore(),
      StepFindAmbientsStore()
    ])

    store.setAmbient(response)
    stepStore.setStepByIdStepWithCard('detalles-ambiente', props.card)

    emit('view-details', props.card)
  } catch (error) {
    console.error(`Error loading ambient details for ${props.card.idAmbient}:`, error)
    handleError('Error al cargar los detalles del ambiente. Por favor, inténtalo nuevamente.')
  } finally {
    isProcessingClick.value = false
  }
}

// ============================================
// MÉTODOS AUXILIARES
// ============================================

/**
 * Reinicia el estado de la imagen
 */
function resetImageState(): void {
  imageState.value = {
    isLoading: true,
    isLoaded: false,
    hasError: false,
    src: ''
  }
}

/**
 * Establece el estado de error en la imagen
 */
function setImageError(): void {
  imageState.value = {
    isLoading: false,
    isLoaded: false,
    hasError: true,
    src: ''
  }
}

/**
 * Establece la imagen como cargada exitosamente
 */
function setImageLoaded(src: string): void {
  imageState.value = {
    isLoading: false,
    isLoaded: true,
    hasError: false,
    src
  }
}

/**
 * Maneja errores generales del componente
 */
function handleError(message: string): void {
  errorMessage.value = message
  console.error(message)

  // Auto-limpiar el error después de 5 segundos
  setTimeout(() => {
    errorMessage.value = null
  }, 5000)
}

// ============================================
// WATCHERS Y LIFECYCLE
// ============================================

/**
 * Observa cambios en el resultado de la imagen
 */
watch(imageResult, (newResult) => {
  if (newResult) {
    setImageLoaded(newResult)
  }
}, { immediate: false })

/**
 * Inicializa el componente al montarse
 */
onMounted(() => {
  loadCardImage()
})
</script>

<script lang="ts">
export default {
  name: 'LazyBookingCard'
}
</script>

<style scoped>
/* ============================================
   VARIABLES CSS GLOBALES
   ============================================ */
.booking-card-container {
  --booking-card-width: 320px;
  --booking-card-height: 410px;
  --booking-card-image-height: 180px;
  --booking-card-footer-height: 80px;

  /* Colores */
  --booking-card-primary: #198754;
  --booking-card-primary-dark: #14532d;
  --booking-card-primary-light: #f0fdf4;
  --booking-card-bg: #f8fafc;
  --booking-card-bg-alt: #ffffff;
  --booking-card-text: #333333;
  --booking-card-text-muted: #6c757d;
  --booking-card-border: #e2e8f0;
  --booking-card-error-bg: #f8f9fa;

  /* Espaciado */
  --booking-card-padding: 0.75rem 1rem;
  --booking-card-gap: 0.5rem;
  --booking-card-radius: 1rem;
  --booking-card-radius-sm: 0.5rem;

  /* Sombras */
  --booking-card-shadow: 0 2px 12px rgba(20, 83, 45, 0.10);
  --booking-card-shadow-hover: 0 4px 20px rgba(20, 83, 45, 0.15);
  --booking-card-shadow-image: 0 4px 16px rgba(20, 83, 45, 0.13);

  /* Transiciones */
  --booking-card-transition: all 0.2s ease;
  --booking-card-transition-transform: transform 0.2s ease;

  height: var(--booking-card-height);
}

/* ============================================
   TARJETA PRINCIPAL
   ============================================ */
.booking-card {
  font-family: 'Comic Neue', Comic Sans MS, cursive, sans-serif;
  width: var(--booking-card-width);
  min-width: var(--booking-card-width);
  max-width: var(--booking-card-width);
  height: var(--booking-card-height);
  margin: 0 auto;
  border-radius: var(--booking-card-radius);
  box-shadow: var(--booking-card-shadow);
  background: var(--booking-card-bg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: var(--booking-card-transition);
  cursor: pointer;
  border: none;
  position: relative;
}

.booking-card:hover,
.booking-card:focus {
  transform: translateY(-2px);
  box-shadow: var(--booking-card-shadow-hover);
  border-color: var(--booking-card-primary-light);
}

.booking-card:focus {
  outline: 2px solid var(--booking-card-primary);
  outline-offset: 2px;
}

/* Estados especiales de la tarjeta */
.booking-card--loading {
  opacity: 0.7;
  cursor: wait;
  pointer-events: none;
}

.booking-card--error {
  border-color: #dc3545;
  box-shadow: 0 2px 12px rgba(220, 53, 69, 0.10);
}

/* ============================================
   HEADER - SECCIÓN DE IMAGEN
   ============================================ */
.booking-card__header {
  border-radius: var(--booking-card-radius) var(--booking-card-radius) 0 0;
  overflow: visible;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: var(--booking-card-image-height);
  flex-shrink: 0;
}

.booking-card__image-container {
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.booking-card__image {
  object-fit: cover;
  width: 100%;
  height: var(--booking-card-image-height);
  position: relative;
  top: -0.5em;
  box-shadow: var(--booking-card-shadow-image);
  background: var(--booking-card-bg-alt);
  border-radius: var(--booking-card-radius);
  z-index: 2;
  transition: var(--booking-card-transition-transform);
}

/* ============================================
   MAIN - CONTENIDO PRINCIPAL
   ============================================ */
.booking-card__content {
  padding: 0.5rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  gap: 0.5rem;
}

.booking-card__title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0.2rem 0 0.3rem 0;
  color: var(--booking-card-primary-dark);
  letter-spacing: 0.5px;
  line-height: 1.3;
}

.booking-card__description {
  font-size: 0.95rem;
  color: var(--booking-card-text);
  margin: 0;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
}

/* Estado de disponibilidad en el contenido */
.booking-card__content .booking-card__status {
  display: flex;
  justify-content: center;
  margin-top: auto;
}

.booking-card__content .booking-card__badge {
  background: var(--booking-card-primary);
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: var(--booking-card-radius-sm);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.25px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* ============================================
   DIVIDER
   ============================================ */
.booking-card__divider {
  margin: 0;
  border: none;
  height: 1px;
  background: var(--booking-card-border);
}

/* ============================================
   FOOTER - PRECIO Y UBICACIÓN
   ============================================ */
.booking-card__footer {
  background: var(--booking-card-primary-light);
  border-radius: 0 0 var(--booking-card-radius) var(--booking-card-radius);
  padding: 0.6rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.3rem;
  height: var(--booking-card-footer-height);
  flex-shrink: 0;
}

/* Sección del precio */
.booking-card__price-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.booking-card__price {
  color: var(--booking-card-primary);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

/* Sección de la ubicación */
.booking-card__location-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.booking-card__location {
  color: var(--booking-card-primary-dark);
  font-size: 0.9rem;
  font-style: normal;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  width: 100%;
  justify-content: center;
  text-align: center;
}

.booking-card__location span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(100% - 1.5rem);
  /* Espacio para el icono */
}

/* ============================================
   ESTADOS DE CARGA Y ERROR
   ============================================ */
.booking-card__placeholder {
  width: 100%;
  height: var(--booking-card-image-height);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.booking-card__skeleton {
  width: 100%;
  height: var(--booking-card-image-height);
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  border-radius: var(--booking-card-radius);
  position: relative;
  top: -0.5em;
  animation: booking-card-shimmer 1.5s ease-in-out infinite;
  box-shadow: var(--booking-card-shadow-image);
}

.booking-card__error {
  width: 100%;
  height: var(--booking-card-image-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--booking-card-error-bg);
  border: 1px solid var(--booking-card-border);
  border-radius: var(--booking-card-radius);
  position: relative;
  top: -0.5em;
  box-shadow: var(--booking-card-shadow-image);
}

.booking-card__error-icon {
  font-size: 2rem;
  color: var(--booking-card-text-muted);
  margin-bottom: var(--booking-card-gap);
}

.booking-card__error-text {
  font-size: 0.875rem;
  color: var(--booking-card-text-muted);
  text-align: center;
  margin: 0;
}

/* ============================================
   ANIMACIONES
   ============================================ */
@keyframes booking-card-shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

@keyframes booking-card-pulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }

  100% {
    opacity: 1;
  }
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 400px) {
  .booking-card-container {
    --booking-card-width: 90vw;
    --booking-card-padding: 0.6rem 0.8rem;
  }

  .booking-card {
    width: var(--booking-card-width);
    min-width: var(--booking-card-width);
    max-width: var(--booking-card-width);
    margin-left: 1.5rem;
    margin-right: auto;
  }

  .booking-card__content {
    padding: 0.4rem 0.8rem;
  }

  .booking-card__footer {
    padding: 0.5rem 0.8rem;
  }

  .booking-card__title {
    font-size: 1rem;
  }

  .booking-card__description {
    font-size: 0.9rem;
    height: 36px;
  }

  .booking-card__price {
    font-size: 1.1rem;
  }

  .booking-card__location {
    font-size: 0.85rem;
  }

  .booking-card__content .booking-card__badge {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
  }
}

@media (max-width: 320px) {
  .booking-card-container {
    --booking-card-width: 95vw;
  }

  .booking-card {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}
</style>
