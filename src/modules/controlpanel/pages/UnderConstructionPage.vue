<template>
  <div class="under-construction-page">
    <div class="construction-content">
      <div class="icon-container">
        <i class="bi bi-tools"></i>
      </div>
      <h1>Under Construction</h1>
      <p>This feature is currently being developed and will be available soon.</p>
      <button class="back-button" @click="goToDashboard">
        <i class="bi bi-arrow-left"></i>
        Back to Dashboard
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
.under-construction-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.construction-content {
  text-align: center;
  max-width: 500px;
}

.icon-container {
  margin-bottom: 32px;
}

.icon-container i {
  font-size: 80px;
  color: #667eea;
}

h1 {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
}

p {
  font-size: 18px;
  color: #666;
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.back-button {
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.back-button:hover {
  background-color: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.back-button i {
  font-size: 18px;
}
</style>
