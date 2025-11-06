<template>
  <div class="contact-section gray-bg">
    <div class="base-container-13 w-container">
      <div class="contacts-wrapper">
        <div class="contacts-content-wrapper">
          <p data-w-id="a386ccef-9255-4478-012e-be0fef58796e" style="opacity:0" class="contacts-paragraph">
            <EditableText 
              page-name="contact" 
              component-name="contact-info" 
              element-id="intro-text"
              default-value="We're committed to clear communication, fast responses, and personalized support every step of the way." 
              tag="span"
              :rows="2" 
            />
          </p>
          <div data-w-id="a386ccef-9255-4478-012e-be0fef587970" style="opacity:0" class="contacts-divider"></div>
          <div class="contacts-detail-wrapper">
            <div class="contacts-detail">
              <img loading="lazy" height="30" alt="" :src="mailboxIcon" class="image-contact">
              <a href="https://maps.app.goo.gl/yKnDGpDdmRtD8CAcA" target="_blank" class="paragraph-no-margin">
                <EditableText 
                  page-name="contact" 
                  component-name="contact-info" 
                  element-id="address"
                  default-value="404 St. George St. PO Box 28048 - Moncton, NB Canada E1C 9N4" 
                  tag="span"
                  :rows="2" 
                />
              </a>
            </div>
            <div class="contacts-detail">
              <img loading="lazy" height="25" alt="" :src="emailIcon" class="image-email">
              <a href="mailto:contact@team.platheo.com" class="paragraph-no-margin">
                <EditableText 
                  page-name="contact" 
                  component-name="contact-info" 
                  element-id="email"
                  default-value="contact@team.platheo.com" 
                  tag="span"
                  :rows="1" 
                />
              </a>
            </div>
          </div>
        </div>
        <div data-w-id="a386ccef-9255-4478-012e-be0fef587980" style="opacity:0" class="contacts-form-wrapper">
          <div class="form-block-contacts w-form">
            <form id="email-form" name="email-form" data-name="Email Form" method="get" class="form-contacts"
              data-wf-page-id="68da806fa789a27555f8540d" data-wf-element-id="a386ccef-9255-4478-012e-be0fef587982">
              <div class="w-embed w-iframe">
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1Gglp3wNCzN0FjChqtmF-X8kuCJvUIk5jhqolkEh-sNJAuIhiQcJlM8lhfg4p77-nd7W8YhgfV?gv=true"
                  style="border: 0" width="100%" height="400" frameborder="0"></iframe>
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
  </div>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'

const mailboxIcon = new URL('../../../../assets/images/mailbox.svg', import.meta.url).href
const emailIcon = new URL('../../../../assets/images/e-mail.svg', import.meta.url).href
</script>

<style scoped>
</style>
