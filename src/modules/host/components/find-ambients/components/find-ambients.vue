<script setup lang="ts">
import ListAmbientCard from './ListAmbientCard.vue'
import SearchFilter from './SearchFilter.vue'

defineOptions({
  name: 'FindAmbients'
})
</script>

<template>
  <main class="wizzard-container">
    <header class="position-relative header-wizar">
      <h3 class="wizard-title">¡Encuentra tu Espacio Ideal!</h3>
      <p class="wizard-subtitle">Descubre alojamientos únicos que se ajusten a tu estilo</p>
      <hr>
    </header>
    <!-- Contenido principal -->
    <form role="search" class="form-search">
      <SearchFilter title="Busqueda Alojamiento" />
    </form>
    <div class="list-center-container">
      <ListAmbientCard />
    </div>
  </main>
</template>

<style scoped>
.form-search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}

.list-center-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 0 auto;
  min-height: 50vh;
  margin-left: 1.5rem;
  box-sizing: border-box;
}

@media (max-width: 991px) {
  .list-center-container {
    margin-left: -1.6rem !important;
    padding: 0;
    width: 100vw;
    min-width: 100vw;
    box-sizing: border-box;
    overflow-x: auto;
  }
}

/* Evita que los cards se desborden y permite scroll horizontal si es necesario */
@media (max-width: 600px) {
  .list-center-container {
    margin-left: -1.6rem !important;
    width: 100vw;
    min-width: 100vw;
    margin: 0;
    overflow-x: auto;
  }
}
</style>
