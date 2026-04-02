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
  border-radius: 6px;
}

.meta {
  width: 60%;
  height: 20px;
  border-radius: 4px;
}
.title {
  width: 80%;
  height: 20px;
  border-radius: 4px;
}
</style>
