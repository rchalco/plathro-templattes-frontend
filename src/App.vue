<script setup lang="ts">
import deMessages from "devextreme/localization/messages/de.json";

import { locale, loadMessages } from "devextreme/localization";

loadMessages(deMessages);
locale(navigator.language);
</script>

<template>
  <main class="main-content">
    <div class="content-wrapper">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.main-content {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  /* Asegura que ocupe toda la altura de la ventana */
  align-items: stretch;
  /* Asegura que el contenido interno ocupe toda la altura */
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* Fondo elegante y claro */
  box-sizing: border-box;
  margin: 0;
  /* Elimina cualquier margen superior */
}

.content-wrapper {
  width: 100%;
  /* Limita el ancho máximo del contenido */
  padding: 0;
  /* Fondo blanco para el contenido */

  /* Sombra sutil */
  border-radius: 1rem;
  /* Bordes redondeados */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* Permite que el contenido interno se organice verticalmente */
  height: 100%;
  /* Ocupa el 100% del tamaño del contenedor principal */
}
</style>
