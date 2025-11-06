<template>
  <section class="home-section-message">
    <div class="home-message-container">
      <div class="home-message-wrapper">
        <div class="w-layout-blockcontainer home-message-content w-container width-container">
          <EditableText page-name="home" component-name="home-message" element-id="home-message-first-part"
            default-value="Service as a software company with a daily consumption billing model so you can activate
            or deactivate per feature according to your needs. Our dedicate development team will work to accommodate
            our state of the art integrated solutions so you can have a tech partner for your success." tag="span"
            class-name="text-box width-container" :rows="3" />
          <br>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
</script>
<style scoped>
.width-container {
  width: 100%;
  margin: 0 auto;
}
</style>
