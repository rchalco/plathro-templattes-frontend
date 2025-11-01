<script setup lang="ts">
import { StepFindAmbientsStore } from '../../store/find-ambients/StepFindAmbientsStore';
import FindAmbients from './components/find-ambients.vue'
import PayReserve from '../reservation-payment/components/PayReserve.vue';
import BookingDetails from './components/BookingDetails.vue';
import { FindAmbientsResponseStore } from '../../store/find-ambients/FindAmbientsResponseStore';

defineOptions({
  name: 'FindAmbients'
})
// Inicializa el store y setea el primer step
const stepStore = StepFindAmbientsStore();
stepStore.initStep();

// Eliminamos la busqueda el store

const findAmbientsStore = FindAmbientsResponseStore();
findAmbientsStore.clearAmbients();

</script>
<template>
  <main class="main-centered">
    <!-- buscador -->
    <section v-if="stepStore.getStep()!.id === 'buscar-ambientes'">
      <FindAmbients title="Busqueda Alojamiento" />
    </section>
    <!-- detalles del ambiente -->
    <section v-if="stepStore.getStep()!.id === 'detalles-ambiente'">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <BookingDetails :card="stepStore.getStep()!.currentCard!" />
      </div>
    </section>
    <!-- pago de la reserva -->
    <section v-if="stepStore.getStep()!.id === 'pago-reserva'">
      <PayReserve />
    </section>
  </main>
</template>

<style scoped>
.main-centered {
  min-height: 100vh;
  padding: 1rem 1rem;
}

.main-centered>section {
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .main-centered {
    padding: 1rem 0.3rem;
  }

  .main-centered>section {
    max-width: 100vw;
    padding: 0;
  }
}
</style>
