<template>
  <MediaHero
    :title="movie?.title ?? ''"
    :backdrop="posterImg"
    :meta="movieMeta"
    :badge="certification"
    buttonText="Смотреть фильм"
  />
  <section class="media-details">
    <h2 class="media-details__title">О фильме</h2>
    <div class="media-details__container">
      <div>
        <MediaReviews
          :reviews="reviews?.results ?? []"
          :overview="movie?.overview"
        />
      </div>

      <MediaSidebarInfo
        :rating="formattedRating"
        :genres="movieGenres"
        :director="director"
        :cast="topCast"
        :countries="movieCountries"
        :duration="movieDuration"
        :languages="spokenLanguages"
      />
    </div>
  </section>
  <MediaSimilar
    :title="movie?.title"
    :movies="topSimilarMovies"
    :getImage="getSimilarImage"
    :getMediaLink="moviePage"
    :buildGenres="buildMovieGenres"
  />
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { computed, watch } from 'vue';
  import { useMoviePageStore } from '@/store/movie/movie';
  import { useRoute } from 'vue-router';
  import type { MovieSimilar200ResultsItem } from '@/api/types';
  import MediaHero from '@/components/media/MediaHero.vue';
  import MediaReviews from '@/components/media/MediaReviews.vue';
  import MediaSidebarInfo from '@/components/media/MediaSidebarInfo.vue';
  import MediaSimilar from '@/components/media/MediaSimilar.vue';

  import { buildImage } from '@/utils/movie.utils';
  import { moviePage } from '@/router/paths';
  import { buildMovieGenres } from '@/utils/movie.utils';

  const route = useRoute();

  const movieStore = useMoviePageStore();

  const { movie, credits, reviews, similar, releaseDates } =
    storeToRefs(movieStore);

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

<style scoped></style>
