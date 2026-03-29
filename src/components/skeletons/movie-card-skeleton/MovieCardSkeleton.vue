<template>
  <div class="movie-card-skeleton">
    <div class="poster skeleton-item"></div>
    <div v-if="hasMeta" class="meta skeleton-item"></div>
    <div class="title skeleton-item"></div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    hasMeta?: boolean;
  }>();
</script>

<style scoped>
  .movie-card-skeleton {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }

  .poster {
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .meta {
    width: 60%;
    height: 20px;
  }
  .title {
    width: 80%;
    height: 20px;
  }

  .skeleton-item {
    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>
