<template>
  <section class="media-similar-skeleton">
    <h2 class="section-title skeleton-item"></h2>
    <div class="movies__cards">
      <MovieCardSkeleton
        v-for="cardIndex in 4"
        :key="cardIndex"
        :hasMeta="true"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import MovieCardSkeleton from '@/components/skeletons/movie-card-skeleton/MovieCardSkeleton.vue';
</script>

<style scoped>
  .media-similar-skeleton {
    margin-bottom: 40px;
  }

  .section-title {
    width: 30%;
    height: 28px;
    margin-bottom: 80px;
    border-radius: 6px;
  }

  .movies__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
</style>
