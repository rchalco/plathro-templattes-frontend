<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>
            <EditableText
              page-name="shared"
              component-name="footer"
              element-id="company-title"
              default-value="Company Name"
              tag="span"
              :rows="1"
            />
          </h3>
          <EditableText
            page-name="shared"
            component-name="footer"
            element-id="company-description"
            default-value="Building amazing solutions for our customers."
            tag="p"
            class-name="footer-text"
            :rows="3"
          />
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/team">Team</router-link></li>
            <li><router-link to="/customers">Customers</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Contact</h4>
          <ul class="footer-links">
            <li><router-link to="/contact">Contact Us</router-link></li>
            <li><router-link to="/services">Services</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Follow Us</h4>
          <div class="social-links">
            <EditableText
              page-name="shared"
              component-name="footer"
              element-id="social-info"
              default-value="Connect with us on social media"
              tag="p"
              class-name="footer-text"
              :rows="2"
            />
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <EditableText
          page-name="shared"
          component-name="footer"
          element-id="copyright"
          default-value="© 2025 Company Name. All rights reserved."
          tag="p"
          class-name="copyright"
          :rows="1"
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import EditableText from './EditableText.vue'
</script>

<style scoped>
.site-footer {
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
  color: #ffffff;
}

.footer-text {
  color: #cccccc;
  line-height: 1.6;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #cccccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #2196f3;
}

.social-links {
  margin-top: 1rem;
}

.footer-bottom {
  border-top: 1px solid #333;
  padding-top: 1rem;
  text-align: center;
}

.copyright {
  color: #999;
  margin: 0;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
