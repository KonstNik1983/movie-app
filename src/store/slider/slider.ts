import { defineStore } from 'pinia';
import { buildImage } from '@/utils/movie.utils';
import { movieNowPlayingList } from '@/api/tmdb.ts';
import type { SliderState } from '@/store/slider/slider.types.ts';

export const useSliderStore = defineStore('sliderStore', {
  state: (): SliderState => ({
    slides: [],
    isLoading: false,
  }),

  getters: {
    formattedSlides(state) {
      const slides = state.slides;

      const result = slides.map((movie) => ({
        id: movie.id,
        title: movie.title ?? movie.original_title ?? '',
        image: buildImage(
          movie.backdrop_path ?? movie.poster_path ?? '',
          'medium'
        ),
        release_date: movie.release_date ?? '',
      }));

      return result;
    },
  },

  actions: {
    async loadSlider() {
      this.isLoading = true;

      try {
        const results = await Promise.allSettled([movieNowPlayingList()]);

        const data = results.filter((item) => item.status === 'fulfilled');
        const [moviesResponse] = data;

        const { data: movies } = moviesResponse?.value ?? {};

        this.slides = movies?.results ?? [];
      } catch (error) {
        console.error('Ошибка загрузки слайдера:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
