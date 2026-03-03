<template>
  <MediaSection
    title="Каталог фильмов"
    :sections="movieStore.formattedMovieSections"
  />
</template>

<script setup lang="ts">
  import { useMoviesStore } from '@/store/movies/movies.ts';
  import MediaSection from '@/components/media-sections/MediaSections.vue';

  const movieStore = useMoviesStore();
</script>

<style scoped></style>
