<template>
  <div class="card mb-2" :class="{ 'card-hover': enableHover }">
    <div class="card-header p-3 pt-2">
      <!-- Icono superior (se ocultará en móvil) -->
      <div class="icon icon-lg icon-shape shadow text-center border-radius-xl mt-n4 position-absolute desktop-icon"
        :class="[
          `bg-gradient-${icon.background}`,
          `shadow-${icon.background}`,
          { 'icon-pulse': enableAnimation }
        ]">
        <i class="material-icons opacity-10" :class="[icon.name, 'mobile-icon']" :style="{ color: icon.color }"
          aria-hidden="true"></i>
      </div>
      <div class="text-end pt-1 mobile-content">
        <!-- Icono izquierdo para móvil -->
        <div class="mobile-icon-container">
          <div class="icon-mobile" :class="[
            `bg-gradient-${icon.background}`,
            `shadow-${icon.background}`
          ]">
            <i class="material-icons opacity-10" :class="[icon.name]" :style="{ color: icon.color }"
              aria-hidden="true"></i>
          </div>
          <div class="mobile-text-container">
            <p class="text-sm mb-0 text-capitalize mobile-text">{{ title.text }}</p>
            <h4 class="mb-0 mobile-title">
              <span class="counter">{{ title.value }}</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <hr class="dark horizontal my-0" />
    <div class="card-footer p-3 mobile-detail">
      <p class="mb-0" v-html="detail"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TitleProps {
  text: string;
  value: string | number;
}

interface IconProps {
  name: string;
  color: string;
  background: string;
}

interface Props {
  title: TitleProps;
  detail: string;
  icon: IconProps;
  enableHover?: boolean;
  enableAnimation?: boolean;
}

withDefaults(defineProps<Props>(), {
  enableHover: true,
  enableAnimation: false
});
</script>

<style scoped>
h1,
.h1,
h2,
.h2,
h3,
.h3,
h4,
.h4 {
  letter-spacing: 0;
}

.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.desktop-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 1rem;
  left: 1rem;
  margin: 0;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.icon-mobile {
  display: none;
}

.card-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  min-height: 2.6em;
  /* Ajusta según tu fuente/tamaño */
  word-break: break-word;
}

/* Estilos para dispositivos móviles */
@media (max-width: 576px) {
  .desktop-icon {
    display: none;
  }

  .card-header {
    padding: 0.5rem !important;
  }

  .mobile-icon-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }

  .icon-mobile {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    background-color: #1B5E20 !important;
    /* Verde muy oscuro para el icono */
    color: #ffffff !important;
  }

  .mobile-text-container {
    flex: 1;
  }

  .mobile-content {
    margin: 0;
    padding: 0 !important;
    width: 100%;
  }

  .mobile-text {
    font-size: 0.7rem;
    margin-bottom: 0.1rem !important;
    text-align: left;
    color: #1B5E20 !important;
    /* Verde muy oscuro para el texto */
  }

  .mobile-title {
    font-size: 0.9rem;
    text-align: left;
    color: #1B5E20 !important;
    /* Verde muy oscuro para el título */
    font-weight: 600;
  }

  .card-footer {
    display: none;
  }

  hr {
    display: none;
  }
}
</style>
