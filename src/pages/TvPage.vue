<template>
  <MediaHero
    :title="tv?.name ?? ''"
    :backdrop="backdropImg"
    :meta="tvMeta"
    primaryButtonText="Смотреть сериал"
  />

  <TvSeasonsSection
    v-if="tv?.seasons?.length"
    :tv-id="Number(route.params.id)"
    :seasons="
      tv.seasons
        .filter((s) => s.season_number != null)
        .map((s) => ({ season_number: s.season_number!, name: s.name }))
    "
  />

  <section class="media-details">
    <h2 class="media-details__title">О сериале</h2>
    <div class="media-details__container">
      <div>
        <MediaReviews
          :reviews="reviews?.results ?? []"
          :overview="tv?.overview"
        />
      </div>

      <MediaSidebarInfo
        :rating="formattedRating"
        :genres="tvGenres"
        :director="creator"
        :cast="topCast"
        :countries="tvCountries"
        :duration="episodeDuration"
        :languages="spokenLanguages"
      />
    </div>
  </section>

  <MediaSimilar
    :title="tv?.name"
    :movies="topSimilarTv"
    :getImage="getSimilarImage"
    :getMediaLink="tvPage"
    :buildGenres="getTvGenres"
  />
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useTvPageStore } from '@/store/tv/tv';

  import MediaHero from '@/components/media/MediaHero.vue';
  import TvSeasonsSection from '@/components/tv-seasons-section/TvSeasonsSection.vue';
  import MediaReviews from '@/components/media/MediaReviews.vue';
  import MediaSidebarInfo from '@/components/media/MediaSidebarInfo.vue';
  import MediaSimilar from '@/components/media/MediaSimilar.vue';

  import type { TvSeriesSimilar200ResultsItem } from '@/api/types';

  import { buildImage, getTvGenres } from '@/utils/movie.utils';
  import { tvPage } from '@/router/paths';

  const route = useRoute();
  const tvStore = useTvPageStore();
  const { tv, credits, reviews, similar, seasonEpisodes } =
    storeToRefs(tvStore);

  const backdropImg = computed(() => {
    if (!tv.value) return '';
    return buildImage(tv.value.backdrop_path ?? tv.value.poster_path ?? '');
  });

  const firstAirYear = computed(() => tv.value?.first_air_date?.split('-')[0]);

  const episodeRuntime = computed(() => {
    const runtime = tv.value?.episode_run_time?.[0];
    if (!runtime) return null;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours} ч ${minutes} мин`;
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
    if (firstAirYear.value) parts.push(firstAirYear.value);
    if (genres.value) parts.push(genres.value);
    if (episodeRuntime.value) parts.push(episodeRuntime.value);
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
        ?.slice(0, 5)
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

  const topSimilarTv = computed(
    () =>
      similar.value?.results
        ?.slice(0, 4)
        .map((tv) => ({ ...tv, title: tv.name })) ?? []
  );

  const getSimilarImage = (item: TvSeriesSimilar200ResultsItem) =>
    buildImage(item.backdrop_path ?? item.poster_path ?? '');

  watch(
    () => route.params.id,
    (newId) => {
      if (!newId) return;
      tvStore.loadTv(Number(newId));
    },
    { immediate: true }
  );
</script>

<style scoped></style>
