import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { buildImage } from '@/utils/movie.utils';
import { movieNowPlayingList } from '@/api/tmdb';
import type { MovieNowPlayingList200ResultsItem } from '@/api/types';

import { useToast } from 'vue-toastification';
const toast = useToast();

export const useSliderStore = defineStore('sliderStore', () => {
  const slides = ref<MovieNowPlayingList200ResultsItem[]>([]);
  const isLoading = ref(false);

  const formattedSlides = computed(() => {
    return slides.value.map((movie) => ({
      id: movie.id,
      title: movie.title ?? movie.original_title ?? '',
      image: buildImage(
        movie.backdrop_path ?? movie.poster_path ?? '',
        'medium'
      ),
      release_date: movie.release_date ?? '',
    }));
  });

  const loadSlider = async () => {
    isLoading.value = true;

    try {
      const response = await movieNowPlayingList();
      const { data: movies } = response;

      slides.value = movies?.results ?? [];
    } catch {
      toast.error('Ошибка загрузки слайдера!');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    slides,
    formattedSlides,
    loadSlider,
  };
});
