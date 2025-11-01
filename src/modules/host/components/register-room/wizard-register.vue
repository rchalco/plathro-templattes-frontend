<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import KindRoom from "./components/kind-room.vue";
import DescriptionRoom from "./components/description-room.vue";
import ServiceOffer from "./components/service-offer.vue";
import AddImages from "./components/add-images.vue";
import UbicationRoom from "./components/ubication-room.vue";
import { useRegisterRoomStore } from "../../store/register-room/RegisterRoomRequestStore";
import RegisterRoom from "../../usecase/register-room/RegisterRoom";
import CustomAlert from "@/components/alerts/CustomAlert.vue";
import AddPost from "./components/add-posts.vue";
import adminAccounts from "./components/admin-accounts.vue";
import RegisterRoomRequest from "../../usecase/register-room/RegisterRoomRequest";


// Inicializa el caso de uso, el store y el router
const router = useRouter();
const useCaseRegisterRoom = new RegisterRoom();
const registerRoomStore = useRegisterRoomStore();

// Estado de alertas y pasos
const isErrorVisible = ref(false);
const errorDetails = ref<string | object>({});
const alertColor = ref("info");
const activeStep = ref(0);
const totalSteps = 7;

// Manejo de alertas
const handleAlertClose = () => {
  isErrorVisible.value = false;
};

// Navegación de pasos
const nextStep = () => {
  if (activeStep.value < totalSteps - 1) {
    activeStep.value += 1;
  }
};

const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value -= 1;
  }
};

// Guardar habitación
const saveRoom = async () => {
  try {
    // juntamos en especificaciones tambien los ambienters
    registerRoomStore.getRegisterRoomData!.especificacionesAmbiente = registerRoomStore.getRegisterRoomData!.especificacionesAmbiente.concat(registerRoomStore.getRegisterRoomData!.serviciosAmbiente);
    const result = await useCaseRegisterRoom.execute(registerRoomStore.getRegisterRoomData!);
    if (result.codRespuesta) {
      isErrorVisible.value = true;
      errorDetails.value = result.logRespuesta || "Ambiente registrado con éxito";
      alertColor.value = "info";

      // Redirigir a /home/buscar después de mostrar el mensaje de éxito
      setTimeout(() => {
        router.push('/home/buscar');
      }, 1500); // Espera 2 segundos para que el usuario vea el mensaje
    } else {
      isErrorVisible.value = true;
      errorDetails.value = result.logRespuesta || "Error al guardar la habitación. Por favor, inténtalo de nuevo más tarde.";
      alertColor.value = "danger";
    }
    registerRoomStore.setRegisterRoomData(new RegisterRoomRequest());
  } catch (e: unknown) {
    isErrorVisible.value = true;
    errorDetails.value = e || "Error al guardar la habitación. Por favor, inténtalo de nuevo más tarde.";
    alertColor.value = "danger";
  }

};

interface StepButton {
  title: string;
  label: string;
  step: number;
  message: string;
}

const stepButtons: StepButton[] = [
  { title: "Tipo de ambiente", label: "Tipo de ambiente", step: 0, message: "Empecemos con lo básico: Selecciona la opción que mejor describa tu espacio" },
  { title: "Descripción", label: "Descripción", step: 1, message: "Cuéntanos sobre tu espacio: ¿Cuántas habitaciones tiene? ¿Cuenta con sala, cocina u otros ambientes?" },
  { title: "Servicios", label: "Servicios", step: 2, message: "¿Qué servicios tiene tu espacio?" },
  { title: "Fotos", label: "Fotos", step: 3, message: "¡Dale vida a tu espacio con imágenes! Marca con la estrella la foto que mejor represente tu ambiente" },
  { title: "Ubicación", label: "Ubicación", step: 4, message: "¿Dónde se encuentra tu espacio? Solo compartiremos la dirección con los huéspedes después de que hayan hecho la reservación." },
  { title: "Mi Banco", label: "Mi Banco", step: 5, message: "¿Dónde quieres que te depositemos?." },
  { title: "Publicar", label: "Publicar", step: 6, message: "Dile a nuestra comunidad como es tu ambiente" }
];
</script>

