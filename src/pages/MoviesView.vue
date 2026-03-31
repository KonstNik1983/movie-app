<template>
  <MediaSection
    title="Каталог фильмов"
    :sections="movieStore.formattedMovieSections"
    :isLoading="movieStore.isLoading"
    :genresCount="6"
  />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';

  import { useMoviesStore } from '@/store/movies/movies.ts';
  import MediaSection from '@/components/media-sections/MediaSections.vue';

  const movieStore = useMoviesStore();

  onMounted(() => {
    movieStore.loadMovies();
  });
</script>

<style scoped></style>
