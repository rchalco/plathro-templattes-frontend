<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import { useRegisterRoomStore } from '@/modules/host/store/register-room/RegisterRoomRequestStore';
import { useGoogleMap } from '@/modules/host/usecase/google-maps/UseGoogleMaps';
import { useDireccion } from '@/modules/host/usecase/google-maps/UseDirecction';
import { useUserStore } from '@/modules/security/store/userStore';

const store = useRegisterRoomStore();
const { direccion, obtenerEtiqueta, obtenerPlaceholder } = useDireccion();
const { center, zoom, markerPosition, actualizarUbicacion } = useGoogleMap();

const apiKey = 'AIzaSyDXrZiXuUraWzXwB_hoTRI3RZN-XyTp8pM';

onMounted(async () => {
  await actualizarUbicacion();
});

const currentPost = store.getRegisterRoomData!;

watch(direccion, (newDireccion) => {

  currentPost.idCountry = 76
  currentPost.addressMap = newDireccion.calle;
  currentPost.zona = newDireccion.zona;
  currentPost.city = newDireccion.ciudad;
  currentPost.latitud = center.value.lat.toString();
  currentPost.longitud = center.value.lng.toString();
  currentPost.activo = 0;
  currentPost.idSesion = useUserStore().SessionId ? useUserStore().SessionId.value : 0;
  currentPost.idPersona = 1;
  currentPost.disponible = 0;
  store.setRegisterRoomData(currentPost);

}, { deep: true });

const handleMapClick = async (event: google.maps.MapMouseEvent) => {
  if (event.latLng) {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    markerPosition.value = newPosition;
    center.value = newPosition;

    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: newPosition });

      if (response.results[0]) {
        const addressComponents = response.results[0].address_components;
        const street = addressComponents.find(component =>
          component.types.includes('route'))?.long_name || '';
        const city = addressComponents.find(component =>
          component.types.includes('locality'))?.long_name || '';
        const zone = addressComponents.find(component =>
          component.types.includes('sublocality'))?.long_name || '';

        direccion.value = {
          ...direccion.value,
          calle: street,
          ciudad: city,
          zona: zone
        };
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
    }
    currentPost.latitud = newPosition.lat.toString()
    currentPost.longitud = newPosition.lng.toString()

    store.setRegisterRoomData(currentPost);
  }
};
</script>

<template>
  <main class="room-features w-100">
    <div class="location-container">
      <div class="map-container">
        <GoogleMap :api-key="apiKey" :center="center" :zoom="zoom" class="map" @click="handleMapClick">
          <Marker :options="{ position: markerPosition, draggable: true }" />
        </GoogleMap>
      </div>

      <form class="address-form" @submit.prevent>
        <div class="form-group" v-for="(value, key) in direccion" :key="key">
          <label>{{ obtenerEtiqueta(key) }}</label>
          <input type="text" v-model="direccion[key]" class="form-control" :readonly="key === 'pais'"
            :placeholder="obtenerPlaceholder(key)" />
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
.location-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
}

.address-form {
  padding: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #344767;
  font-size: 0.9rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #344767;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #66bb6a;
  box-shadow: 0 0 0 2px rgba(102, 187, 106, 0.2);
}

@media (max-width: 768px) {
  .location-container {
    grid-template-columns: 1fr;
  }

  .map-container {
    height: 300px;
  }
}
</style>
