<template>
  <MediaSection
    title="Каталог сериалов"
    :sections="tvStore.formattedTvSections"
    :getMediaLink="tvPage"
  />
</template>

<script setup lang="ts">
  import { useTvStore } from '@/store/series/series';
  import MediaSection from '@/components/media/MediaSections.vue';
  import { tvPage } from '@/router/paths';

  const tvStore = useTvStore();
</script>

<style scoped></style>
