<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRegisterRoomStore } from '@/modules/host/store/register-room/RegisterRoomRequestStore';
import { DxNumberBox } from 'devextreme-vue/number-box';
import DxTextBox from 'devextreme-vue/text-box';
const store = useRegisterRoomStore();
const currentPost = store.getRegisterRoomData!;


const tituloAmbiente = ref('');
const descripcionAmbiente = ref('');
const precioAmbiente = ref(0);


watch([tituloAmbiente, descripcionAmbiente, precioAmbiente], ([newTitulo, newDescripcion, newPrecioAmbiente]) => {
  currentPost.title = newTitulo;
  currentPost.description = newDescripcion;
  currentPost.price = newPrecioAmbiente;
  store.setRegisterRoomData(currentPost);
});
</script>

<template>
  <section class="main-container" data-animation="FadeIn">


    <div class="form-container">
      <div class="form-group input-with-icon">
        <i class="bi bi-pencil"></i>
        <DxTextBox placeholder="Hermoso ambiente..." :input-attr="{ 'aria-label': 'Full Name' }"
          label="Título del ambiente" label-mode="floating" :max-length="30" :show-clear-button="true"
          v-model:value="tituloAmbiente" />
      </div>

      <div class="form-group input-with-icon">
        <i class="bi bi-pencil-square"></i>
        <textarea id="ambiente-descripcion" v-model="descripcionAmbiente" rows="4"
          placeholder="Describe las características principales de tu ambiente..."></textarea>
      </div>

      <div class="form-group input-with-icon">
        <i class="bi bi-coin"></i>
        <DxNumberBox :max-length="12" v-model:value="precioAmbiente" label="Precion en Bs. x Noche"
          label-mode="floating" format="#,##0.## Bs." :input-attr="{ 'aria-label': 'Accounting Format' }" />
      </div>

    </div>
  </section>
</template>

<style scoped>
.main-container {
  background-color: transparent important !;
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.room-card {
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.room-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(32, 201, 151, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(32, 201, 151, 0.2);
}

.room-card:hover::before {
  opacity: 1;
  animation: pulseGlow 2s infinite;
}

.selected-card {
  border: 2px solid #20c997;
  box-shadow: 0 4px 10px rgba(32, 201, 151, 0.3);
  transform: translateY(-5px);
}

@keyframes pulseGlow {
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }

  100% {
    transform: scale(0.95);
    opacity: 0.5;
  }
}

.form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 1rem;
  color: #344767;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #344767;
  transition: all 0.2s ease;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #20c997;
  box-shadow: 0 0 0 2px rgba(32, 201, 151, 0.2);
}

@media (max-width: 576px) {
  .room-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0.5rem;
  }

  .room-card {
    min-width: 0;
    font-size: 0.9rem;
  }

  .room-card:hover {
    transform: translateY(-3px);
    /* Reducido para móvil */
  }

  .room-card::before {
    background: radial-gradient(circle at center, rgba(32, 201, 151, 0.15) 0%, transparent 60%);
  }

}

.form-container {
  margin: 1rem auto;
}

.form-group label {
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  padding: 0.5rem;
  font-size: 0.9rem;
}

.form-group textarea {
  min-height: 80px;
}

/* Ajuste adicional para pantallas muy pequeñas */
@media (max-width: 360px) {
  .room-grid {
    grid-template-columns: 1fr;
    /* Vuelve a una columna en pantallas muy pequeñas */
  }
}

.form-container input,
.form-container select,
.form-container .dx-textbox,
.form-container .dx-selectbox {
  min-width: 300px;
  max-width: 500px;
  width: 100%;
}
</style>
