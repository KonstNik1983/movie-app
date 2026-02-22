<template>
  <section class="movie-hero">
    <div class="movie-hero__bg">
      <img :src="posterImg" alt="Постер фильма" class="movie-hero__image" />

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
          {{ movieMeta }}
        </span>
      </div>

      <div class="movie-hero__actions">
        <BaseButton variant="primary">Смотреть фильм</BaseButton>

        <BaseButton variant="ghost">Трейлер</BaseButton>

        <button class="movie-hero__btn" aria-label="Поделиться">
          <img
            class="movie-hero__btn-img"
            src="@/assets/icons/Frame 75.svg"
            alt=""
          />
        </button>

        <button class="movie-hero__btn" aria-label="Избранное">
          <img
            class="movie-hero__btn-img"
            src="@/assets/icons/Frame 77.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  </section>
  <section class="movie-details">
    <h2 class="movie-details__about-title">О фильме</h2>
    <div class="movie-details__container">
      <div class="movie-details__main">
        <div class="movie-details__about">
          <p class="movie-details__about-description">
            {{ movie?.overview }}
          </p>
        </div>

        <div class="movie-details__reviews">
          <h2 class="movie-details__reviews-title">Рецензии</h2>
          <template v-if="visibleReviews?.length">
            <div
              v-for="review in visibleReviews"
              :key="review.id"
              class="movie-details__review"
            >
              <div class="movie-details__review-header">
                <img
                  :src="getAvatar(review)"
                  alt="Author avatar"
                  class="movie-details__review-avatar"
                />

                <div class="movie-details__review-meta">
                  <span class="movie-details__review-author">
                    {{ review.author }}
                  </span>
                  <span class="movie-details__review-date">
                    {{ formatDate(review.created_at) }}
                  </span>
                </div>
              </div>

              <div class="movie-details__review-content">
                <p>{{ review.content }}</p>
              </div>

              <div class="movie-details__review-actions">
                <button
                  class="movie-details__review-btn"
                  aria-label="Коментарии"
                >
                  <img
                    class="movie-details__review-img"
                    src="@/assets/icons/Vector (10).svg"
                    alt=""
                  />
                  <span class="movie-details__review-count">5</span>
                </button>
                <button class="movie-details__review-btn" aria-label="Лайк">
                  <img
                    class="movie-details__review-img"
                    src="@/assets/icons/Vector (11).svg"
                    alt=""
                  />
                  <span class="movie-details__review-count">12</span>
                </button>
                <button class="movie-details__review-btn" aria-label="Дизлайк">
                  <img
                    class="movie-details__review-img"
                    src="@/assets/icons/Vector (12).svg"
                    alt=""
                  />
                  <span class="movie-details__review-count">3</span>
                </button>
              </div>
            </div>

            <BaseButton
              v-if="hasMoreReviews"
              variant="ghost"
              @click="toggleShowReviews"
            >
              {{ showAllReviews ? 'Скрыть' : 'Смотреть все' }}
            </BaseButton>
          </template>

          <div v-else>Рецензии к данному фильму не найдены!</div>
        </div>
      </div>

      <aside class="movie-details__sidebar">
        <div class="movie-details__info-list">
          <div class="movie-details__info-row">
            <span class="label">Рейтинг:</span>
            <span class="value">
              {{ formattedRating }}
            </span>
          </div>

          <div v-if="movieGenres" class="movie-details__info-row">
            <span class="label">Жанр:</span>
            <span class="value">
              {{ movieGenres }}
            </span>
          </div>

          <div v-if="director" class="movie-details__info-row">
            <span class="label">Режиссёр:</span>
            <span class="value">{{ director }}</span>
          </div>

          <div v-if="topCast" class="movie-details__info-row">
            <span class="label">В ролях:</span>
            <span class="value">
              {{ topCast }}
            </span>
          </div>

          <div v-if="movieCountries" class="movie-details__info-row">
            <span class="label">Страна:</span>
            <span class="value">
              {{ movieCountries }}
            </span>
          </div>

          <div v-if="movieDuration" class="movie-details__info-row">
            <span class="label">Длительность:</span>
            <span class="value">{{ movieDuration }}</span>
          </div>

          <div v-if="spokenLanguages" class="movie-details__info-row">
            <span class="label">Аудио:</span>
            <span class="value">
              {{ spokenLanguages }}
            </span>
          </div>

          <div class="movie-details__info-row">
            <span class="label">Субтитры:</span>
            <span class="value">—</span>
          </div>

          <div class="movie-details__info-row">
            <span class="label">Награды:</span>
            <span class="value">—</span>
          </div>
        </div>
      </aside>
    </div>
  </section>
  <section class="movie-similar">
    <h2 class="movie-similar__title">
      Если вам понравился «{{ movie?.title }}»
    </h2>

    <div class="movie-similar__list">
      <router-link
        v-for="movie in topSimilarMovies"
        :key="movie.id"
        :to="moviePage(movie.id!)"
        class="movie-similar__card"
      >
        <img
          class="movie-similar__card-image"
          :src="getSimilarImage(movie)"
          :alt="movie.title"
        />
        <p class="movie-similar__card-meta">
          ⭐ {{ movie.vote_average }} • {{ buildMovieGenres(movie.genre_ids) }}
        </p>
        <h4 class="movie-similar__card-title">{{ movie.title }}</h4>
      </router-link>
    </div>
  </section>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { computed, ref, watch } from 'vue';
  import { useMoviePageStore } from '@/store/movie/movie';
  import { useRoute } from 'vue-router';
  import type {
    MovieReviews200ResultsItem,
    MovieSimilar200ResultsItem,
  } from '@/api/types';

  import BaseButton from '@/components/base-button/BaseButton.vue';
  import { buildImage } from '@/utils/movie.utils';
  import { moviePage } from '@/router/paths';
  import { buildMovieGenres } from '@/utils/movie.utils';

  const route = useRoute();

  const movieStore = useMoviePageStore();

  const { movie, credits, reviews, similar, releaseDates } =
    storeToRefs(movieStore);

  const showAllReviews = ref(false);

  const visibleReviews = computed(() => {
    if (!reviews.value) return [];

    return showAllReviews.value
      ? reviews.value.results
      : reviews.value.results?.slice(0, 2);
  });

  const hasMoreReviews = computed(
    () => (reviews.value?.results?.length ?? 0) > 2
  );

  const toggleShowReviews = () => {
    showAllReviews.value = !showAllReviews.value;
  };

  const posterImg = computed(() => {
    if (!movie.value) return '';

    return buildImage(
      movie.value.backdrop_path ?? movie.value.poster_path ?? ''
    );
  });

  const getSimilarImage = (movie: MovieSimilar200ResultsItem) => {
    return buildImage(movie.backdrop_path ?? movie.poster_path ?? '');
  };

  const topSimilarMovies = computed(() => {
    return similar.value?.results?.slice(0, 4) ?? [];
  });

  const releaseDate = computed(() => {
    return movie.value?.release_date?.split('-')[0];
  });

  const movieGenres = computed<string | null>(() => {
    if (!movie.value?.genres?.length) return null;

    return movie.value.genres
      .map((g) => g.name)
      .slice(0, 2)
      .join(', ');
  });

  const movieDuration = computed(() => {
    if (!movie.value?.runtime) return null;
    const hours = Math.floor(movie.value.runtime / 60);
    const minutes = movie.value.runtime % 60;

    return `${hours} ч ${minutes} мин`;
  });

  const movieMeta = computed(() => {
    const parts: string[] = [];

    const rating = movie.value?.vote_average;
    if (rating && rating > 0) {
      parts.push(`⭐ ${rating.toFixed(1)}`);
    }

    if (releaseDate.value) {
      parts.push(releaseDate.value);
    }

    if (movieGenres.value) {
      parts.push(movieGenres.value);
    }

    if (movieDuration.value) {
      parts.push(movieDuration.value);
    }

    return parts.join(' • ');
  });

  const certification = computed(() => {
    const de = releaseDates.value?.results?.find(
      (item) => item.iso_3166_1 === 'DE'
    );

    return de?.release_dates?.find((r) => r.certification)?.certification ?? '';
  });

  const getAvatar = (review: MovieReviews200ResultsItem) => {
    const avatarPath = review.author_details?.avatar_path;

    if (!avatarPath) {
      return 'https://i.pravatar.cc/100?img=3';
    }

    if (avatarPath.startsWith('/https')) {
      return avatarPath.slice(1);
    }

    return `https://image.tmdb.org/t/p/w185${avatarPath}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return '';
    }

    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const director = computed(() => {
    return (
      credits.value?.crew?.find((person) => person.job === 'Director')?.name ||
      null
    );
  });

  const topCast = computed(() => {
    if (!credits.value?.cast?.length) return null;

    return credits.value.cast
      .slice(0, 5)
      .map((actor) => actor.name)
      .join(', ');
  });

  const formattedRating = computed(() => {
    const rating = movie.value?.vote_average;

    if (!rating || rating === 0) return '—';

    return rating.toFixed(1);
  });

  const movieCountries = computed<string | null>(() => {
    if (!movie.value?.production_countries?.length) return null;

    return movie.value.production_countries
      .map((country) => country.name)
      .slice(0, 1)
      .join(', ');
  });

  const spokenLanguages = computed<string | null>(() => {
    if (!movie.value?.spoken_languages?.length) return null;

    return movie.value.spoken_languages
      .map((language) => language.english_name)
      .join(', ');
  });

  watch(
    () => route.params.id,
    (newId) => {
      if (!newId) return;
      movieStore.loadMovie(Number(newId));
    },
    { immediate: true }
  );
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
    padding: 30px 40px;
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
    border: 1px solid var(--color-text-primary);
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

  .movie-hero__btn-img {
    width: 47px;
    height: 43px;
  }

  .movie-details {
    padding: 120px 0 30px 0;
    margin-bottom: 50px;
  }

  .movie-details__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }

  .movie-details__about {
    margin-bottom: 60px;
  }

  .movie-details__about-title {
    margin-bottom: 60px;
  }

  .movie-details__about-description {
    color: var(--color-text-secondary);
  }

  .movie-details__review {
    margin-bottom: 50px;
  }

  .movie-details__review:not(:last-of-type) {
    border-bottom: 1px solid var(--color-text-secondary);
  }

  .movie-details__reviews-title {
    margin-bottom: 60px;
  }

  .movie-details__review-header {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-bottom: 30px;
  }

  .movie-details__review-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }

  .movie-details__review-meta {
    display: flex;
    flex-direction: column;
  }

  .movie-details__review-author {
    font-weight: 600;
    margin-bottom: 5px;
  }

  .movie-details__review-date {
    font-size: 14px;
    color: var(--color-text-secondary);
  }

  .movie-details__review-content {
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin-bottom: 50px;
  }

  .movie-details__review-actions {
    display: flex;
    gap: 20px;
    justify-content: flex-end;
    margin-bottom: 40px;
  }

  .movie-details__review-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    background: transparent;
    color: var(--color-text-secondary);
    font-size: 14px;
    cursor: pointer;
  }

  .movie-details__review-img {
    width: 25px;
    height: 25px;
  }

  .movie-details__sidebar {
    padding-left: 40px;
  }

  .movie-details__info-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .movie-details__info-row {
    display: grid;
    grid-template-columns: 30% 70%;
    align-items: start;
  }

  .label {
    color: var(--color-text-secondary);
  }

  .value {
    max-width: 200px;
  }

  .movie-similar {
    margin-bottom: 120px;
  }

  .movie-similar__title {
    margin-bottom: 80px;
  }

  .movie-similar__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .movie-similar__card {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .movie-similar__card-image {
    width: 100%;
    height: 180px;
    border-radius: 8px;
    object-fit: cover;
  }

  .movie-similar__card-title {
    margin-top: 10px;
    font-size: 16px;
  }

  .movie-similar__card-meta {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin-top: 10px;
  }
</style>
