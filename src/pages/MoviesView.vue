<template>
  <div>
    <h2>TMDB Debug</h2>
    <pre>{{ response }}</pre>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const response = ref<any>(null);

  onMounted(async () => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      console.log('TMDB API Key:', apiKey);

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ru-RU&page=1`
      );
      const data = await res.json();
      response.value = data;
      console.log('TMDB Response:', data);
    } catch (err) {
      console.error('Ошибка запроса к TMDB:', err);
      response.value = { error: err };
    }
  });
</script>
