import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { discoverTv } from '@/api/tmdb';
import { HOME_TV_GENRES } from '@/config/constants';
import { buildImage, buildMovieGenres } from '@/utils/movie.utils';

import type { TvGenreSection, TvByGenre } from '@/store/series/series.types';

export const useTvStore = defineStore('tvStore', () => {
  const tvSections = ref<TvGenreSection[]>([]);
  const isLoading = ref(false);

  const formattedTvSections = computed(() => {
    return tvSections.value.map((section) => ({
      genre: section.genre,
      movies: section.tv.map((tv: TvByGenre) => ({
        id: tv.id!,
        title: tv.name ?? tv.original_name ?? '',
        image: buildImage(tv.backdrop_path ?? tv.poster_path ?? ''),
        rating: tv.vote_average ?? '',
        genres: buildMovieGenres(tv.genre_ids),
      })),
    }));
  });

  const loadTv = async () => {
    isLoading.value = true;

    try {
      const promises = HOME_TV_GENRES.map(async (genre) => {
        const { data } = await discoverTv({ with_genres: String(genre.id) });
        const tv: TvByGenre[] = (data.results ?? []).slice(0, 4);
        return { genre, tv };
      });

      tvSections.value = await Promise.all(promises);
    } catch (error) {
      console.error('Ошибка загрузки сериалов по жанру:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    tvSections,
    formattedTvSections,
    loadTv,
  };
});
