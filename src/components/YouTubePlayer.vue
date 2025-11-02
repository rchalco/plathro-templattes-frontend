<template>
  <div class="youtube-player">
    <iframe
      v-if="videoId"
      :src="`https://www.youtube.com/embed/${videoId}`"
      :width="width"
      :height="height"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div v-else class="no-video">
      <p>No video available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  videoUrl?: string
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Default sample video
  width: '100%',
  height: '315',
})

// Extract video ID from YouTube URL
const videoId = computed(() => {
  if (!props.videoUrl) return null

  // Handle different YouTube URL formats
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
  ]

  for (const pattern of patterns) {
    const match = props.videoUrl.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  // If it's already just an ID, return it
  if (/^[a-zA-Z0-9_-]{11}$/.test(props.videoUrl)) {
    return props.videoUrl
  }

  return null
})
</script>

<style scoped>
.youtube-player {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.youtube-player iframe {
  display: block;
}

.no-video {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #666;
  min-height: 315px;
  border-radius: 8px;
}
</style>
