<template>
  <div class="container">
    <div class="w-layout-blockcontainer container-default width-100 z-index-1 w-container">
      <div class="inner-container _480px center">
        <div class="card-2 create-account-card">
          <div class="center-content">
            <h2 class="content-h2">Client Questionnaire</h2>
            <p class="paragraph-12">Please answer the following questions to help us better serve you.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="form-2">
            <div v-for="question in questions" :key="question.QuestionId" class="mg-top-default">
              <!-- Open Question (Text Input) -->
              <div v-if="question.QuestionType === 'open'" class="form-field-wrapper">
                <label :for="`question-${question.QuestionId}`" class="field-label">
                  {{ question.QuestionText }}
                  <span v-if="isRequired(question)" class="required-star">*</span>
                </label>
                <input
                  :id="`question-${question.QuestionId}`"
                  v-model="answers[question.QuestionId]"
                  type="text"
                  class="text-field w-input"
                  :required="isRequired(question)"
                  :placeholder="`Enter your ${question.QuestionText.toLowerCase()}`"
                />
              </div>

              <!-- Closed Question (Select) -->
              <div v-else-if="question.QuestionType === 'close'" class="form-field-wrapper">
                <label :for="`question-${question.QuestionId}`" class="field-label">
                  {{ question.QuestionText }}
                  <span v-if="isRequired(question)" class="required-star">*</span>
                </label>
                <select
                  :id="`question-${question.QuestionId}`"
                  v-model="answers[question.QuestionId]"
                  class="text-field w-select"
                  :required="isRequired(question)"
                >
                  <option value="" disabled selected>Select an option</option>
                  <option
                    v-for="option in question.Options"
                    :key="option.OptionId"
                    :value="option.OptionId"
                  >
                    {{ option.OptionText }}
                  </option>
                </select>
              </div>
            </div>

            <div class="mg-top-default">
              <button type="submit" class="secondary-button-10 small w-inline-block w-button">
                Submit Questionnaire
              </button>
            </div>
          </form>

          <!-- Success Message -->
          <div v-if="showSuccess" class="success-message-wrapper w-form-done mg-top-default">
            <div class="card-2 contact-form-card">
              <img
                alt="Success"
                src="/src/assets/images/success-message-icon-top-dashbrd-webflow-ecommerce-template.png"
                class="success-message-icon-top"
              />
              <div class="mg-top-default">
                <div class="text-titles">
                  <div class="display-7 mid">Thank you!</div>
                  <p>Your questionnaire has been submitted successfully.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="showError" class="error-message-wrapper w-form-fail mg-top-default">
            <div>{{ errorMessage }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface Option {
  OptionId: number
  OptionText: string
}

interface Question {
  QuestionId: number
  QuestionText: string
  QuestionType: string
  IsClosed: number
  IsActive: number
  Options: Option[]
}

const router = useRouter()

// Mock data as specified in requirements
const questions = ref<Question[]>([
  {
    QuestionId: 5,
    QuestionText: 'Company Name',
    QuestionType: 'open',
    IsClosed: 0,
    IsActive: 1,
    Options: [],
  },
  {
    QuestionId: 6,
    QuestionText: 'Industry',
    QuestionType: 'open',
    IsClosed: 0,
    IsActive: 1,
    Options: [],
  },
  {
    QuestionId: 7,
    QuestionText: '# Employees',
    QuestionType: 'open',
    IsClosed: 0,
    IsActive: 1,
    Options: [],
  },
  {
    QuestionId: 8,
    QuestionText: 'Phone',
    QuestionType: 'open',
    IsClosed: 0,
    IsActive: 1,
    Options: [],
  },
  {
    QuestionId: 9,
    QuestionText: 'What is "the pain" in your day-to-day business?',
    QuestionType: 'open',
    IsClosed: 0,
    IsActive: 1,
    Options: [],
  },
  {
    QuestionId: 11,
    QuestionText: 'Explain me the manual process you want to replace',
    QuestionType: 'open',
    IsClosed: 0,
    IsActive: 1,
    Options: [],
  },
  {
    QuestionId: 12,
    QuestionText: 'How much would you save a year if you had it?',
    QuestionType: 'close',
    IsClosed: 1,
    IsActive: 1,
    Options: [
      {
        OptionId: 8,
        OptionText: '1000USD - 2000USD',
      },
      {
        OptionId: 9,
        OptionText: '2001USD - 5000USD',
      },
      {
        OptionId: 10,
        OptionText: '5000USD - 1000USD',
      },
      {
        OptionId: 11,
        OptionText: '> 10000USD',
      },
    ],
  },
  {
    QuestionId: 13,
    QuestionText: 'How much are you may willing to pay monthly?',
    QuestionType: 'close',
    IsClosed: 1,
    IsActive: 1,
    Options: [
      {
        OptionId: 12,
        OptionText: '10USD - 100USD',
      },
      {
        OptionId: 14,
        OptionText: '101USD - 200USD',
      },
      {
        OptionId: 16,
        OptionText: '> 200USD',
      },
    ],
  },
])

const answers = reactive<Record<number, string | number>>({})
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

const isRequired = (question: Question): boolean => {
  // Make all questions required for now
  return true
}

const handleSubmit = async () => {
  try {
    showError.value = false
    showSuccess.value = false

    // Validate all required fields are filled
    const unanswered = questions.value.filter(
      (q) => isRequired(q) && !answers[q.QuestionId]
    )

    if (unanswered.length > 0) {
      showError.value = true
      errorMessage.value = 'Please answer all required questions.'
      return
    }

    // Here we would normally send to API
    console.log('Questionnaire answers:', answers)

    showSuccess.value = true

    // Redirect to home after a delay
    setTimeout(() => {
      router.push('/home')
    }, 2000)
  } catch (error) {
    showError.value = true
    errorMessage.value = 'Oops! Something went wrong while submitting the form.'
  }
}

onMounted(() => {
  // Initialize answers object
  questions.value.forEach((question) => {
    if (question.QuestionType === 'close') {
      answers[question.QuestionId] = ''
    }
  })
})
</script>

<style scoped>
.form-field-wrapper {
  margin-bottom: 1.5rem;
}

.field-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.required-star {
  color: #e74c3c;
  margin-left: 0.25rem;
}

.text-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.text-field:focus {
  outline: none;
  border-color: #4a90e2;
}

.w-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 12px;
  padding-right: 2.5rem;
}

.success-message-wrapper,
.error-message-wrapper {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
}

.success-message-wrapper {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.error-message-wrapper {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.mg-top-default {
  margin-top: 1.5rem;
}
</style>
