<template>
  <router-link :to="link" class="media-card">
    <img class="media-card-img" :src="image" :alt="title" />
    <p class="media-card-text">⭐ {{ rating }} • {{ media }} • {{ genres }}</p>
    <h4 class="media-card-title">{{ title }}</h4>
  </router-link>
</template>

<script setup lang="ts">
  defineProps<{
    id: number;
    title: string;
    image: string;
    rating?: number | string;
    media: string;
    genres: string;
    link: string;
  }>();
</script>

<style scoped>
  .media-card {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  .media-card-img {
    width: 100%;
    height: 180px;
    border-radius: 8px;
    object-fit: cover;
  }
  .media-card-title {
    font-size: 16px;
  }
  .media-card-text {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
