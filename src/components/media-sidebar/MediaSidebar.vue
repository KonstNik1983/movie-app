<template>
  <aside v-if="isLoading">
    <MediaSidebarSkeleton />
  </aside>
  <aside v-else class="media-sidebar-info">
    <div v-for="item in sidebarItems" :key="item.label" class="media-sidebar-info__row">
      <span class="label">{{ item.label }}</span>
      <span class="value">{{ item.value ?? "—" }}</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import MediaSidebarSkeleton from "../skeletons/media-sidebar-skeleton/MediaSidebarSkeleton.vue";

const props = defineProps<{
  rating?: string | number | null;
  genres?: string | null;
  director?: string | null;
  cast?: string | null;
  countries?: string | null;
  duration?: string | null;
  languages?: string | null;
  isLoading: boolean;
}>();

const sidebarItems = computed(() => [
  { label: "Рейтинг", value: props.rating },
  { label: "Жанр", value: props.genres },
  { label: "Режиссёр", value: props.director },
  { label: "В ролях", value: props.cast },
  { label: "Страна", value: props.countries },
  { label: "Длительность", value: props.duration },
  { label: "Аудио", value: props.languages },
]);
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
