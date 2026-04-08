<template>
  <div class="tv-seasons-section">
    <div class="season-tabs">
      <button
        type="button"
        v-for="season in visibleSeasons"
        :key="season.season_number"
        class="season-tab__btn"
        :class="{ active: season.season_number === activeSeasonNumber }"
        @click="activeSeasonNumber = season.season_number ?? 1"
      >
        {{ 'Сезон ' + season.season_number }}
      </button>
      <span v-if="extraSeasonsCount > 0" class="more-seasons">
        + {{ extraSeasonsCount }}
      </span>
    </div>

    <div class="episodes-list" v-if="activeSeasonEpisodes?.episodes?.length">
      <div
        class="episode-card"
        v-for="episode in first4Episodes"
        :key="episode.id"
      >
        <img
          :src="buildImage(episode.still_path)"
          alt="episode still"
          class="episode-card__img"
          loading="lazy"
        />
        <div class="episode-info">
          <h4>{{ episode.episode_number }}. {{ episode.name }}</h4>
        </div>
      </div>
    </div>

    <div v-else class="skeleton-grid">
      <MovieCardSkeleton v-for="n in 4" :key="n" />
    </div>

    <span v-if="extraEpisodesText" class="more-episodes">
      {{ extraEpisodesText }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useTvPageStore } from '@/store/tv/tv';
  import { buildImage } from '@/utils/movie.utils';
  import type { TvSeasonDetails200 } from '@/api/types';
  import { pluralizeRu } from '@/utils/pluralize';
  import MovieCardSkeleton from '@/components/skeletons/movie-card-skeleton/MovieCardSkeleton.vue';

  const props = defineProps<{
    tvId: number;
    seasons: { season_number?: number; name?: string }[];
  }>();

  const store = useTvPageStore();

  const activeSeasonNumber = ref(
    props.seasons.find((season) => season.season_number !== 0)!.season_number ??
      1
  );

  watch(
    activeSeasonNumber,
    (seasonNumber) => {
      if (!store.seasonEpisodes[seasonNumber]) {
        store.loadSeason(props.tvId, seasonNumber);
      }
    },
    { immediate: true }
  );

  const filteredSeasons = computed(() =>
    props.seasons.filter(
      (season) => season.season_number !== 0 && season.season_number != null
    )
  );

  const visibleSeasons = computed(() => filteredSeasons.value.slice(0, 5));

  const extraSeasonsCount = computed(() =>
    filteredSeasons.value.length > 5 ? filteredSeasons.value.length - 5 : 0
  );

  const activeSeasonEpisodes = computed<TvSeasonDetails200 | null>(() => {
    return store.seasonEpisodes[activeSeasonNumber.value] ?? null;
  });

  const first4Episodes = computed(
    () => activeSeasonEpisodes.value?.episodes?.slice(0, 4) ?? []
  );

  const extraEpisodesText = computed(() => {
    const total = activeSeasonEpisodes.value?.episodes?.length ?? 0;
    const extra = total - first4Episodes.value.length;
    if (extra > 0)
      return `+ ${pluralizeRu(extra, ['серия', 'серии', 'серий'])}`;
    return null;
  });
</script>

<style scoped>
  .tv-seasons-section {
    margin-top: 60px;
  }
  .season-tabs {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
  }
  .season-tab__btn {
    padding: 8px 18px;
    cursor: pointer;
    border: 1px solid var(--color-text-primary);
    background: transparent;
    color: var(--color-text-primary);
  }
  .season-tab__btn.active {
    color: var(--color-btn-primary);
  }

  .more-seasons {
    display: flex;
    align-items: center;
    padding-left: 8px;
    font-weight: bold;
  }

  .more-episodes {
    min-height: 50px;
    display: inline-flex;
    padding: 18px 25px;
    margin-top: 30px;
    border: 1px solid var(--color-text-primary);
  }

  .episodes-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .episode-card__img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 4px;
  }
  .episode-info {
    margin-top: 15px;
  }

  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
</style>
