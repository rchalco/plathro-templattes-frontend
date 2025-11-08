<template>
  <div class="questionnaire-container">
    <div class="questionnaire-card">
      <form @submit.prevent="handleSubmit" class="questionnaire-form">
        <!-- Questions Loop -->
        <div v-for="question in questions" :key="question.QuestionId" class="form-field">
          <label :for="`question-${question.QuestionId}`" class="field-label">
            {{ question.QuestionText }}
            <span class="required-star">*</span>
          </label>

          <!-- Text Input -->
          <input v-if="question.QuestionType === 'open'" :id="`question-${question.QuestionId}`"
            v-model="answers[question.QuestionId]" type="text" class="field-input" required
            :placeholder="`Enter ${question.QuestionText.toLowerCase()}`" />

          <!-- Select Dropdown -->
          <select v-else :id="`question-${question.QuestionId}`" v-model="answers[question.QuestionId]"
            class="field-select" required>
            <option value="" disabled>Select an option</option>
            <option v-for="option in question.Options" :key="option.OptionId" :value="option.OptionId">
              {{ option.OptionText }}
            </option>
          </select>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-button" :disabled="isSubmitting">
          <span v-if="!isSubmitting">Submit Questionnaire</span>
          <span v-else class="button-loader">
            <span class="spinner"></span>
            Submitting...
          </span>
        </button>
      </form>

      <!-- Success Message -->
      <transition name="fade">
        <div v-if="showSuccess" class="message-card success">
          <img :src="successIcon" alt="Success" class="message-icon" />
          <h3 class="message-title">Thank you!</h3>
          <p class="message-text">Your questionnaire has been submitted successfully.</p>
        </div>
      </transition>

      <!-- Error Message -->
      <transition name="shake">
        <div v-if="showError" class="message-card error">
          <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {{ errorMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import successIconImg from '@/assets/images/success-message-icon-top-dashbrd-webflow-ecommerce-template.png'

interface Option {
  OptionId: number
  OptionText: string
}

interface Question {
  QuestionId: number
  QuestionText: string
  QuestionType: 'open' | 'close'
  IsClosed: number
  IsActive: number
  Options: Option[]
}

const router = useRouter()
const successIcon = successIconImg

// State
const answers = reactive<Record<number, string | number>>({})
const showSuccess = ref(false)
const showError = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')

// Questions data
const questions = ref<Question[]>([
  { QuestionId: 5, QuestionText: 'Company Name', QuestionType: 'open', IsClosed: 0, IsActive: 1, Options: [] },
  { QuestionId: 6, QuestionText: 'Industry', QuestionType: 'open', IsClosed: 0, IsActive: 1, Options: [] },
  { QuestionId: 7, QuestionText: '# Employees', QuestionType: 'open', IsClosed: 0, IsActive: 1, Options: [] },
  { QuestionId: 8, QuestionText: 'Phone', QuestionType: 'open', IsClosed: 0, IsActive: 1, Options: [] },
  { QuestionId: 9, QuestionText: 'What is "the pain" in your day-to-day business?', QuestionType: 'open', IsClosed: 0, IsActive: 1, Options: [] },
  { QuestionId: 11, QuestionText: 'Explain me the manual process you want to replace', QuestionType: 'open', IsClosed: 0, IsActive: 1, Options: [] },
  {
    QuestionId: 12,
    QuestionText: 'How much would you save a year if you had it?',
    QuestionType: 'close',
    IsClosed: 1,
    IsActive: 1,
    Options: [
      { OptionId: 8, OptionText: '1000USD - 2000USD' },
      { OptionId: 9, OptionText: '2001USD - 5000USD' },
      { OptionId: 10, OptionText: '5000USD - 10000USD' },
      { OptionId: 11, OptionText: '> 10000USD' },
    ],
  },
  {
    QuestionId: 13,
    QuestionText: 'How much are you willing to pay monthly?',
    QuestionType: 'close',
    IsClosed: 1,
    IsActive: 1,
    Options: [
      { OptionId: 12, OptionText: '10USD - 100USD' },
      { OptionId: 14, OptionText: '101USD - 200USD' },
      { OptionId: 16, OptionText: '> 200USD' },
    ],
  },
])

// Form submission
const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    showError.value = false
    showSuccess.value = false

    // Validate all fields
    const unanswered = questions.value.filter(q => !answers[q.QuestionId])

    if (unanswered.length > 0) {
      showError.value = true
      errorMessage.value = 'Please answer all required questions.'
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Questionnaire answers:', answers)

    showSuccess.value = true

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/home')
    }, 2000)
  } catch (error) {
    showError.value = true
    errorMessage.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Container */
.questionnaire-container {
  display: flex;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
}

.questionnaire-card {
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s;
  animation: fadeInUp 0.6s ease;
}

.questionnaire-card:hover {
  box-shadow: var(--shadow-md);
}

/* Form */
.questionnaire-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
}

