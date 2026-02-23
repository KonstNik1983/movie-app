import { defineStore } from 'pinia';
import { useSliderStore } from '@/store/slider/slider.ts';
import { useMoviesStore } from '@/store/movies/movies.ts';
import { useGenreStore } from '@/store/genre/genre.ts';

export const useInitStore = defineStore('init', {
  state: () => ({
    isInitialized: false,
    isLoading: false,
  }),

  actions: {
    async init() {
      if (this.isInitialized || this.isLoading) return;

      this.isLoading = true;

      try {
        const movieStore = useMoviesStore();
        const sliderStore = useSliderStore();
        const genreStore = useGenreStore();

        await Promise.all([
          genreStore.loadGenres(),
          movieStore.loadMovies(),
          sliderStore.loadSlider(),
        ]);

        this.isInitialized = true;
      } catch (error) {
        console.error('App init error:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
