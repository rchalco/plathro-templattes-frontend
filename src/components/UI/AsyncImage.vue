<template>
  <div class="async-image-container" :style="containerStyle">
    <!-- Show skeleton while loading -->
    <ImageSkeleton 
      v-if="isLoading" 
      :width="width" 
      :height="height" 
      :rounded="rounded"
      :aspect-ratio="aspectRatio"
    />
    
    <!-- Show image when loaded -->
    <img
      v-else-if="imageLoaded && !imageError"
      :src="imageSrc"
      :alt="alt"
      :class="imageClasses"
      :style="imageStyle"
      loading="lazy"
    />
    
    <!-- Show fallback when error occurs -->
    <div 
      v-else-if="imageError" 
      class="image-error-fallback"
      :style="fallbackStyle"
      :class="{ 'rounded': rounded }"
    >
      <i class="bi bi-image" style="font-size: 2rem; color: #999;"></i>
      <span class="error-text">{{ errorText || 'No imagen disponible' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import ImageSkeleton from './ImageSkeleton.vue'

interface Props {
  src?: string
  alt?: string
  width?: string
  height?: string
  rounded?: boolean
  aspectRatio?: string
  imageClass?: string
  errorText?: string
  // Function to load image data
  loadImageFn?: () => Promise<string>
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Imagen',
  width: '100%',
  height: 'auto',
  rounded: false,
  aspectRatio: '1/1',
  imageClass: '',
  errorText: ''
})

const isLoading = ref(true)
const imageLoaded = ref(false)
const imageError = ref(false)
const imageSrc = ref('')

const containerStyle = computed(() => ({
  width: props.width,
  height: props.height,
  aspectRatio: props.aspectRatio
}))

const imageStyle = computed(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const
}))

const imageClasses = computed(() => ({
  [props.imageClass]: !!props.imageClass,
  'rounded': props.rounded
}))

const fallbackStyle = computed(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f8f9fa',
  border: '1px solid #dee2e6'
}))

async function loadImage() {
  try {
    isLoading.value = true
    imageError.value = false
    imageLoaded.value = false

    let imageUrl = ''
    
    if (props.loadImageFn) {
      // Use custom async loading function
      imageUrl = await props.loadImageFn()
    } else if (props.src) {
      // Use direct src
      imageUrl = props.src
    }

    if (imageUrl) {
      // Preload the image to ensure it's ready
      const img = new Image()
      img.onload = () => {
        imageSrc.value = imageUrl
        imageLoaded.value = true
        isLoading.value = false
      }
      img.onerror = () => {
        imageError.value = true
        isLoading.value = false
      }
      img.src = imageUrl
    } else {
      imageError.value = true
      isLoading.value = false
    }
  } catch (error) {
    console.error('Error loading image:', error)
    imageError.value = true
    isLoading.value = false
  }
}

// Watch for changes in src or loadImageFn
watch([() => props.src, () => props.loadImageFn], () => {
  if (props.src || props.loadImageFn) {
    loadImage()
  }
}, { immediate: false })

onMounted(() => {
  loadImage()
})
</script>

<script lang="ts">
export default {
  name: 'AsyncImage'
}
</script>

<style scoped>
.async-image-container {
  position: relative;
  overflow: hidden;
}

.image-error-fallback {
  border-radius: 4px;
}

.image-error-fallback.rounded {
  border-radius: 1rem;
}

.error-text {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
  text-align: center;
}

img.rounded {
  border-radius: 1rem;
}
</style>