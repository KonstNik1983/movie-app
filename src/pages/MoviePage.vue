<template>
  <section class="movie-hero">
    <div class="movie-hero__bg">
      <img :src="posterImg" alt="Poster" class="movie-hero__image" />

      <div class="movie-hero__overlay"></div>
      <div class="movie-hero__gradient"></div>
    </div>

    <div class="movie-hero__content">
      <div class="movie-hero__title">
        <h1 class="movie-hero__heading">
          {{ movie?.title }}
        </h1>

        <span v-if="certification" class="movie-hero__badge">
          {{ certification }}
        </span>
      </div>

      <div class="movie-hero__meta">
        <span>
          ⭐ {{ movie?.vote_average }} • {{ releaseDate }}, {{ movieGenres }} •
          {{ movieDuration }}
        </span>
      </div>

      <div class="movie-hero__actions">
        <BaseButton variant="primary">Смотреть фильм</BaseButton>

        <BaseButton variant="ghost">Трейлер</BaseButton>

        <button class="movie-hero__btn" aria-label="Поделиться">
          <img
            class="movie-hero__btn--img"
            src="@/assets/icons/Frame 75.svg"
            alt=""
          />
        </button>

        <button class="movie-hero__btn" aria-label="Избранное">
          <img
            class="movie-hero__btn--img"
            src="@/assets/icons/Frame 77.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { onMounted, computed } from 'vue';
  import { useMoviePageStore } from '@/store/movie/movie';
  import { useRoute } from 'vue-router';

  import BaseButton from '@/components/base-button/BaseButton.vue';
  import { buildImage } from '@/utils/movie.utils';

  const route = useRoute();
  const movieId = Number(route.params.id);
  const movieStore = useMoviePageStore();

  const { movie, credits, reviews, similar, isLoading, releaseDates } =
    storeToRefs(movieStore);

  const posterImg = computed(() => {
    if (!movie.value) return '';
    return buildImage(
      movie.value.backdrop_path ?? movie.value.poster_path ?? ''
    );
  });

  const releaseDate = computed(() => {
    return movie.value?.release_date?.split('-')[0];
  });

  const movieGenres = computed(() => {
    if (!movie.value) return [];
    return movie.value.genres
      ?.map((genre) => genre.name)
      .slice(0, 2)
      .join(', ');
  });

  const movieDuration = computed(() => {
    if (!movie.value?.runtime) return '';
    const hours = Math.floor(movie.value.runtime / 60);
    const minutes = movie.value.runtime % 60;
    return `${hours} ч ${minutes} мин`;
  });

  const certification = computed(() => {
    const de = releaseDates.value?.results?.find(
      (item) => item.iso_3166_1 === 'DE'
    );

    return de?.release_dates?.find((r) => r.certification)?.certification ?? '';
  });

  onMounted(() => {
    movieStore.loadMovie(movieId);
  });
</script>

<style scoped>
  .movie-hero {
    position: relative;
    width: 100%;
    min-height: 600px;
    color: var(--color-text-primary);
    overflow: hidden;
    display: flex;
    align-items: flex-end;
  }

  .movie-hero__bg {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  .movie-hero__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .movie-hero__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 2;
  }

  .movie-hero__gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    z-index: 3;
  }

  .movie-hero__content {
    position: relative;
    z-index: 4;
    padding: 20px 40px;
  }

  .movie-hero__title {
    display: inline-flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 20px;
  }

  .movie-hero__heading {
    font-size: 38px;
    font-weight: 700;
    margin: 0;
  }

  .movie-hero__badge {
    align-self: flex-start;
    transform: translateY(-12px);
    padding: 4px 10px;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid white;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.6);
  }

  .movie-hero__meta {
    font-size: 14px;
    color: var(--color-text-secondary);
  }

  .movie-hero__actions {
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    gap: 15px;
  }

  .movie-hero__btn {
    background: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .movie-hero__btn--img {
    width: 47px;
    height: 43px;
  }
</style>
