<template>
  <section class="contact-section">
    <div class="contact-container">
      <div class="contact-info">
        <EditableText page-name="contact" component-name="info" element-id="title" default-value="Get in Touch" tag="h1"
          class-name="contact-title" :rows="1" />
        <EditableText page-name="contact" component-name="info" element-id="description"
          default-value="We'd love to hear from you. Send us a message and we'll respond as soon as possible." tag="p"
          class-name="contact-description" :rows="3" />
        <div class="contact-details">
          <div class="contact-detail-item">
            <h3>Email</h3>
            <EditableText page-name="contact" component-name="info" element-id="email" default-value="info@example.com"
              tag="p" :rows="1" />
          </div>
          <div class="contact-detail-item">
            <h3>Phone</h3>
            <EditableText page-name="contact" component-name="info" element-id="phone" default-value="+1 (555) 123-4567"
              tag="p" :rows="1" />
          </div>
          <div class="contact-detail-item">
            <h3>Address</h3>
            <EditableText page-name="contact" component-name="info" element-id="address"
              default-value="123 Business St, Suite 100, City, State 12345" tag="p" :rows="2" />
          </div>
        </div>
      </div>
      <div class="contact-form">
        <h2>Send us a message by ruben</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <input type="text" placeholder="Your Name" required />
          </div>
          <div class="form-group">
            <input type="email" placeholder="Your Email" required />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Subject" required />
          </div>
          <div class="form-group">
            <textarea placeholder="Your Message" rows="6" required></textarea>
          </div>
          <button type="submit" class="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'

const handleSubmit = () => {
  alert('Form submitted! (This is a demo)')
}
</script>

<style scoped>
.contact-section {
  padding: 4rem 2rem;
  background-color: #f9f9f9;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.contact-description {
  font-size: 1.125rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-detail-item h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.contact-detail-item p {
  color: #666;
  margin: 0;
}

.contact-form {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2196f3;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #1976d2;
}

@media (max-width: 768px) {
  .contact-section {
    padding: 2rem 1rem;
  }

  .contact-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-title {
    font-size: 2rem;
  }
}
</style>
