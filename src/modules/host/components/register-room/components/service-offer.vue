<script setup lang="ts">
import { ref, watch } from 'vue';
import CardService from '@/components/card-service/card-service.vue';
import { useRegisterRoomStore } from '@/modules/host/store/register-room/RegisterRoomRequestStore';
import { getServicesByCategory, initializeServices } from '@/data/servicesConfig';

const store = useRegisterRoomStore();

const currentPost = store.getRegisterRoomData!;
const especificaciones = currentPost.serviciosAmbiente || [];

// Initialize amenity services with existing data
const servicios = ref(
  initializeServices(getServicesByCategory('amenity'), especificaciones)
);

const actualizarCantidad = (index: number, cantidad: number) => {
  servicios.value[index].cantidad = cantidad;
};

// Observador para actualizar el store cuando cambien los servicios
watch(servicios, (newServicios) => {

  const serviciosActivos = newServicios.filter(servicio => servicio.cantidad > 0);

  // Reemplazar el array especificaciones con los servicios activos mapeados
  currentPost.serviciosAmbiente = serviciosActivos.map(servicio => ({
    idAmbiente: 0,
    idClasificador: parseInt(servicio.id),
    numeroAmbientes: servicio.cantidad,
    descripcionGeneral: servicio.label
  }));
  store.setRegisterRoomData(currentPost);
}, { deep: true });

</script>

<template>
  <main class="row w-100" data-animation="FadeIn">
    <ul class="services-grid" role="list">
      <CardService v-for="(servicio, index) in servicios" :key="servicio.id" :servicio="servicio" :index="index"
        @update:cantidad="actualizarCantidad" />
    </ul>
  </main>
</template>

<style scoped>
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  list-style: none;
  padding: 0;
  margin-top: 25px;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 0.75rem;
    margin-top: 15px;
  }
}

@media (max-width: 576px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    padding: 0.5rem;
    margin-top: 15px;
  }
}
</style>
