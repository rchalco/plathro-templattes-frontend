<template>
  <div class="image-skeleton" :style="{ width: width, height: height }" :class="classes">
    <div class="skeleton-shimmer"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  rounded?: boolean
  aspectRatio?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '200px',
  rounded: false,
  aspectRatio: '1/1'
})

const classes = computed(() => ({
  'rounded': props.rounded,
  'aspect-ratio': props.aspectRatio
}))
</script>

<script lang="ts">
import { computed } from 'vue'
export default {
  name: 'ImageSkeleton'
}
</script>

<style scoped>
.image-skeleton {
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.image-skeleton.rounded {
  border-radius: 1rem;
}

.image-skeleton.aspect-ratio {
  aspect-ratio: var(--aspect-ratio, 1/1);
}

.skeleton-shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite ease-in-out;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .image-skeleton {
    background: #2a2a2a;
  }
  
  .skeleton-shimmer {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
  }
}
</style>