<template>
  <MediaSection
    title="Каталог фильмов"
    :sections="movieStore.formattedSections"
    :getMediaLink="moviePage"
  />
</template>

<script setup lang="ts">
  import { useMoviesStore } from '@/store/movies/movies.ts';
  import MediaSection from '@/components/media/MediaSections.vue';
  import { moviePage } from '@/router/paths';

  const movieStore = useMoviesStore();
</script>

<style scoped></style>
