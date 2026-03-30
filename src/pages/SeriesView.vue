<template>
  <MediaSection
    title="Каталог сериалов"
    :sections="tvStore.formattedTvSections"
    :isLoading="tvStore.isLoading"
    :genresCount="6"
  />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';

  import { useTvStore } from '@/store/series/series';
  import MediaSection from '@/components/media-sections/MediaSections.vue';

  const tvStore = useTvStore();

  onMounted(() => {
    tvStore.loadTv();
  });
</script>

<style scoped></style>
