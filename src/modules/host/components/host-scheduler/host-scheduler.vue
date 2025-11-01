<script setup lang="ts">
import { ref, computed, onMounted  } from 'vue'
import { DxSelectBox } from 'devextreme-vue/select-box'
import { DxScheduler } from 'devextreme-vue/scheduler'
import type AppointmentModelData from './models/AppointmentModelData'
import type { AmbienteItem } from './models/AppointmentModelData'
import HostScheduler from '../../usecase/host-scheduler/HostScheduler'
import HostSchedulerRequest from '../../usecase/host-scheduler/HostSchedulerRequest'
import type { Ambients, HostSchedulerResponse, Reservation } from '../../usecase/host-scheduler/HostSchedulerResponse'
import type { AppointmentRenderedEvent } from 'devextreme/ui/scheduler'
import { useUserStore } from '@/modules/security/store/userStore'

const respuestaScheduler = ref<HostSchedulerResponse | null>(null)
const ambientes = ref<Ambients[]>([])
const reservas = ref<Reservation[]>([])
const userStore = useUserStore()

onMounted(async () => {
  await userStore.init()

  const hostScheduler = new HostScheduler()

  const hostSchedulerRequest = new HostSchedulerRequest()
  hostSchedulerRequest.fechaFin = new Date().toISOString()
  hostSchedulerRequest.fechaInicio = new Date().toISOString()
  hostSchedulerRequest.idCustomer = Number(userStore.user.value?.idUser ?? 0)
  console.log('DATOS BUSQUEDA:', hostSchedulerRequest)
  const response = await hostScheduler.execute(hostSchedulerRequest) as HostSchedulerResponse
  console.log('Respuesta del scheduler:', response)
  respuestaScheduler.value = response
  ambientes.value = response.ambients
  reservas.value = response.reservations
  console.log('ambientes:', reservas.value)
})


// Ejemplo de datos de ambientes
/*
const ambientes = ref([
  { idAmbiente: '1', title: 'Suite 101', description: 'La Paz', location: 'Centro' },
  { idAmbiente: '2', title: 'Suite 202', description: 'Santa Cruz', location: 'Norte' },
  { idAmbiente: '3', title: 'Suite 303', description: 'Cochabamba', location: 'Sur' }
])
*/
// Computed property for select box options, including "Todos"
const ambientesOptions = computed(() => [
  { idAmbiente: '0', title: 'Todos', description: '', location: '',idOrder: 0 },
  ...ambientes.value
])

/*
// Ejemplo de reservas
const reservas = ref([
  { idAmbiente: '1', title: 'Suite 101', checkIn: '2025-07-01', checkOut: '2025-07-03', description: 'La Paz' },
  { idAmbiente: '2', title: 'Suite 202', checkIn: '2025-07-02', checkOut: '2025-07-05', description: 'Santa Cruz' },
  { idAmbiente: '3', title: 'Suite 303', checkIn: '2025-07-04', checkOut: '2025-07-06', description: 'Cochabamba' }
])
*/
// Para selección múltiple
//const selectedAmbientes = ref<(number | 0)[]>([])
const selectedAmbientes = ref<string[]>([])
const reservasFiltradas = computed(() => {
  //console.log('selecion ambiente:', reservas.value.filter(r => selectedAmbientes.value.includes(r.idAmbiente)))
 if (
  selectedAmbientes.value.length === 0 ||
  selectedAmbientes.value.includes('0')
) {
  return reservas.value
}
return reservas.value.filter(r => selectedAmbientes.value.includes(r.idAmbiente))
})

// Colores para ambientes
const ambienteColors = ['#8dd3c7', '#ffffb3', '#bebada', '#fad28e', '#80b1d3','#e4f7a6','#b5f5f1','#e5c4f5','#fce3dc']

function getAmbienteColor(idAmbiente: number) {
  //const idx = ambientes.value.findIndex(a => Number(a.idAmbiente) === idAmbiente)
  const idx = idAmbiente - 1
  return ambienteColors[idx % ambienteColors.length]
}

