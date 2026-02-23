<template>
  <section class="movies section-padding">
    <h2 class="movies__title">{{ title }}</h2>

    <div
      v-for="section in sections"
      :key="section.genre.id"
      class="movies__genre"
    >
      <h3 class="movie__title">{{ section.genre.title }}</h3>

      <div class="movies__cards">
        <router-link
          v-for="movie in section.movies"
          :key="movie.id"
          :to="moviePage(movie.id!)"
          class="movie-card"
        >
          <img class="movie-card-img" :src="movie.image" :alt="movie.title" />
          <p class="movie-card-text">
            ⭐ {{ movie.rating }} • {{ movie.genres }}
          </p>
          <h4 class="movie-card-title">{{ movie.title }}</h4>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { moviePage } from '@/router/paths';
  import type { FormattedSection } from '@/components/media/media.types';

  defineProps<{
    title: string;
    sections: FormattedSection[];
  }>();
</script>
<style scoped>
  .movies__title {
    margin-bottom: 70px;
  }
  .movie__title {
    font-size: 20px;
    margin-bottom: 30px;
  }
  .movies__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .movies__genre:not(:last-child) {
    margin-bottom: 60px;
  }
  .movie-card {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  .movie-card-img {
    width: 100%;
    height: 180px;
    border-radius: 8px;
    object-fit: cover;
  }
  .movie-card-title {
    margin-top: 10px;
    font-size: 16px;
  }
  .movie-card-text {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin-top: 10px;
  }
</style>
