<template>
  <section class="media-section-skeleton">
    <h2 class="section-title skeleton-item"></h2>

    <div v-for="rowIndex in 3" :key="rowIndex" class="media-section-row">
      <h3 class="row-title skeleton-item"></h3>

      <div class="movies__cards">
        <MovieCardSkeleton
          v-for="cardIndex in 4"
          :key="cardIndex"
          :hasMeta="true"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import MovieCardSkeleton from '@/components/skeletons/movie-card-skeleton/MovieCardSkeleton.vue';
</script>

<style scoped>
  .media-section-skeleton {
    margin-bottom: 40px;
  }

  .section-title {
    width: 30%;
    height: 28px;
    margin-bottom: 30px;
    border-radius: 6px;
  }

  .media-section-row {
    margin-bottom: 40px;
  }

  .row-title {
    width: 25%;
    height: 24px;
    margin-bottom: 25px;
    border-radius: 4px;
  }

  .movies__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
</style>
