import { defineStore } from 'pinia';
import { useSliderStore } from '@/store/slider/slider.ts';

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
        // const movieStore = useMovieStore();
        const sliderStore = useSliderStore();

        await Promise.all([
          // movieStore.loadHomeData(),
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
