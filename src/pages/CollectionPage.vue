<template>
  <section>
    <h1>{{ collection?.title || 'Коллекция' }}</h1>
    <p>Здесь будут фильмы коллекции "{{ collection?.title }}"</p>
  </section>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { COLLECTIONS } from '@/config/collections.constants.ts';

  const route = useRoute();
  const slug = route.params.slug as string;

  const collection = COLLECTIONS.find((c) => c.slug === slug);
</script>

<style scoped>
  h1 {
    margin: 30px 0;
  }
</style>
