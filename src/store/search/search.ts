import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { searchMulti, trendingAll } from '@/api/tmdb';
import type {
  SearchMulti200ResultsItem,
  TrendingAll200ResultsItem,
} from '@/api/types';

import { useToast } from 'vue-toastification';

export const useSearchStore = defineStore('search', () => {
  const toast = useToast();

  const query = ref('');
  const results = ref<SearchMulti200ResultsItem[]>([]);
  const isLoading = ref(false);

  const popularMovies = ref<TrendingAll200ResultsItem[]>([]);
  const popularTv = ref<TrendingAll200ResultsItem[]>([]);
  const popularPeople = ref<TrendingAll200ResultsItem[]>([]);

  const movieResults = computed(() =>
    results.value.filter((item) => item.media_type === 'movie')
  );

  const tvResults = computed(() =>
    results.value.filter((item) => item.media_type === 'tv')
  );

  const personResults = computed(() =>
    results.value.filter((item) => item.media_type === 'person')
  );

  const displayedMovies = computed(() =>
    query.value.length >= 2 ? movieResults.value : popularMovies.value
  );
  const displayedTv = computed(() =>
    query.value.length >= 2 ? tvResults.value : popularTv.value
  );
  const displayedPeople = computed(() =>
    query.value.length >= 2 ? personResults.value : popularPeople.value
  );

  let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
  const DEBOUNCE_DELAY = 400;

  const searchMedia = (q: string) => {
    query.value = q;

    if (debounceTimeout) clearTimeout(debounceTimeout);

    if (!q || q.length < 2) {
      results.value = [];
      isLoading.value = false;
      return;
    }

    debounceTimeout = setTimeout(async () => {
      isLoading.value = true;
      try {
        const response = await searchMulti({ query: q });
        results.value = response.data.results ?? [];
      } catch (error) {
        toast.error('Ошибка поиска');
      } finally {
        isLoading.value = false;
      }
    }, DEBOUNCE_DELAY);
  };

  const loadPopular = async () => {
    try {
      const response = await trendingAll({}, 'week');
      const items = response.data.results ?? [];

      popularMovies.value = items.filter((i) => i.media_type === 'movie');
      popularTv.value = items.filter((i) => i.media_type === 'tv');
      popularPeople.value = items.filter((i) => i.media_type === 'person');
    } catch (e: any) {
      toast.error('Ошибка загрузки популярных медиа');
    }
  };

  const reset = () => {
    query.value = '';
    results.value = [];
    isLoading.value = false;
  };

  return {
    query,
    results,
    isLoading,

    popularMovies,
    popularTv,
    popularPeople,

    movieResults,
    tvResults,
    personResults,

    displayedMovies,
    displayedTv,
    displayedPeople,

    searchMedia,
    loadPopular,
    reset,
  };
});
