<template>
  <MediaHero
    :isLoading="isLoading"
    :mediaId="movie?.id ?? 0"
    :title="movie?.title ?? ''"
    :backdrop="posterImg"
    :meta="movieMeta"
    :badge="certification"
    buttonText="Смотреть фильм"
    mediaType="movie"
  />
  <section class="media-details">
    <h2 class="media-details__title">О фильме</h2>
    <div class="media-details__container">
      <div>
        <MediaReviews
          :reviews="movieStore.formattedReviews"
          :overview="movie?.overview"
          :isLoading="isLoading"
        />
      </div>

      <MediaSidebar
        :rating="formattedRating"
        :genres="movieGenres"
        :director="director"
        :cast="topCast"
        :countries="movieCountries"
        :duration="movieDuration"
        :languages="spokenLanguages"
        :isLoading="isLoading"
      />
    </div>
  </section>
  <LazySection>
    <component :is="AsyncMediaSimilar" :title="movie?.title" :movies="topSimilarMoviesFormatted" />
  </LazySection>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, watch, onUnmounted, defineAsyncComponent } from "vue";
import { useMoviePageStore } from "@/store/movie/movie";

import { useRoute } from "vue-router";
import dayjs from "dayjs";
import MediaHero from "@/components/media-hero/MediaHero.vue";
import MediaReviews from "@/components/media-reviews/MediaReviews.vue";
import MediaSidebar from "@/components/media-sidebar/MediaSidebar.vue";
import LazySection from "@/components/lazy-section/LazySection.vue";
import MediaSimilarSkeleton from "@/components/skeletons/media-similar-skeleton/MediaSimilarSkeleton.vue";

import { buildImage } from "@/utils/movie.utils";
import { moviePage } from "@/router/paths";
import { buildMovieGenres } from "@/utils/movie.utils";
import { FULL_YEAR_FORMAT } from "@/constants/date";

const AsyncMediaSimilar = defineAsyncComponent({
  loader: () => import("@/components/media-similar/MediaSimilar.vue"),
  loadingComponent: MediaSimilarSkeleton,
  delay: 0,
});

const route = useRoute();

const movieStore = useMoviePageStore();

const { movie, credits, similar, releaseDates, isLoading } = storeToRefs(movieStore);

const posterImg = computed(() => {
  if (!movie.value) return "";

  return buildImage(movie.value.backdrop_path ?? movie.value.poster_path ?? "");
});

const topSimilarMoviesFormatted = computed(() => {
  return (
    similar.value?.results
      ?.slice(0, 4)
      .filter((item): item is typeof item & { id: number } => !!item.id)
      .map((item) => ({
        id: item.id!,
        title: item.title ?? "",
        vote_average: item.vote_average ?? 0,
        image: buildImage(item.backdrop_path ?? item.poster_path ?? ""),
        genres: buildMovieGenres(item.genre_ids),
        link: moviePage(item.id!),
      })) ?? []
  );
});

const releaseYear = computed(() => {
  if (!movie.value?.release_date) return "";
  const date = dayjs(movie.value.release_date).format(FULL_YEAR_FORMAT);
  return date;
});

const movieMeta = computed(() => {
  const parts: string[] = [];

  const rating = movie.value?.vote_average;

  if (rating && rating > 0) {
    parts.push(`⭐ ${rating.toFixed(1)}`);
  }

  if (releaseYear.value) {
    parts.push(releaseYear.value);
  }

  if (movieGenres.value) {
    parts.push(movieGenres.value);
  }

  if (movieDuration.value) {
    parts.push(movieDuration.value);
  }

  return parts.join(" • ");
});

const movieGenres = computed(() => {
  if (!movie.value?.genres?.length) return null;

  return movie.value.genres
    .map((g) => g.name)
    .slice(0, 2)
    .join(", ");
});

const certification = computed(() => {
  const de = releaseDates.value?.results?.find((item) => item.iso_3166_1 === "DE");

  return de?.release_dates?.find((r) => r.certification)?.certification ?? "";
});

const formattedRating = computed(() => {
  const rating = movie.value?.vote_average;

  if (!rating || rating === 0) return "—";

  return rating.toFixed(1);
});

const director = computed(() => {
  return credits.value?.crew?.find((person) => person.job === "Director")?.name || null;
});

const topCast = computed(() => {
  if (!credits.value?.cast?.length) return null;

  return credits.value.cast
    .slice(0, 5)
    .map((actor) => actor.name)
    .join(", ");
});

const movieCountries = computed<string | null>(() => {
  if (!movie.value?.production_countries?.length) return null;

  return movie.value.production_countries
    .map((country) => country.name)
    .slice(0, 1)
    .join(", ");
});

const movieDuration = computed(() => {
  if (!movie.value?.runtime) return null;
  const hours = Math.floor(movie.value.runtime / 60);
  const minutes = movie.value.runtime % 60;

  return `${hours} ч ${minutes} мин`;
});

const spokenLanguages = computed<string | null>(() => {
  if (!movie.value?.spoken_languages?.length) return null;

  return movie.value.spoken_languages.map((language) => language.english_name).join(", ");
});

watch(
  () => route.params.id,
  (newId) => {
    if (!newId) return;
    movieStore.loadMovie(Number(newId));
  },
  { immediate: true },
);

onUnmounted(() => {
  movieStore.reset();
});
</script>

<style scoped></style>
