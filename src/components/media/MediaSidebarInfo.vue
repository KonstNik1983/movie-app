<template>
  <aside class="media-sidebar-info">
    <div v-if="rating" class="media-sidebar-info__row">
      <span class="label">Рейтинг:</span>
      <span class="value">{{ rating }}</span>
    </div>

    <div v-if="genres" class="media-sidebar-info__row">
      <span class="label">Жанр:</span>
      <span class="value">{{ genres }}</span>
    </div>

    <div v-if="director" class="media-sidebar-info__row">
      <span class="label">Режиссёр:</span>
      <span class="value">{{ director }}</span>
    </div>

    <div v-if="cast" class="media-sidebar-info__row">
      <span class="label">В ролях:</span>
      <span class="value">{{ cast }}</span>
    </div>

    <div v-if="countries" class="media-sidebar-info__row">
      <span class="label">Страна:</span>
      <span class="value">{{ countries }}</span>
    </div>

    <div v-if="duration" class="media-sidebar-info__row">
      <span class="label">Длительность:</span>
      <span class="value">{{ duration }}</span>
    </div>

    <div v-if="languages" class="media-sidebar-info__row">
      <span class="label">Аудио:</span>
      <span class="value">{{ languages }}</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
  defineProps<{
    rating?: string | number;
    genres?: string | null;
    director?: string | null;
    cast?: string | null;
    countries?: string | null;
    duration?: string | null;
    languages?: string | null;
  }>();
</script>

<style scoped>
  .media-sidebar-info {
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .media-sidebar-info__row {
    display: grid;
    grid-template-columns: 30% 70%;
    align-items: start;
  }

  .label {
    color: var(--color-text-secondary);
    font-weight: 600;
  }

  .value {
    max-width: 200px;
    color: var(--color-text-primary);
  }
</style>
