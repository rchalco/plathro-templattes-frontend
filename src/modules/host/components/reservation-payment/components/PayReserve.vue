<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { DxTextBox } from 'devextreme-vue/text-box'
import { DxLoadPanel } from 'devextreme-vue/load-panel'

import { SearchFilterResponseStore } from '@/modules/host/store/find-ambients/SearchFilterResponseStore';
import { FindAmbientCompleteResponseStore } from '@/modules/host/store/find-ambients/FindAmbientCompleteResponseStore';
import PayReserve from '@/modules/host/usecase/pay-reserve-ambient/PayReserve';
import PayReserveRequest from '@/modules/host/usecase/pay-reserve-ambient/PayReserveRequest';
import type { PayReserveResponse } from '@/modules/host/usecase/pay-reserve-ambient/PayReserveResponse';
import { StepFindAmbientsStore } from '@/modules/host/store/find-ambients/StepFindAmbientsStore';
import jsPDF from 'jspdf';
import { useUserStore } from '@/modules/security/store/userStore';

const userStore = useUserStore()
const findAmbientsStore = FindAmbientCompleteResponseStore();
const ambientSelected = findAmbientsStore.getAmbient();
const searchFilterStore = SearchFilterResponseStore()
const filterAmbientsRequest = searchFilterStore.getFilter();

const cardNumber = ref('')
const dayStay = getStayNights(filterAmbientsRequest?.checkIn, filterAmbientsRequest?.checkOut);
const AmmountTotal = (ambientSelected?.price ?? 0) * (dayStay ?? 0) // Bs.
const loading = ref(false)
const showSuccessModal = ref(false)

// Initialize the store and load user data
onMounted(async () => {
  await userStore.init()
})

//SERVICIO DE PAGO
const payReserve = new PayReserve();
const storeStepe = StepFindAmbientsStore();
//
// Ejemplo de datos, reemplaza por tus props o store
const resumen = {
  nroReserva: '123456',
  fechaActual: new Date().toLocaleDateString(),
  checkIn: filterAmbientsRequest?.checkIn ? filterAmbientsRequest.checkIn.split("T")[0] : '',
  checkOut: filterAmbientsRequest?.checkOut ? filterAmbientsRequest.checkOut.split("T")[0] : '',
  zone: ambientSelected?.zona,
  city: ambientSelected?.city,
  address: ambientSelected?.addressMap,
  days: dayStay,
  amountDay: ambientSelected?.price,
  amount: AmmountTotal, // Bs.
  nameAmbient: ambientSelected?.nombreAmbiente,
  detail: 'Habitaciones(cant.) ' + filterAmbientsRequest?.rooms +
    ', Total adultos ' + filterAmbientsRequest?.adults +
    ', niños ' + filterAmbientsRequest?.childrens,
}
function getStayNights(checkIn?: string, checkOut?: string): number {
  if (!checkIn || !checkOut) return 0;
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) return 0;
  const diffMs = outDate.getTime() - inDate.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

async function PaymentReserve() {
  loading.value = true

  setTimeout(async () => {
    const payReserveRequest = new PayReserveRequest()
    payReserveRequest.checkIn = resumen.checkIn;
    payReserveRequest.checkOut = resumen.checkOut;
    payReserveRequest.idAmbiente = ambientSelected?.idAmbiente ?? 0;
    payReserveRequest.creditCardNumber = cardNumber.value;
    payReserveRequest.amountPayment = AmmountTotal;
    payReserveRequest.idPersona = Number(userStore.user.value?.idUser ?? 0);
    payReserveRequest.observation = "Completando pago de reserva";
    console.log('DATOS RESERVAYYYYY',payReserveRequest)
    const response = await payReserve.execute(payReserveRequest) as PayReserveResponse
    console.log(response)
    loading.value = false
    showSuccessModal.value = true // Mostrar el modal de éxito
    // emit('go-list') // Si quieres navegar después
  }, 2000)
}

const goBack = () => {
  storeStepe.setStepByIdStepWithCard('detalles-ambiente', storeStepe.getStep()!.currentCard!);
}

