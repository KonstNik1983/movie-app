<template>
  <MediaSection
    title="Каталог фильмов"
    :sections="movieStore.formattedSections"
  />
</template>

<script setup lang="ts">
  import { useMoviesStore } from '@/store/movies/movies.ts';
  import MediaSection from '@/components/media/MediaSections.vue';

  const movieStore = useMoviesStore();
</script>

<style scoped></style>