<template>
  <div>
    <CustomAlert v-if="isErrorVisible" :message="errorDetails" :color="alertColor" icon="bi bi-exclamation-circle"
      :dismissible="true" :duration="5000" @closed="handleAlertClose" />
    <main class="wizzard-container">
      <header class="position-relative header-wizar">
        <p class="wizard-subtitle">{{ stepButtons[activeStep].message }}</p>
        <hr>
        <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
          <nav class="multisteps-form__progress">
            <div class="progress-buttons-container">
              <button v-for="button in stepButtons" :key="button.step" class="progress-btn" :class="{
                'active': activeStep >= button.step,
                'completed': activeStep > button.step
              }" @click="activeStep = button.step" type="button">
                <div class="step-number">{{ button.step + 1 }}</div>
                <span class="step-label">{{ button.label }}</span>
              </button>
            </div>
          </nav>
        </div>
      </header>
      <!-- Contenido principal -->
      <section class="contaner-steps">
        <form class="multisteps-form__form">
          <article class="article-container">
            <KindRoom v-if="activeStep === 0" />
            <DescriptionRoom v-else-if="activeStep === 1" />
            <ServiceOffer v-else-if="activeStep === 2" />
            <AddImages v-else-if="activeStep === 3" />
            <UbicationRoom v-else-if="activeStep === 4" />
            <adminAccounts v-else-if="activeStep === 5" />
            <AddPost v-else-if="activeStep === 6" />
          </article>
        </form>
      </section>
      <!-- Botones de navegación -->
      <footer class="button-row d-flex bg-gradient-success shadow-success border-radius-lg">
        <button class="mb-0 btn bg-success-light js-btn-prev" type="button" title="Anterior" @click="prevStep"
          :disabled="activeStep === 0">
          <i class="bi bi-arrow-left-circle me-2"></i>
          Anterior
        </button>
        <button v-if="activeStep < totalSteps - 1" class="mb-0 btn bg-success js-btn-next" type="button"
          title="Siguiente" @click="nextStep">
          Siguiente
          <i class="bi bi-arrow-right-circle ms-2"></i>
        </button>
        <button v-else class="mb-0 btn bg-success save-button js-btn-next" type="button" title="Guardar"
          @click="saveRoom">
          Guardar
          <i class="bi bi-check-circle ms-2"></i>
        </button>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.save-button {
  background-color: #054d37 !important;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.contaner-steps {
  flex: 1;
  width: 100%;
  background: transparent;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(to right, #20c997, #66bb6a);
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  margin-top: auto;
}

.multisteps-form__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.multisteps-form__form article {
  width: 100%;
  display: flex;
  justify-content: center;
}

.multisteps-form__progress {
  width: 100%;
  padding: 0 1rem;
}

.progress-buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

.progress-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  flex: 1;
  min-width: 80px;
  transition: all 0.3s ease;
}

.progress-btn::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  bottom: 0;
  left: 50%;
  transition: all 0.3s ease;
}

.progress-btn.active,
.progress-btn.completed {
  color: white;
}

.progress-btn.active::after,
.progress-btn.completed::after {
  background: white;
  width: 100%;
  left: 0;
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.progress-btn.active .step-number,
.progress-btn.completed .step-number {
  background: white;
  color: #66bb6a;
}

.step-label {
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

@media (max-width: 768px) {
  .progress-buttons-container {
    gap: 0.25rem;
  }

  .progress-btn {
    min-width: unset;
    padding: 0.25rem;
  }

  .step-number {
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }

  .step-label {
    display: none;
  }

  .header-wizar {
    margin-top: 10px;
  }
}

.wizard-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5em;
  text-align: center;
}

@media (max-width: 600px) {
  .wizard-title {
    font-size: 1.2rem;
    margin-bottom: 0.3em;
    line-height: 1.1;
    padding: 0 0.5em;
  }
}

.wizard-subtitle {
  cursor: pointer;
  transition: all 0.3s ease;
  color: #426143;
}

.wizard-subtitle:hover {
  color: #265027;
}

@media (max-width: 576px) {
  .contaner-steps {
    padding: 0.5rem;
  }
}
</style>
