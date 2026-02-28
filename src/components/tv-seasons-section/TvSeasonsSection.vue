<template>
  <div class="tv-seasons-section">
    <div class="season-tabs">
      <button
        v-for="season in visibleSeasons"
        :key="season.season_number"
        class="season-tab__btn"
        :class="{ active: season.season_number === activeSeasonNumber }"
        @click="activeSeasonNumber = season.season_number ?? 1"
      >
        {{ season.name || 'Сезон ' + season.season_number }}
      </button>
      <span v-if="extraSeasonsCount > 0" class="more-seasons">
        +{{ extraSeasonsCount }}
      </span>
    </div>

    <div class="episodes-list" v-if="activeSeasonEpisodes?.episodes?.length">
      <div
        class="episode-card"
        v-for="episode in first4Episodes"
        :key="episode.id"
      >
        <img
          v-if="episode.still_path"
          :src="buildImage(episode.still_path)"
          alt="episode still"
          class="episode-card__img"
        />
        <div class="episode-info">
          <h4>{{ episode.episode_number }}. {{ episode.name }}</h4>
        </div>
      </div>
    </div>

    <span v-if="extraEpisodesText" class="more-episodes">
      {{ extraEpisodesText }}
    </span>

    <div v-else>Загрузка эпизодов...</div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useTvPageStore } from '@/store/tv/tv';
  import { buildImage } from '@/utils/movie.utils';
  import type { TvSeasonDetails200 } from '@/api/types';

  const props = defineProps<{
    tvId: number;
    seasons: { season_number?: number; name?: string }[];
  }>();

  const store = useTvPageStore();

  const activeSeasonNumber = ref(
    props.seasons.find((s) => s.season_number !== 0)!.season_number ?? 1
  );

  const filteredSeasons = computed(() =>
    props.seasons.filter(
      (s) => s.season_number !== 0 && s.season_number != null
    )
  );

  const visibleSeasons = computed(() => filteredSeasons.value.slice(0, 5));

  const extraSeasonsCount = computed(() =>
    filteredSeasons.value.length > 5 ? filteredSeasons.value.length - 5 : 0
  );

  const activeSeasonEpisodes = computed<TvSeasonDetails200 | null>(() => {
    const seasonNumber = activeSeasonNumber.value;

    if (store.seasonEpisodes[seasonNumber]) {
      return store.seasonEpisodes[seasonNumber];
    }

    store.loadSeason(props.tvId, seasonNumber);
    return null;
  });

  const first4Episodes = computed(
    () => activeSeasonEpisodes.value?.episodes?.slice(0, 4) || []
  );

  function formatEpisodesCount(count: number) {
    if (count % 10 === 1 && count % 100 !== 11) return `${count} серия`;
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100))
      return `${count} серии`;
    return `${count} серий`;
  }

  const extraEpisodesText = computed(() => {
    const total = activeSeasonEpisodes.value?.episodes?.length ?? 0;
    const extra = total - 4;
    if (extra > 0) return `+ ${formatEpisodesCount(extra)}`;
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
    border-radius: 4px;
  }
  .episode-info {
    margin-top: 15px;
  }
</style>
