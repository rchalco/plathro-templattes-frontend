<template>
  <footer class="site-section-footer">
    <div class="site-footer-container">
      <div class="site-footer-wrapper">
        <a href="index.html" aria-current="page" class="site-navbar-brand w-nav-brand w--current"><img loading="lazy"
            alt="" src="../assets/images/platheo-logo-footer.png" class="brand-image-footer"></a>
        <div class="site-footer-content">
          <div id="w-node-_9dde8abc-c8ac-ce02-b73d-8061610d4668-610d4660" class="site-footer-block">
            <div class="title-small">OVERVIEW</div>
            <router-link to="/team" class="footer-link">Team</router-link>
            <router-link to="/about" class="footer-link">About us</router-link>
            <router-link to="/contact" class="footer-link">Contact us</router-link>
          </div>
          <div id="w-node-_9dde8abc-c8ac-ce02-b73d-8061610d4673-610d4660" class="site-footer-block">
            <div class="title-small">SERVICES</div>
            <router-link to="/services" class="footer-link">Corporate Site</router-link>
          </div>
          <div id="w-node-_9dde8abc-c8ac-ce02-b73d-8061610d4680-610d4660" class="site-footer-block">
            <div class="title-small">Mail Address</div>
            <div class="address-section">
              <EditableText page-name="shared" component-name="footer" element-id="company-address"
                default-value="404 St. George St. PO Box 28048 Moncton, NB Canada E1C 9N4" tag="p"
                class-name="footer-link" :rows="3" />
            </div>
          </div>
          <div id="w-node-_9dde8abc-c8ac-ce02-b73d-8061610d4689-610d4660" class="site-footer-block">
            <div class="title-small">legal</div>
            <router-link to="/terms" class="footer-link">Terms & Conditions</router-link>
            <router-link to="/privacy" class="footer-link">Privacy policy</router-link>
            <div class="footer-social-block">
              <router-link to="#" class="footer-social-link w-inline-block"><img loading="lazy" height="22" alt=""
                  src="/src/assets/images/yt.svg" class="image-20"></router-link>
              <router-link to="#" class="footer-social-link w-inline-block"><img loading="lazy" height="20" alt=""
                  src="/src/assets/images/fb.svg" class="image-21"></router-link>
              <router-link to="#" class="footer-social-link w-inline-block"><img loading="lazy" height="20" alt=""
                  src="/src/assets/images/insta.svg" class="image-19"></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-divider"></div>
    <div class="site-footer-copyright-center">Copyright © 2025 Platheo</div>

  </footer>
</template>

<script setup lang="ts">
import EditableText from './EditableText.vue'
</script>
<style scoped>
.brand-image-footer {
  max-width: 100px !important;
  margin-top: 15%;
  margin-left: 2px;
  margin-right: 100px;
}
</style>
