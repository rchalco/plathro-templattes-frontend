<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import FindAmbientsRequest from '@/modules/host/usecase/find-ambients/FindAmbientsRequest';
import FindAmbients from '@/modules/host/usecase/find-ambients/FindAmbients';
import type { FindAmbientsResponse } from '@/modules/host/usecase/find-ambients/FindAmbientsResponse';
import { FindAmbientsResponseStore } from '@/modules/host/store/find-ambients/FindAmbientsResponseStore';
import { SearchFilterResponseStore } from '@/modules/host/store/find-ambients/SearchFilterResponseStore';
import { CitiesStore } from '@/modules/host/store/cities/CitiesStore';
import { DxDateBox } from 'devextreme-vue/date-box'

const searchTerm = ref('');
const checkIn = ref('');
const checkOut = ref('');
const showSuggestions = ref(false);
const selectedIndex = ref(-1);

const findAmbients = new FindAmbients();
const errorDetails = ref<object | string>({});
const isErrorVisible = ref(false);

// Cities store
const citiesStore = CitiesStore();

// Computed property for filtered cities
const filteredCities = computed(() => {
  return citiesStore.filterCities(searchTerm.value);
});

// Methods for autocomplete functionality
const onInputFocus = () => {
  showSuggestions.value = true;
  selectedIndex.value = -1;
};

const onInputBlur = () => {
  // Delay hiding suggestions to allow click selection
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};

const selectCity = (city: string) => {
  searchTerm.value = city;
  showSuggestions.value = false;
  selectedIndex.value = -1;
};

const onKeyDown = (event: KeyboardEvent) => {
  const suggestions = filteredCities.value;

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    selectedIndex.value = Math.min(selectedIndex.value + 1, suggestions.length - 1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    selectedIndex.value = Math.max(selectedIndex.value - 1, -1);
  } else if (event.key === 'Enter' && selectedIndex.value >= 0) {
    event.preventDefault();
    selectCity(suggestions[selectedIndex.value].city);
  } else if (event.key === 'Escape') {
    showSuggestions.value = false;
    selectedIndex.value = -1;
  }
};

const buscar = async () => {
  try {
    const findAmbientsStore = FindAmbientsResponseStore();
    findAmbientsStore.clearAmbients();// Limpiar la lista de ambients antes de buscar nuevos
    const findAmbientsRequest = new FindAmbientsRequest();
    findAmbientsRequest.checkIn = new Date(checkIn.value).toISOString();
    findAmbientsRequest.checkOut = new Date(checkOut.value).toISOString();
    findAmbientsRequest.location = searchTerm.value;
    findAmbientsRequest.adults = 2; // Aquí puedes ajustar el número de adultos según tu lógica
    findAmbientsRequest.childrens = 1; // Aquí puedes ajustar el número de niños según tu lógica
    findAmbientsRequest.rooms = 1; // Aquí puedes ajustar el número de habitaciones según tu lógica
    const response = await findAmbients.execute(findAmbientsRequest) as FindAmbientsResponse;
    ///Seteamos todos los ambiente
    findAmbientsStore.setAmbients(response!); // Para setear
    ///Setamos los filtros de busqueda
    const searchFilterStore = SearchFilterResponseStore();
    searchFilterStore.setFilter(findAmbientsRequest);

  } catch (error: unknown) {
    console.error("Error during login:", error);
    errorDetails.value = error || "Error inesperado. Por favor, inténtelo de nuevo más tarde.";
    isErrorVisible.value = true;
  }


};

</script>

