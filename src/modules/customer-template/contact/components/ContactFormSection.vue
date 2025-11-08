<template>
  <div class="contact-section gray-bg">
    <div class="base-container-13 w-container">
      <div class="contacts-wrapper">
        <div class="contacts-content-wrapper">
          <p data-w-id="a386ccef-9255-4478-012e-be0fef58796e" class="contacts-paragraph">
            <EditableText page-name="contact" component-name="contact-info" element-id="intro-text"
              default-value="We're committed to clear communication, fast responses, and personalized support every step of the way."
              tag="span" :rows="2" />
          </p>
          <div data-w-id="a386ccef-9255-4478-012e-be0fef587970" class="contacts-divider"></div>
          <div class="contacts-detail-wrapper">
            <div class="contacts-detail">
              <img loading="lazy" height="30" alt="" :src="mailboxIcon" class="image-contact">
              <a href="https://maps.app.goo.gl/yKnDGpDdmRtD8CAcA" target="_blank" class="paragraph-no-margin">
                <EditableText page-name="contact" component-name="contact-info" element-id="address"
                  default-value="404 St. George St. PO Box 28048 - Moncton, NB Canada E1C 9N4" tag="span" :rows="2" />
              </a>
            </div>
            <div class="contacts-detail">
              <img loading="lazy" height="25" alt="" :src="emailIcon" class="image-email">
              <a href="mailto:contact@team.platheo.com" class="paragraph-no-margin">
                <EditableText page-name="contact" component-name="contact-info" element-id="email"
                  default-value="contact@team.platheo.com" tag="span" :rows="1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Calendario al final, abajo -->
      <div data-w-id="a386ccef-9255-4478-012e-be0fef587980" class="contacts-form-wrapper calendar-bottom">
        <div class="form-block-contacts w-form">
          <form id="email-form" name="email-form" data-name="Email Form" method="get" class="form-contacts"
            data-wf-page-id="68da806fa789a27555f8540d" data-wf-element-id="a386ccef-9255-4478-012e-be0fef587982">

            <!-- Editor de URL del calendario (solo en modo edición) -->
            <div v-if="isEditMode" class="calendar-url-editor">
              <label for="calendar-url" class="calendar-label">
                <strong>Calendar URL</strong> (Google Calendar, Calendly, Cal.com, etc.)
              </label>
              <input id="calendar-url" v-model="localCalendarUrl" @blur="saveCalendarUrl" type="url"
                placeholder="https://calendar.google.com/calendar/appointments/..." class="calendar-url-input" />
              <p class="calendar-hint">
                Soporta: Google Calendar Appointments, Calendly, Cal.com, SimplyBook.me
              </p>
            </div>

            <div class="w-embed w-iframe">
              <iframe :src="displayCalendarUrl" style="border: 0" width="100%" height="650" frameborder="0"
                scrolling="no" :title="isEditMode ? 'Preview: ' + displayCalendarUrl : 'Book an appointment'">
              </iframe>
            </div>
          </form>
          <div class="success-message-2 w-form-done">
            <div>Thank you! Your submission has been received!</div>
          </div>
          <div class="error-message-2 w-form-fail">
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTemplateEditorStore } from '@/stores/templateEditorStore'
import { TemplateContentService } from '@/services/templateContentService'
import EditableText from '@/components/EditableText.vue'

const mailboxIcon = new URL('../../../../assets/images/mailbox.svg', import.meta.url).href
const emailIcon = new URL('../../../../assets/images/e-mail.svg', import.meta.url).href

// Editor store for edit mode
const editorStore = useTemplateEditorStore()
const { isEditMode } = storeToRefs(editorStore)

// Default calendar URL
const DEFAULT_CALENDAR_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1Gglp3wNCzN0FjChqtmF-X8kuCJvUIk5jhqolkEh-sNJAuIhiQcJlM8lhfg4p77-nd7W8YhgfV?gv=true'

// Local calendar URL state
const localCalendarUrl = ref('')

// Load calendar URL from storage
const loadCalendarUrl = () => {
  localCalendarUrl.value = TemplateContentService.getElementValue(
    'contact',
    'calendar',
    'calendar-url',
    DEFAULT_CALENDAR_URL,
    'text'
  )
}

// Initial load
loadCalendarUrl()

// Watch for changes
watch([() => 'contact', () => 'calendar', () => 'calendar-url'], () => {
  loadCalendarUrl()
})

// Display URL (fallback to default if empty)
const displayCalendarUrl = computed(() => {
  return localCalendarUrl.value || DEFAULT_CALENDAR_URL
})

// Save calendar URL
const saveCalendarUrl = () => {
  if (localCalendarUrl.value) {
    TemplateContentService.setElementValue(
      'contact',
      'calendar',
      'calendar-url',
      localCalendarUrl.value,
      'text'
    )
  }
}
</script>

<style scoped>
/* Calendario al final, ancho completo */
.calendar-bottom {
  width: 100%;
  max-width: 100%;
  margin-top: 40px;
}

/* Editor de URL del calendario */
.calendar-url-editor {
  background-color: #f0f9ff;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.calendar-label {
  display: block;
  margin-bottom: 8px;
  color: #1e40af;
  font-size: 14px;
}

.calendar-url-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #93c5fd;
  border-radius: 6px;
  font-size: 14px;
  font-family: monospace;
  background-color: white;
  transition: border-color 0.2s;
}

.calendar-url-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.calendar-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 0;
}

/* Iframe sin scroll interno */
.calendar-bottom iframe {
  display: block;
  width: 100%;
  min-height: 600px;
  height: auto;
  overflow: hidden;
}

/* Wrapper de contactos - solo para la info, no para el calendario */
.contacts-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Responsive: más altura en desktop */
@media screen and (min-width: 768px) {
  .calendar-bottom iframe {
    min-height: 700px;
  }
}

@media screen and (min-width: 1024px) {
  .calendar-bottom iframe {
    min-height: 800px;
  }

  .calendar-bottom {
    margin-top: 60px;
  }
}
</style>
