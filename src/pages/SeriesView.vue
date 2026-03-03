<template>
  <MediaSection
    title="Каталог сериалов"
    :sections="tvStore.formattedTvSections"
  />
</template>

<script setup lang="ts">
  import { useTvStore } from '@/store/series/series';
  import MediaSection from '@/components/media/MediaSections.vue';

  const tvStore = useTvStore();
</script>

<style scoped></style>
