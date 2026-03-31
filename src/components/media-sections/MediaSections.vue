<template>
  <section class="movies section-padding">
    <h2 v-if="title" class="movies__title">{{ title }}</h2>

    <template v-if="isLoading">
      <div
        v-for="genreIndex in genresCount"
        :key="genreIndex"
        class="movies__genre"
      >
        <h3 class="movie__title movie__title--skeleton skeleton-item"></h3>

        <div class="movies__cards">
          <MovieCardSkeleton
            v-for="cardIndex in 4"
            :key="cardIndex"
            :hasMeta="true"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div
        v-for="section in sections"
        :key="section.genre.id"
        class="movies__genre"
      >
        <h3 class="movie__title">{{ section.genre.title }}</h3>

        <div class="movies__cards">
          <MediaCard
            v-for="item in section.movies"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :image="item.image"
            :rating="item.rating"
            :media="item.media"
            :genres="item.genres"
            :link="item.link"
          />
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
  import type { FormattedSection } from '@/components/media/media.types';
  import MediaCard from '@/components/media-card/MediaCard.vue';
  import MovieCardSkeleton from '../skeletons/movie-card-skeleton/MovieCardSkeleton.vue';

  defineProps<{
    title: string;
    sections: FormattedSection[];
    isLoading: boolean;
    genresCount: number;
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

  .movie__title--skeleton {
    width: 200px;
    height: 25px;
    border-radius: 4px;
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
