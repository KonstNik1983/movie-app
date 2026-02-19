<template>
  <MediaSection
    title="Каталог фильмов"
    :sections="movieStore.formattedSections"
  />
</template>

<script setup lang="ts">
  import { useMovieStore } from '@/store/movies/movies.ts';
  import MediaSection from '@/components/media/MediaSections.vue';

  const movieStore = useMovieStore();
</script>

<style scoped></style>
