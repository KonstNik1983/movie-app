import { defineStore } from 'pinia';
import { fetchMedia } from '@/api/slider.api';
import { shuffleArray } from '@/utils/movie.utils';

import type { Movie } from '@/types/movie.types';

export const useSliderStore = defineStore('slider', {
  state: () => ({
    slides: [] as Movie[],
    isLoading: false,
  }),

  actions: {
    async loadSlider() {
      this.isLoading = true;

      try {
        const [movies, tvs] = await Promise.all([
          fetchMedia('movie'),
          fetchMedia('tv'),
        ]);

        this.slides = shuffleArray([...movies, ...tvs]).slice(0, 7);
      } catch (error) {
        console.error('Ошибка загрузки слайдера:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
