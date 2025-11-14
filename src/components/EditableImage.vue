<template>
  <div :class="{ 'edit-mode': isEditMode }">
    <img v-if="displayValue" :src="displayValue" :class="imgClass" :sizes="sizes" :alt="alt" />
    <div v-else class="placeholder-image">
      <span>No image</span>
    </div>
    <div v-if="isEditMode" class="edit-overlay">
      <label class="upload-button">
        <input type="file" @change="handleImageUpload" accept="image/*" hidden />
        Change Image
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTemplateEditorStore } from '@/stores/templateEditorStore'
import { TemplateContentService } from '@/services/templateContentService'

interface Props {
  pageName: string
  componentName: string
  elementId: string
  defaultValue?: string
  alt?: string
  imgClass?: string
  sizes?: string
  maxSizeKb?: number // Maximum size in KB before compression
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: '',
  alt: 'Image',
  imgClass: '',
  maxSizeKb: 256, // Default 256KB
})

const editorStore = useTemplateEditorStore()
const { isEditMode } = storeToRefs(editorStore)

const localValue = ref('')

// Load value from storage
const loadValue = () => {
  localValue.value = TemplateContentService.getElementValue(
    props.pageName,
    props.componentName,
    props.elementId,
    props.defaultValue,
    'image',
  )
}

// Initial load
loadValue()

// Watch for page/component changes
watch([() => props.pageName, () => props.componentName, () => props.elementId], () => {
  loadValue()
})

const displayValue = computed(() => {
  return localValue.value || props.defaultValue
})

// Function to compress image if needed
const compressImage = (
  base64: string,
  maxSizeKb: number,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Calculate current size in KB
    const currentSizeKb = (base64.length * 3) / 4 / 1024

    // If image is already smaller than threshold, return as is
    if (currentSizeKb <= maxSizeKb) {
      resolve(base64)
      return
    }

    // Create an image element to compress
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Could not get canvas context'))
        return
      }

      // Start with original dimensions
      let width = img.width
      let height = img.height

      // Calculate compression ratio based on size difference
      const targetRatio = Math.sqrt(maxSizeKb / currentSizeKb)
      width = Math.floor(width * targetRatio)
      height = Math.floor(height * targetRatio)

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)

      // Try different quality levels to meet size requirement
      let quality = 0.9
      let compressedBase64 = canvas.toDataURL('image/jpeg', quality)
      let attempts = 0
      const maxAttempts = 10

      while (attempts < maxAttempts) {
        const sizeKb = (compressedBase64.length * 3) / 4 / 1024
        
        if (sizeKb <= maxSizeKb) {
          resolve(compressedBase64)
          return
        }

        quality -= 0.1
        if (quality < 0.1) {
          // If we can't compress enough, reduce dimensions further
          width = Math.floor(width * 0.9)
          height = Math.floor(height * 0.9)
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0, width, height)
          quality = 0.9
        }

        compressedBase64 = canvas.toDataURL('image/jpeg', quality)
        attempts++
      }

      // Return best effort compression
      resolve(compressedBase64)
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    img.src = base64
  })
}

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // Convert image to base64
  const reader = new FileReader()
  reader.onload = async (e) => {
    const base64 = e.target?.result as string
    
    try {
      // Compress image if needed
      const compressedBase64 = await compressImage(base64, props.maxSizeKb)
      
      localValue.value = compressedBase64
      TemplateContentService.setElementValue(
        props.pageName,
        props.componentName,
        props.elementId,
        compressedBase64,
        'image',
      )
    } catch (error) {
      console.error('Error compressing image:', error)
      // Fallback to original if compression fails
      localValue.value = base64
      TemplateContentService.setElementValue(
        props.pageName,
        props.componentName,
        props.elementId,
        base64,
        'image',
      )
    }
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
.placeholder-image {
  width: 100%;
  min-height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border-radius: 8px;
}

.edit-mode {
  cursor: pointer;
}

.edit-overlay {
  position: absolute;
  /*top: 0;
  left: 0;
  right: 0;*/
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.edit-mode:hover .edit-overlay {
  opacity: 1;
}

.upload-button {
  padding: 10px 20px;
  background-color: #0f1011;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s;
  z-index: 100 !important;
}

.upload-button:hover {
  background-color: #0a0c0e;
}
</style>
