<script setup lang="ts">
import { ref, watch } from 'vue';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';

const isMobileNative = Capacitor.isNativePlatform();

interface ImageGalleryState {
  images: string[];
  favoriteIndex: number;
}

const state = ref<ImageGalleryState>({
  images: [],
  favoriteIndex: 0
});

// Definimos los emits
const emit = defineEmits<{
  (e: 'update:images', value: string[]): void;
  (e: 'update:favoriteIndex', value: number): void;
}>();

// Observamos los cambios en state y emitimos los eventos
watch(() => state.value.images, (newImages) => {
  emit('update:images', newImages);
}, { deep: true });

watch(() => state.value.favoriteIndex, (newIndex) => {
  emit('update:favoriteIndex', newIndex);
});

const onImageSelect = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;

  Array.from(files).forEach((file) => {
    state.value.favoriteIndex = 0;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      // Extraemos solo la parte del base64, eliminando el prefijo de data URL
      const base64Content = base64String.split(',')[1];
      state.value.images.push(base64Content);

      if (state.value.favoriteIndex === -1) {
        state.value.favoriteIndex = 0;
      }
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index: number) => {
  state.value.images.splice(index, 1);
  updateFavoriteIndexAfterRemoval(index);
};

const updateFavoriteIndexAfterRemoval = (removedIndex: number) => {
  const { images, favoriteIndex } = state.value;

  if (images.length === 0) {
    state.value.favoriteIndex = -1;
  } else if (favoriteIndex === removedIndex) {
    state.value.favoriteIndex = removedIndex < images.length ? removedIndex : removedIndex - 1;
  } else if (favoriteIndex !== -1 && favoriteIndex! > removedIndex) {
    state.value.favoriteIndex!--;
  }
};

const markAsFavorite = (index: number) => {
  console.log(`Marcar imagen ${index} como favorita`);
  state.value.favoriteIndex = index;
};

async function pickOrTakePhoto() {
  if (isMobileNative) {
    try {
      const photo = await Camera.getPhoto({
        quality: 50,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        direction: CameraDirection.Rear, // Usa cámara trasera por defecto
        correctOrientation: true,
        width: 1024, // Limita el tamaño
        height: 1024,
        allowEditing: false,
        saveToGallery: true // No guarda en galería
      });
      return photo.base64String;
    } catch (e: unknown) {
      console.error('Error al tomar la foto:', e);
      // El usuario canceló o hubo un error
      return undefined;
    }
  } else {
    // Web: usar input file
    return new Promise<string | undefined>((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
      };
      input.click();
    });
  }
}

async function handlePhoto() {
  const base64 = await pickOrTakePhoto();
  if (base64) {
    // úsalo como necesites (por ejemplo, subirlo al backend)
    state.value.images.push(base64);
  }
}

</script>

<template>
  <section class="admin-pics">
    <article class="card">
      <header>
        <p>Arrastra o elige una imagen para cargar</p>
      </header>

      <main>
        <div class="file-upload-area" role="region" aria-label="Área de carga de imágenes">
          <label for="image-upload" class="file-input-container input-with-icon">
            <i class="bi bi-cloud-arrow-up"></i>
            <input type="file" id="image-upload" accept="image/*" multiple @change="onImageSelect" class="file-input"
              aria-label="Seleccionar imágenes para cargar" />
            <span class="file-input-label">Elegir archivos</span>

          </label>
          <label for="image-upload" class="file-input-container input-with-icon" @click="handlePhoto"
            v-if="isMobileNative">
            <i class="bi bi-camera"></i>
            <span class="file-input-label">Abrir camara</span>
          </label>
        </div>

        <section v-if="state.images.length" class="image-gallery" role="region"
          aria-label="Galería de imágenes seleccionadas">
          <figure v-for="(image, index) in state.images" :key="index" class="image-preview">
            <img :src="`data:image/jpeg;base64,${image}`" :alt="`Imagen ${index + 1}`" loading="lazy" />
            <figcaption class="image-actions">
              <button @click="removeImage(index)" class="remove-btn" aria-label="Eliminar imagen" type="button">
                <i class="bi bi-trash" aria-hidden="true"></i>
              </button>
              <button @click="markAsFavorite(index)" class="favorite-btn"
                :class="{ active: state.favoriteIndex === index }"
                :aria-label="`${state.favoriteIndex === index ? 'Desmarcar como favorita' : 'Marcar como favorita'}`"
                type="button">
                <i class="bi bi-star-fill" aria-hidden="true"></i>
              </button>
            </figcaption>
          </figure>
        </section>
      </main>
    </article>
  </section>
</template>

<style scoped>
.admin-pics {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.card {
  width: 80%;
  border: 1px solid #d2ebd2;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
}

header p {
  font-family: 'Roboto', sans-serif;
  font-size: 1.25rem;
  color: #344767;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.file-input-container {
  position: relative;
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.2s ease;
}

.file-input-container:hover {
  background-color: #e6f7ff;
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.file-input-label {
  font-size: 1rem;
  color: #67748e;
  pointer-events: none;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.image-preview {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-actions button {
  position: absolute;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
}

.remove-btn {
  top: 4px;
  right: 4px;
  background-color: rgba(220, 53, 69, 0.9);
  color: white;
}

.remove-btn:hover {
  background-color: rgb(220, 53, 69);
  transform: scale(1.1);
}

.favorite-btn {
  bottom: 4px;
  left: 4px;
  background-color: rgba(255, 193, 7, 0.9);
  color: white;
}

.favorite-btn:hover {
  background-color: rgb(255, 193, 7);
  transform: scale(1.1);
}

.favorite-btn.active {
  background-color: #66bb6a;
  box-shadow: 0 0 8px rgba(102, 187, 106, 0.6);
}

.favorite-btn.active i {
  transform: scale(1.2);
}

button i {
  font-size: 14px;
}

@media (max-width: 768px) {
  .card {
    width: 95%;
    padding: 0.75rem;
  }

  header p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .file-input-container {
    height: 45px;
  }

  .image-preview {
    width: 90px;
    height: 90px;
  }
}

@media (max-width: 576px) {
  .card {
    width: 100%;
    padding: 0.5rem;
  }

  header p {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  .file-input-container {
    height: 40px;
  }

  .image-preview {
    width: 80px;
    height: 80px;
  }

  .image-gallery {
    gap: 8px;
  }

  .image-actions button {
    width: 20px;
    height: 20px;
  }

  button i {
    font-size: 12px;
  }
}
</style>
