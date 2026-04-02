import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useSliderStore } from '@/store/slider/slider.ts';
import { useMoviesStore } from '@/store/movies/movies.ts';
import { useTvStore } from '@/store/series/series.ts';

import { useToast } from 'vue-toastification';
const toast = useToast();

export const useHomePageStore = defineStore('homePage', () => {
  const sliderStore = useSliderStore();
  const movieStore = useMoviesStore();
  const tvStore = useTvStore();

  const isLoading = ref(false);

  const loadHomePage = async () => {
    if (isLoading.value) return;

    isLoading.value = true;

    try {
      await Promise.all([
        sliderStore.loadSlider(),
        movieStore.loadMovies(),
        tvStore.loadTv(),
      ]);
    } catch {
      toast.error('Home page load error!');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    sliderStore,
    movieStore,
    tvStore,
    isLoading,
    loadHomePage,
  };
});
