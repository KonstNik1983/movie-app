<template>
  <div class="slider">
    <div class="slider__viewport" ref="emblaRef">
      <div class="slider__container">
        <div class="slider__slide" v-for="movie in mediaState" :key="movie.id">
          <img class="slider__image" :src="movie.image" :alt="movie.title" />

          <div class="slider__info">
            <h2 class="slider__title">{{ movie.title }}</h2>
            <span
              class="slider__label"
              :class="{
                'slider__label--in-cinema': isInCinema(movie),
                'slider__label--upcoming': !isInCinema(movie),
              }"
            >
              Премьера • {{ getReleaseLabel(movie) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <button class="slider__btn slider__btn--prev" @click="scrollPrev">←</button>

    <button class="slider__btn slider__btn--next" @click="scrollNext">→</button>
  </div>
</template>

<script setup lang="ts">
  import useEmblaCarousel from 'embla-carousel-vue';
  import { ref, onMounted } from 'vue';
  import placeholder from '@/assets/placeholder-movie.jpg';

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
  const IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';

  interface Movie {
    id: number;
    title: string;
    type: 'Фильм' | 'Сериал';
    image: string;
    release_date: string;
  }

  interface TMDBMovie {
    id: number;
    title?: string;
    name?: string;
    backdrop_path?: string | null;
    poster_path?: string | null;
    release_date?: string;
    first_air_date?: string;
  }

  const mediaState = ref<Movie[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  function scrollPrev() {
    if (emblaApi.value) emblaApi.value.scrollPrev();
  }

  function scrollNext() {
    if (emblaApi.value) emblaApi.value.scrollNext();
  }

  async function fetchMedia(type: 'movie' | 'tv'): Promise<Movie[]> {
    const url = `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=ru-RU&page=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!Array.isArray(data.results)) {
        console.error('Некорректный ответ API премьер', data);

        return [];
      }

      return data.results.map((item: TMDBMovie) => {
        const path = item.backdrop_path ?? item.poster_path;

        return {
          id: item.id,
          title: item.title || item.name,
          type: type === 'movie' ? 'Фильм' : 'Сериал',
          image: buildImage(path),
          release_date: item.release_date ?? item.first_air_date ?? '',
        };
      });
    } catch (error) {
      console.error('Ошибка при получении премьер:', error);

      return [];
    }
  }

  function getReleaseLabel(movie: Movie): string {
    if (!movie.release_date) return '';

    const today = new Date();
    const release = new Date(movie.release_date);

    return release <= today
      ? 'В прокате'
      : release.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
  }

  function isInCinema(movie: Movie): boolean {
    if (!movie.release_date) return false;
    const today = new Date();
    const release = new Date(movie.release_date);
    return release <= today;
  }

  function buildImage(path: string | null | undefined): string {
    if (path) {
      return `${IMAGE_BASE}${path}`;
    }

    return placeholder;
  }

  function shuffleArray<T>(arr: T[]): T[] {
    return arr.sort(() => Math.random() - 0.5);
  }

  onMounted(async (): Promise<void> => {
    const movies = await fetchMedia('movie');
    const tvs = await fetchMedia('tv');
    mediaState.value = shuffleArray([...movies, ...tvs]).slice(0, 7);
  });
</script>

<style scoped>
  .slider {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .slider__viewport {
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
  }

  .slider__container {
    display: flex;
  }

  .slider__slide {
    flex: 0 0 100%;
    display: flex;
    flex-direction: column;
  }

  .slider__image {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    max-height: 400px;
    display: block;
    border-radius: 12px;
  }

  .slider__info {
    width: 100%;
    padding: 10px 0;
  }

  .slider__title {
    font-size: 24px;
    margin: 5px 0;
  }

  .slider__label {
    font-size: 16px;
    color: var(--color-text-secondary);
  }

  .slider__btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.2);
    border: none;
    color: var(--color-text-primary);
    font-size: 2rem;
    cursor: pointer;
    padding: 5px 8px;
    border-radius: 10px;
    z-index: 10;
  }

  .slider__btn--prev {
    left: 15px;
  }
  .slider__btn--next {
    right: 15px;
  }

  .slider__label--in-cinema {
    color: green;
  }

  .slider__label--upcoming {
    color: red;
  }
</style>
