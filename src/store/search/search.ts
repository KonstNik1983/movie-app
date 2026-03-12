import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import debounce from 'lodash/debounce';

import {
  searchMulti,
  searchPerson,
  trendingAll,
  trendingPeople,
} from '@/api/tmdb';
import type {
  SearchMulti200ResultsItem,
  TrendingAll200ResultsItem,
  TrendingPeople200ResultsItem,
  TrendingTv200ResultsItem,
} from '@/api/types';

import { useToast } from 'vue-toastification';
import { isRussian } from '@/utils/string-helpers';

export const useSearchStore = defineStore('search', () => {
  const toast = useToast();

  const query = ref('');
  const results = ref<SearchMulti200ResultsItem[]>([]);
  const personResults = ref<TrendingPeople200ResultsItem[]>([]);
  const isLoading = ref(false);

  const popularMovies = ref<TrendingAll200ResultsItem[]>([]);
  const popularTv = ref<TrendingTv200ResultsItem[]>([]);
  const popularPeople = ref<TrendingPeople200ResultsItem[]>([]);

  const movieResults = computed(() =>
    results.value.filter((item) => item.media_type === 'movie')
  );

  const tvResults = computed(() =>
    results.value.filter((item) => item.media_type === 'tv')
  );

  const displayedMovies = computed(() =>
    query.value.length >= 2 ? movieResults.value : popularMovies.value
  );
  const displayedTv = computed<TrendingTv200ResultsItem[]>(() =>
    query.value.length >= 2 ? tvResults.value : popularTv.value
  );
  const displayedPeople = computed<TrendingPeople200ResultsItem[]>(() =>
    query.value.length >= 2 ? personResults.value : popularPeople.value
  );

  const performSearch = debounce(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      results.value = [];
      personResults.value = [];
      isLoading.value = false;
      return;
    }

    isLoading.value = true;
    try {
      const response = await searchMulti({ query: searchQuery });
      results.value = response.data.results ?? [];

      const peopleResp = await searchPerson({ query: searchQuery });
      personResults.value = (peopleResp.data.results ?? []).filter((person) =>
        person.name ? isRussian(person.name) : false
      );
    } catch (error) {
      toast.error('Ошибка поиска');
    } finally {
      isLoading.value = false;
    }
  }, 400);

  const searchMedia = (searchQuery: string) => {
    query.value = searchQuery;
    performSearch(searchQuery);
  };

  const loadPopular = async () => {
    try {
      const response = await trendingAll({}, 'week');
      const items = response.data.results ?? [];

      popularMovies.value = items.filter((i) => i.media_type === 'movie');
      popularTv.value = items.filter((i) => i.media_type === 'tv');

      const peopleResponse = await trendingPeople({}, 'week');
      popularPeople.value = (peopleResponse.data.results ?? []).filter(
        (person) => person.name && isRussian(person.name)
      );
    } catch (error) {
      toast.error('Ошибка загрузки популярных медиа');
    }
  };

  const cancelSearch = () => {
    performSearch.cancel();
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
    cancelSearch,
  };
});
