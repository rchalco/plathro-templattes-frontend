<script lang="ts" setup>
interface StarRatingProps {
  modelValue: number;
  maxStars?: number;
}

const props = defineProps<StarRatingProps>();
const emit = defineEmits<{
  'update:modelValue': [value: number]
}>();

const defaultMaxStars = 5;
const stars = Array.from({ length: props.maxStars || defaultMaxStars });

const updateRating = (index: number) => {
  emit('update:modelValue', index + 1);
};

const isSelected = (index: number): boolean => {
  return index < props.modelValue;
};
</script>

<template>
  <div class="star-rating">
    <button v-for="(_, index) in stars" :key="index" class="star-button" :class="{ 'selected': isSelected(index) }"
      @click="updateRating(index)">
      ★
    </button>
  </div>
</template>

<style scoped>
.star-rating {
  display: inline-flex;
  gap: 4px;
  padding: 1rem;
}

.star-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #ddd;
  transition: color 0.2s ease;
}

.star-button.selected {
  color: gold;
}

.star-button:hover {
  color: gold;
}
</style>
