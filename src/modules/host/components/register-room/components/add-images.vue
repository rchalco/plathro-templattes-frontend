<script setup lang="ts">
import AdminPics from "@/modules/host/components/register-room/components/admin-pics.vue";
import { useRegisterRoomStore } from "@/modules/host/store/register-room/RegisterRoomRequestStore";
// Configuración de Dropzone
import { ref, watch } from "vue";
const imagesArray = ref<string[]>([]);
const selectedFavoriteIndex = ref<number>(-1);
const store = useRegisterRoomStore();
const currentPost = store.getRegisterRoomData!;

// Observador para actualizar el store cuando cambien los servicios
watch(imagesArray, (newImages) => {

  currentPost.fotos = [];
  store.setRegisterRoomData(currentPost);
  const fotosAmbiente = newImages.map(foto => ({
    idAmbiente: currentPost.idTipoAmbiente,
    esFotoInicial: selectedFavoriteIndex.value,
    pathFoto: '',
    b64Foto: foto,
    descripcionFoto: 'S/D'
  }));

  currentPost.fotos = fotosAmbiente;
  store.setRegisterRoomData(currentPost);
}, { deep: true });

watch(selectedFavoriteIndex, (newIndex) => {
  if (currentPost.fotos.length === 0) return;
  currentPost.fotos.forEach((foto, index) => {
    foto.esFotoInicial = index === newIndex ? 1 : 0;
  });
}, { deep: true });

</script>

<template>
  <article class="pt-3 bg-white border-radius-xl" data-animation="FadeIn">
    <main class="image-management-section">
      <section class="mt-3">
        <AdminPics v-model:images="imagesArray" v-model:favoriteIndex="selectedFavoriteIndex" />
      </section>
    </main>
  </article>
</template>

<style scoped>
.title-container {
  width: 100%;
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #344767;
  margin-bottom: 0.5rem;
  font-family: 'Roboto', sans-serif;
}

.section-subtitle {
  font-size: 0.95rem;
  color: #67748e;
  font-family: 'Roboto', sans-serif;
}

.description {
  color: #67748e;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

.image-management-section {
  padding: 1rem;
}

/* Estilos personalizados */
.dropzone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  cursor: pointer;
}

.dropzone:hover {
  background-color: #f1f1f1;
}
</style>