.form-field {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  animation: slideInUp 0.5s ease;
}

.field-label {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.01em;
}

.required-star {
  color: var(--error-color);
  margin-left: 0.25rem;
}

/* Inputs & Selects */
.field-input,
.field-select {
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: inherit;
  color: var(--text-primary);
  background: var(--bg-light);
  transition: all 0.3s ease;
  outline: none;
}

.field-input:hover,
.field-select:hover {
  border-color: #c0c0c0;
  background: white;
}

.field-input:focus,
.field-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  background: white;
}

.field-input::placeholder {
  color: #999;
}

/* Select Custom Arrow */
.field-select {
  padding-right: 3rem;
  cursor: pointer;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--primary-color) 50%),
    linear-gradient(135deg, var(--primary-color) 50%, transparent 50%),
    linear-gradient(to right, #e8eef5, #e8eef5);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 100%;
  background-repeat: no-repeat;
}

.field-select:hover {
  background-image: linear-gradient(45deg, transparent 50%, #ccc5d3 50%),
    linear-gradient(135deg, #06135a 50%, transparent 50%),
    linear-gradient(to right, #d5dcf0, #d5dcf0);
}

.field-select:focus {
  background-image: linear-gradient(45deg, transparent 50%, var(--primary-color) 50%),
    linear-gradient(135deg, var(--primary-color) 50%, transparent 50%),
    var(--primary-gradient);
  animation: selectPulse 0.3s ease;
}

/* Button */
.submit-button {
  width: 100%;
  padding: 1rem 2rem;
  margin-top: 0.5rem;
  border: none;
  font-size: 1.0625rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
  background-color: #155724;
  color: #c0c0c0;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.submit-button:active {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Messages */
.message-card {
  margin-top: var(--spacing);
  padding: 2.5rem;
  border-radius: 12px;
  text-align: center;
  animation: slideInUp 0.5s ease;
}

.message-card.success {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border: 2px solid var(--success-color);
}

.message-card.error {
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  border: 2px solid var(--error-color);
  color: #721c24;
  font-weight: 500;
  animation: shake 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.message-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
}

.error-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.message-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #155724;
  margin-bottom: 0.5rem;
}

.message-text {
  font-size: 1.0625rem;
  color: #155724;
  line-height: 1.6;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

@keyframes selectPulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.02);
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 991px) {
  .questionnaire-container {
    padding: 100px 5%;
  }

  .questionnaire-card {
    padding: 2.5rem;
    border-radius: 14px;
  }

  .field-label {
    font-size: 0.875rem;
  }

  .field-input,
  .field-select {
    padding: 0.75rem 0.875rem;
    font-size: 0.9375rem;
    border-radius: 8px;
  }

  .submit-button {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }

  .message-title {
    font-size: 1.5rem;
  }

  .message-icon {
    width: 64px;
    height: 64px;
  }
}

@media (max-width: 767px) {
  .questionnaire-container {
    padding: 80px 4%;
  }

  .questionnaire-card {
    padding: 2rem 1.5rem;
    border-radius: 12px;
  }

  .questionnaire-form {
    gap: 1.25rem;
  }

  .field-input,
  .field-select {
    font-size: 0.9375rem;
  }

  .field-select {
    padding-right: 2.75rem;
    background-position: calc(100% - 18px) calc(1em + 2px),
      calc(100% - 13px) calc(1em + 2px), 100% 0;
    background-size: 4px 4px, 4px 4px, 2.2em 100%;
  }

  .message-card {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 479px) {
  .questionnaire-container {
    padding: 60px 3%;
  }

  .questionnaire-card {
    padding: 1.5rem 1rem;
  }

  .questionnaire-form {
    gap: 1rem;
  }

  .field-label {
    font-size: 0.8125rem;
  }

  .field-input,
  .field-select {
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
  }

  .field-select {
    padding-right: 2.5rem;
    background-position: calc(100% - 16px) calc(1em + 1px),
      calc(100% - 12px) calc(1em + 1px), 100% 0;
    background-size: 4px 4px, 4px 4px, 2em 100%;
  }

  .submit-button {
    padding: 0.75rem 1.25rem;
    font-size: 0.9375rem;
  }

  .message-card {
    padding: 1.5rem 1rem;
  }

  .message-icon {
    width: 56px;
    height: 56px;
  }

  .message-title {
    font-size: 1.25rem;
  }

  .message-text {
    font-size: 0.9375rem;
  }
}

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