<template>
  <section class="bg-white shadow rounded-lg p-4 search-filter-container">
    <form class="flex flex-wrap items-center gap-3" @submit.prevent="buscar" autocomplete="off" role="search">
      <fieldset class="border-0 w-full d-flex search-filter-fieldset">
        <!-- <div class="search-filter-item flex-col">
          <label for="guests" class="search-filter-label mb-1">Huéspedes</label>
          <GuestPopover id="guests" />
        </div> -->
        <div class="search-filter-item flex-col">
          <label for="searchTerm" class="search-filter-label mb-1">Destino</label>
          <div class="autocomplete-container">
            <input id="searchTerm" v-model="searchTerm" type="text" placeholder="¿Dónde te gustaría ir?"
              class="border px-2 py-1 rounded w-100 min-w-0 flex-shrink-0 autocomplete-input" @focus="onInputFocus"
              @blur="onInputBlur" @keydown="onKeyDown" required />

            <!-- Suggestions dropdown -->
            <div v-if="showSuggestions && filteredCities.length > 0" class="suggestions-dropdown">
              <div v-for="(city, index) in filteredCities.slice(0, 8)" :key="city.city"
                :class="['suggestion-item', { 'selected': index === selectedIndex }]" @click="selectCity(city.city)"
                @mouseenter="selectedIndex = index">
                <i class="bi bi-geo-alt-fill me-2 text-muted"></i>
                {{ city.city }}
              </div>
            </div>
          </div>
        </div>
        <div class="search-filter-item flex-col">
          <label for="checkIn" class="search-filter-label mb-1">Check-in</label>
          <DxDateBox v-model:value="checkIn" type="date" display-format="yyyy-MM-dd" :min="new Date()"
            class="w-100 min-w-0 flex-shrink-0" :input-attr="{ id: 'checkIn', required: true }" />
        </div>
        <div class="search-filter-item flex-col">
          <label for="checkOut" class="search-filter-label mb-1">Check-out</label>
          <DxDateBox v-model:value="checkOut" type="date" display-format="yyyy-MM-dd" :min="checkIn || new Date()"
            class="w-100 min-w-0 flex-shrink-0" :input-attr="{ id: 'checkOut', required: true }" />
        </div>
      </fieldset>
      <hr>
      <div class="search-btn-row">
        <button type="submit" class="mb-0 btn js-btn-next search-btn-aligned">
          <i class="bi bi-search me-2"></i>
          Buscar
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.search-filter-container {
  border-radius: 1rem;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #ffffff 0%, #f8fffe 100%);
  border: 1px solid rgba(20, 83, 45, 0.1);
}

.search-filter-fieldset {
  display: flex;
  width: 100%;
  gap: 15px;
  padding: 0;
  margin: 0;
  border: 0;
}

.search-filter-item {
  flex: 1 1 0;
  max-width: 25%;
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.flex-col {
  flex-direction: column;
}

.search-filter-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #14532d;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.search-filter-item>* {
  width: 100%;
}

.search-filter-item input,
.autocomplete-input {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-filter-item input:focus,
.autocomplete-input:focus {
  outline: none;
  border-color: #14532d;
  box-shadow: 0 0 0 3px rgba(20, 83, 45, 0.1);
  transform: translateY(-1px);
}

/* Autocomplete specific styles */
.autocomplete-container {
  position: relative;
  width: 100%;
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 0.75rem 0.75rem;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.suggestion-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  border-bottom: 1px solid #f3f4f6;
}

.suggestion-item:hover,
.suggestion-item.selected {
  background-color: #f0fdf4;
  color: #14532d;
}

.suggestion-item:last-child {
  border-bottom: none;
}

/* Date picker styling */
.search-filter-item :deep(.dx-texteditor) {
  border-radius: 0.75rem;
  border: 2px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.search-filter-item :deep(.dx-texteditor:focus-within),
.search-filter-item :deep(.dx-texteditor.dx-state-focused) {
  border-color: #14532d;
  box-shadow: 0 0 0 3px rgba(20, 83, 45, 0.1);
}

.search-filter-item :deep(.dx-texteditor-input) {
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
}

/* Button styling */
.search-btn-row {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  text-align: left;
}

.search-btn-aligned {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  border: none;
  background: linear-gradient(135deg, #14532d 0%, #16a34a 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(20, 83, 45, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.search-btn-aligned:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(20, 83, 45, 0.4);
  background: linear-gradient(135deg, #16a34a 0%, #14532d 100%);
}

.search-btn-aligned:active {
  transform: translateY(0);
}

/* Responsive: 2 filas de 2 columnas en móviles */
@media (max-width: 600px) {
  .search-filter-fieldset {
    flex-wrap: wrap;
    gap: 10px;
  }

  .search-filter-item {
    max-width: 48%;
    flex-basis: 48%;
    margin-bottom: 0;
  }

  .search-btn-row {
    justify-content: center;
    margin-top: 20px;
  }

  .search-filter-label {
    font-size: 0.85rem;
    margin-bottom: 4px;
  }

  .search-filter-item input,
  .autocomplete-input {
    font-size: 0.9rem;
    padding: 0.6rem 0.8rem;
  }

  .search-filter-item :deep(.dx-texteditor-input) {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }

  .search-btn-aligned {
    font-size: 0.9rem;
    padding: 0.6rem 1.5rem;
  }
}

/* Custom scrollbar for suggestions */
.suggestions-dropdown::-webkit-scrollbar {
  width: 6px;
}

.suggestions-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.suggestions-dropdown::-webkit-scrollbar-thumb {
  background: #14532d;
  border-radius: 3px;
}

.suggestions-dropdown::-webkit-scrollbar-thumb:hover {
  background: #16a34a;
}
</style>