// Adaptar datos para el scheduler
const schedulerData = computed(() =>
  reservasFiltradas.value.map(r => ({
    text: r.title,
    startDate: toIsoOrDate(r.checkIn),
    endDate: toIsoOrDate(r.checkOut),
    ambienteId: r.idAmbiente,
    color: getAmbienteColor(Number(r.idOrder)),
    description: r.location
  }))
)
// Función template para personalizar appointments (reservada para uso futuro)
// function appointmentTemplate1(modelData: AppointmentModelData) {
//   const color = modelData.appointmentData.color
//   const text = modelData.appointmentData.text
//   const div = document.createElement('div')
//   div.style.background = color
//   div.style.color = '#222'
//   div.style.padding = '4px 8px'
//   div.style.borderRadius = '10px'
//   div.style.minWidth = '120px'
//   div.style.textAlign = 'center'
//   div.innerText = text
//   return div
// }
function toIsoOrDate(dateStr: string) {
  // Si ya es ISO, úsalo; si no, intenta convertirlo
  // Ejemplo: "19/9/2025 00:00:00" => "2025-09-19T00:00:00"
  if (!dateStr) return '';
  if (dateStr.includes('T')) return dateStr;
  const [d, m, yAndTime] = dateStr.split('/');
  const [y, time] = yAndTime.split(' ');
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T${time || '00:00:00'}`;
}
function appointmentTemplate(modelData: AppointmentModelData) {
  const color = modelData.appointmentData.color
  const text = modelData.appointmentData.text
  const description = modelData.appointmentData.description

  const wrapper = document.createElement('div');
  wrapper.style.backgroundColor = color || '#999';
  wrapper.style.color = '#222'
  wrapper.style.padding = '4px 8px'
  wrapper.style.borderRadius = '8px';
  wrapper.style.fontSize = '12px';
  wrapper.style.fontWeight = '500';
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.justifyContent = 'space-between';
  wrapper.style.minWidth = '150px';

  const textSpan = document.createElement('span');
  textSpan.innerText = text;

  const ambienteTag = document.createElement('small');
  ambienteTag.innerText = description ? `(${description})` : '';
  ambienteTag.style.opacity = '0.8';
  ambienteTag.style.marginLeft = '8px';
  ambienteTag.style.fontSize = '12px';

  wrapper.appendChild(textSpan);
  wrapper.appendChild(ambienteTag);

  return wrapper;
}

function onAppointmentRendered(e: AppointmentRenderedEvent) {
  const baseColor = e.appointmentData.color || '#999';

  // Generar un color más claro para el degradado
  const lighterColor = hexToRgba(baseColor, 0.2);

  e.appointmentElement.style.background = `linear-gradient(to right, ${baseColor}, ${lighterColor})`;
  e.appointmentElement.style.borderRadius = '6px';
  e.appointmentElement.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.1)';
}

function hexToRgba(hex: string, alpha: number) {
  const match = hex.replace('#', '').match(/.{1,2}/g);
  if (!match) return hex;
  const [r, g, b] = match.map(x => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ambienteItemTemplate(item: AmbienteItem) {
  return `${item.title} (${item.description} - ${item.location})`
}
</script>

<template>

<!-- Sección 1: Encabezado y Filtro -->
<main class="wizzard-container mb-2">
  <header class="position-relative header-wizar">
    <h3 class="wizard-title">Consulta tus Reservas</h3>
    <p class="wizard-subtitle">Revisa todas las reservas en un calendario</p>
    <hr>
  </header>

  <section class="bg-white shadow rounded-lg p-4 search-filter-container">
    <h5 class="mb-3">Lista de Ambientes</h5>
    <DxSelectBox
      :items="ambientesOptions"
      display-expr="title"
      value-expr="idAmbiente"
      v-model:value="selectedAmbientes"
      :search-enabled="true"
      :show-clear-button="true"
      :multiselect="true"
      placeholder="Seleccion de ambientes"
      class="mb-4"
      :item-template="ambienteItemTemplate"
    />
  </section>
</main>

<!-- Sección 2: Calendario de Reservas -->
<main class="wizzard-container">
  <section class="bg-white shadow rounded-lg p-4 search-filter-container">
    <h5 class="mb-3">Calendario de Reservas</h5>
    <!-- Calendario o contenido de reservas -->
   <DxScheduler
      :data-source="schedulerData"
      time-zone="America/La_Paz"
      :views="['month', 'week', 'day']"
      current-view="month"
      :current-date="new Date()"
      :start-day-hour="8"
      :end-day-hour="20"
      :height="900"
      :max-appointments-per-cell="5"
      :appointment-template="appointmentTemplate"
      @appointment-rendered="onAppointmentRendered"
    />
  </section>
  <button @click="console.log(selectedAmbientes)">Ver selección</button>
</main>

</template>

<style scoped>
.card {
  max-width: 900px;
  margin: 2rem auto;
}

</style>
