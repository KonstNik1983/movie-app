<template>
  <MediaHero
    :isLoading="isLoading"
    :mediaId="tv?.id ?? 0"
    :title="tv?.name ?? ''"
    :backdrop="posterImg"
    :meta="tvMeta"
    buttonText="Смотреть сериал"
    mediaType="tv"
  />

  <TvSeasonsSection
    v-if="tv?.seasons?.length"
    :tvId="Number(route.params.id)"
    :seasons="seasonsList"
  />

  <section class="media-details">
    <h2 class="media-details__title">О сериале</h2>
    <div class="media-details__container">
      <div>
        <MediaReviews
          :reviews="tvStore.formattedReviews"
          :overview="tv?.overview"
          :isLoading="isLoading"
        />
      </div>

      <MediaSidebar
        :rating="formattedRating"
        :genres="tvGenres"
        :director="creator"
        :cast="topCast"
        :countries="tvCountries"
        :duration="episodeDuration"
        :languages="spokenLanguages"
        :isLoading="isLoading"
      />
    </div>
  </section>

  <MediaSimilar :title="tv?.name" :movies="topSimilarTvFormatted" />
</template>

<script setup lang="ts">
  import { computed, watch, onUnmounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useTvPageStore } from '@/store/tv/tv';
  import { parseISO, format } from 'date-fns';

  import MediaHero from '@/components/media-hero/MediaHero.vue';
  import TvSeasonsSection from '@/components/tv-seasons-section/TvSeasonsSection.vue';
  import MediaReviews from '@/components/media-reviews/MediaReviews.vue';
  import MediaSidebar from '@/components/media-sidebar/MediaSidebar.vue';
  import MediaSimilar from '@/components/media-similar/MediaSimilar.vue';

  import { buildImage, buildMovieGenres } from '@/utils/movie.utils';
  import { tvPage } from '@/router/paths';
  import { FULL_YEAR_FORMAT } from '@/constants/date';

  const route = useRoute();
  const tvStore = useTvPageStore();
  const { tv, credits, similar, seasonEpisodes, isLoading } =
    storeToRefs(tvStore);

  const seasonsList = computed(() => {
    return (
      tv.value?.seasons
        ?.filter((s) => s.season_number != null)
        .map((s) => ({
          season_number: s.season_number!,
          name: s.name,
        })) || []
    );
  });

  const posterImg = computed(() => {
    if (!tv.value) return '';
    return buildImage(tv.value.backdrop_path ?? tv.value.poster_path ?? '');
  });

  const releaseYear = computed(() => {
    if (!tv.value?.first_air_date) return '';
    const date = parseISO(tv.value.first_air_date);
    return format(date, FULL_YEAR_FORMAT);
  });

  const genres = computed(() => {
    if (!tv.value?.genres?.length) return null;
    return tv.value.genres
      .slice(0, 2)
      .map((g) => g.name)
      .join(', ');
  });

  const tvMeta = computed(() => {
    const parts: string[] = [];
    if (tv.value?.vote_average)
      parts.push(`⭐ ${tv.value.vote_average.toFixed(1)}`);
    if (releaseYear.value) parts.push(releaseYear.value);
    if (genres.value) parts.push(genres.value);
    if (episodeDuration.value) parts.push(episodeDuration.value);
    return parts.join(' • ');
  });

  const formattedRating = computed(() => {
    const rating = tv.value?.vote_average;
    return rating && rating > 0 ? rating.toFixed(1) : '—';
  });

  const tvGenres = computed(
    () =>
      tv.value?.genres
        ?.slice(0, 2)
        .map((g) => g.name)
        .join(', ') ?? null
  );
  const creator = computed(
    () => tv.value?.created_by?.map((c) => c.name).join(', ') ?? null
  );
  const topCast = computed(
    () =>
      credits.value?.cast
        ?.slice(0, 4)
        .map((c) => c.name)
        .join(', ') ?? null
  );
  const tvCountries = computed(
    () => tv.value?.origin_country?.slice(0, 1).join(', ') ?? null
  );

  const activeSeasonNumber = computed(() => {
    const firstSeason = tv.value?.seasons?.find((s) => s.season_number != null);
    return firstSeason?.season_number ?? 1;
  });

  const activeSeason = computed(() => {
    return seasonEpisodes.value[activeSeasonNumber.value] ?? null;
  });

  const episodeDuration = computed(() => {
    const firstEpisode = activeSeason.value?.episodes?.[0];
    const minutes =
      firstEpisode?.runtime ?? tv.value?.episode_run_time?.[0] ?? 0;
    if (!minutes) return null;

    const mins = minutes % 60;
    return `${mins} мин`;
  });

  const spokenLanguages = computed(
    () =>
      tv.value?.spoken_languages?.map((l) => l.english_name).join(', ') ?? null
  );

  const topSimilarTvFormatted = computed(
    () =>
      similar.value?.results
        ?.slice(0, 4)
        .filter((item): item is typeof item & { id: number } => !!item.id)
        .map((item) => ({
          id: item.id!,
          title: item.name ?? '',
          vote_average: item.vote_average ?? 0,
          image: buildImage(item.backdrop_path ?? item.poster_path ?? ''),
          genres: buildMovieGenres(item.genre_ids),
          link: tvPage(item.id!),
        })) ?? []
  );

  watch(
    () => route.params.id,
    (newId) => {
      if (!newId) return;
      tvStore.loadTv(Number(newId));
    },
    { immediate: true }
  );

  onUnmounted(() => {
    tvStore.reset();
  });
</script>

<style scoped></style>
