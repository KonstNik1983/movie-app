<template>
  <section class="media-similar">
    <h2 class="media-similar__title">Если вам понравился «{{ title }}»</h2>

    <div class="media-similar__list">
      <router-link
        v-for="item in movies"
        :key="item.id"
        :to="getMediaLink(item.id!)"
        class="media-similar__card"
      >
        <img
          class="media-similar__card-image"
          :src="getImage(item)"
          :alt="item.title"
        />

        <p class="media-similar__card-meta">
          ⭐ {{ item.vote_average }} •
          {{ buildGenres(item.genre_ids!) }}
        </p>

        <h4 class="media-similar__card-title">
          {{ item.title }}
        </h4>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
  import type { MovieSimilar200ResultsItem } from '@/api/types';

  defineProps<{
    title?: string;
    movies: MovieSimilar200ResultsItem[];
    getImage: (movie: MovieSimilar200ResultsItem) => string;
    getMediaLink: (id: number) => string;
    buildGenres: (ids: number[]) => string;
  }>();
</script>
<style scoped>
  .media-similar {
    margin-bottom: 120px;
  }

  .media-similar__title {
    margin-bottom: 80px;
  }

  .media-similar__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .media-similar__card {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .media-similar__card-image {
    width: 100%;
    height: 180px;
    border-radius: 8px;
    object-fit: cover;
  }

  .media-similar__card-title {
    margin-top: 10px;
    font-size: 16px;
  }

  .media-similar__card-meta {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin-top: 10px;
  }
</style>
