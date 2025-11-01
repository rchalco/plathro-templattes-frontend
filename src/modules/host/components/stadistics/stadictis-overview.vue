<script lang="ts" setup>
import MiniStatisticsCard from '@/components/dashboard/MiniStatisticsCard.vue';
</script>

<template>
  <section class="statistics-overview">
    <div class="statistics-grid">
      <article class="statistics-item">
        <mini-statistics-card :title="{ text: 'Total Clientes', value: '45' }"
          detail="<span class='text-success text-sm font-weight-bolder'>+3%</span> mejor que mes anterior" :icon="{
            name: 'bi bi-person-arms-up',
            color: 'text-white',
            background: 'primary',
          }" />
      </article>
      <article class="statistics-item">
        <mini-statistics-card :title="{ text: 'Mis Ingresos', value: '34k' }"
          detail="<span class='text-success text-sm font-weight-bolder'>+1%</span> mejor que mes anterior" :icon="{
            name: 'bi bi-currency-dollar',
            color: 'text-white',
            background: 'success',
          }" />
      </article>
      <article class="statistics-item">
        <mini-statistics-card :title="{ text: 'Sin Aprobacion', value: '9' }" detail="Periodo de actividad 3 años"
          :icon="{
            name: 'bi bi-file-spreadsheet-fill',
            color: 'text-white',
            background: 'info',
          }" />
      </article>
    </div>
  </section>
</template>

<style scoped>
.statistics-overview {
  padding: 1rem;
}

.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.statistics-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