// Función para generar el PDF
function descargarPDF() {
  console.log('Descargando PDF con resumen:', resumen)
  const r = resumen;
  const doc = new jsPDF();

  // === Encabezado ===
  doc.setFillColor(41, 128, 185);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text("Comprobante de Reserva", 105, 20, { align: "center" });

  // === Datos empresa ===
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.text("Mi Empresa S.A.", 20, 40);
  doc.text("www.miempresa.com", 20, 45);
  doc.text("info@miempresa.com", 20, 50);

  // === Recuadro datos ===
  doc.setDrawColor(200, 200, 200);
  doc.rect(20, 60, 170, 110);

  let y = 75;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Número de reserva: ${r.nroReserva}`, 25, y); y += 10;
  doc.text(`Fecha Actual: ${r.fechaActual}`, 25, y); y += 10;
  doc.text(`Ciudad: ${r.city}`, 25, y); y += 10;
  doc.text(`Zona: ${r.zone}`, 25, y); y += 10;
  doc.text(`Dirección: ${r.address}`, 25, y); y += 10;
  doc.text(`Ambiente: ${r.nameAmbient}`, 25, y); y += 10;
  doc.text(`Detalle: ${r.detail}`, 25, y); y += 10;
  doc.text(`Llegada: ${r.checkIn}`, 25, y); y += 10;
  doc.text(`Salida: ${r.checkOut}`, 25, y); y += 10;
  doc.text(`Total Días: ${r.days}`, 25, y);
  doc.text(`Costo por Día: $${r.amountDay}`, 110, y); y += 10;
  doc.text(`Total a Pagar: $${r.amount}`, 25, y);

  // === Footer ===
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Gracias por su reserva. Este comprobante es válido sin firma.",
    105,
    285,
    { align: "center" }
  );

  // Descargar PDF
  doc.save(`Comprobante_${r.nroReserva}.pdf`);
}

function cerrarModal() {
  showSuccessModal.value = false
  storeStepe.initStep();
}
</script>

<template>
  <section class="pay-reserve-section card">
    <div class="card-body p-2 p-md-4">
      <div class="pay-reserve-flex">
        <!-- Forma de pago -->
        <div class="pay-form-container">
          <h4 class="mb-3 text-center text-lg-start">Forma de Pago</h4>
          <form>
            <div class="card card-body border border-radius-lg mb-3 mx-auto pay-form-inner">
              <div class="d-flex align-items-center mb-3" style="width: 100%;">
                <img class="me-3 mb-0" src="@/assets/img/logos/mastercard.png" alt="Mastercard"
                  style="width: 40px; height: 28px;" />
                <img class="mb-0" src="@/assets/img/logos/visa.png" alt="Visa" style="width: 40px; height: 28px;" />
              </div>
              <div class="d-flex align-items-center mb-3" style="width: 100%;">
                <DxTextBox mask="0000 0000 0000 0000" placeholder="0000 0000 0000 0000" mask-char=" "
                  :input-attr="{ inputmode: 'numeric' }" label="Número de tarjeta" label-mode="floating"
                  :max-length="16" :show-clear-button="true" v-model:value="cardNumber" class="flex-grow-1" />
              </div>
              <div class="datos-tarjeta-row mt-2">
                <DxTextBox mask="00/00" placeholder="MM/AA" mask-char=" " :input-attr="{ inputmode: 'numeric' }"
                  label="Vencimiento" label-mode="floating" :max-length="5" :show-clear-button="true"
                  class="flex-grow-1" />
                <DxTextBox mask="000" placeholder="CVV" mask-char=" " :input-attr="{ inputmode: 'numeric' }" label="CVV"
                  label-mode="floating" :max-length="5" :show-clear-button="true" class="flex-grow-1" />
              </div>
              <div class="datos-tarjeta-row mt-2" style="width: 100%;">
                <DxTextBox placeholder="Nombre en la tarjeta" :input-attr="{ inputmode: 'Full Name' }"
                  label="Nombre Completo" label-mode="floating" :max-length="50" :show-clear-button="true"
                  class="flex-grow-1" />
              </div>
              <div class="datos-tarjeta-row mt-2" style="width: 100%;">
                <DxTextBox placeholder="Dirección" :input-attr="{ inputmode: 'Full Name' }" label="Dirección"
                  label-mode="floating" :max-length="150" :show-clear-button="true" class="flex-grow-1" />
              </div>
            </div>
          </form>
        </div>
        <!-- Resumen de la reserva -->
        <div class="pay-summary-container">
          <h4 class="mb-3 text-center text-lg-start">Resumen de la Reserva</h4>
          <div class="card p-3 w-100 h-100 resumen-card">
            <ul class="list-unstyled mb-0">
              <li><strong>Ciudad:</strong> {{ resumen.city }}</li>
              <li><strong>Zona:</strong> {{ resumen.zone }}</li>
              <li><strong>Dirección:</strong> {{ resumen.address }}</li>
              <li><strong>Ambiente:</strong> {{ resumen.nameAmbient }}</li>
              <li><strong>Detalle:</strong> {{ resumen.detail }}</li>
              <li><strong>Llegada:</strong> {{ resumen.checkIn }}</li>
              <li><strong>Salida:</strong> {{ resumen.checkOut }}</li>
              <li><strong>Total Días:</strong> {{ resumen.days }} <strong>Costo por Día:</strong> <i class="bi bi-currency-dollar me-1"></i>{{ resumen.amountDay }}  </li>
              <li><strong>Total a Pagar:</strong> <i class="bi bi-currency-dollar me-1"></i>{{ AmmountTotal }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <footer
      class="card-footer custom-footer d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 p-2 p-md-4 rounded-lg">
      <div class="footer-btn-group d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
        <button class="btn btn-secondary d-flex align-items-center gap-2 flex-grow-1 flex-sm-grow-0" type="button"
          name="volver" @click="goBack">
          <i class="bi bi-arrow-left"></i>
          <span>Volver</span>
        </button>
        <button class="btn btn-success d-flex align-items-center gap-2 flex-grow-1 flex-sm-grow-0" type="button"
          name="reservar" @click="PaymentReserve">
          <i class="bi bi-calendar-check"></i>
          <span>Realizar Pago</span>
        </button>
      </div>
      <span class="footer-contact text-muted mb-2 mb-md-0 span-dudas">¿Tienes dudas? <a href="#">Contáctanos</a></span>
    </footer>
    <!-- Modal de pago con éxito -->
    <div v-if="showSuccessModal">
      <DxLoadPanel :visible="loading" :show-indicator="true" :show-pane="true" message="Procesando pago..." />
      <div class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-center">
            <div class="modal-header border-0">
              <h5 class="modal-title w-100">¡Pago exitoso!</h5>
            </div>
            <div class="modal-body">
              <img src="@/assets/img/logos/pdf.png" alt="PDF" style="width:80px;" class="mb-3" />
              <p>Tu pago se realizó correctamente.</p>
              <button class="btn btn-outline-primary" @click="descargarPDF">
                <i class="bi bi-file-earmark-pdf me-2"></i> Descargar comprobante PDF
              </button>
            </div>
            <div class="modal-footer border-0">
              <button class="btn btn-success w-100" @click="cerrarModal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pay-reserve-section {
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 1rem;
  background: #fff;
}

.pay-reserve-flex {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.pay-form-container,
.pay-summary-container {
  width: 100%;
}

.pay-form-inner {
  max-width: 600px;
}

.resumen-card {
  min-width: 220px;
  max-width: 350px;
  margin: 0 auto;
}

@media (min-width: 992px) {
  .pay-reserve-flex {
    flex-direction: row;
    align-items: flex-start;
    gap: 2.5rem;
  }

  .pay-form-container {
    width: 60%;
  }

  .pay-summary-container {
    width: 40%;
    min-width: 320px;
    max-width: 400px;
  }

  .resumen-card {
    max-width: 100%;
    min-width: 0;
    margin: 0;
  }
}

@media (max-width: 991px) {
  .pay-reserve-section {
    padding: 0.5rem !important;
  }

  .pay-reserve-flex {
    flex-direction: column;
    gap: 1.5rem;
  }

  .pay-form-inner {
    max-width: 100vw;
  }

  .resumen-card {
    max-width: 100vw;
    min-width: 0;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
  }

  .card {
    padding: 0.5rem !important;
  }

  footer .d-flex.flex-column.flex-sm-row {
    flex-direction: row !important;
    gap: 0.5rem;
    width: 100%;
  }

  footer .btn,
  footer .btn+.btn {
    width: 100%;
    font-size: 0.95rem;
    margin-bottom: 0;
    padding: 0.45rem 0.5rem;
  }
}

.datos-tarjeta-row {
  width: 100%;
  display: flex;
  gap: 0.5rem;
}

.datos-tarjeta-row .dx-textbox {
  flex: 1 1 0;
  min-width: 0;
}

/* Modal personalizado para éxito de pago */
.modal.fade.show.d-block {
  display: flex !important;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}

@media (max-width: 600px) {
  .modal-dialog {
    margin: 0;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    border-radius: 0.7rem;
    width: 95vw;
    min-height: 320px;
  }
}
</style>
