import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { discoverTv } from '@/api/tmdb';
import { HOME_TV_GENRES } from '@/constants/constants';
import { buildImage, buildMovieGenres } from '@/utils/movie.utils';
import { tvPage } from '@/router/paths';
import { getSettledDataApi } from '@/utils/promise';

import type { TvGenreSection, TvByGenre } from '@/store/series/series.types';
import type { discoverTvResponse200 } from '@/api/tmdb';

import { useToast } from 'vue-toastification';
const toast = useToast();

export const useTvStore = defineStore('tvStore', () => {
  const tvSections = ref<TvGenreSection[]>([]);
  const isLoading = ref(false);

  const formattedTvSections = computed(() =>
    tvSections.value.map((section) => ({
      genre: section.genre,
      movies: section.tv.map((tv: TvByGenre) => ({
        id: tv.id!,
        title: tv.name ?? tv.original_name ?? '',
        image: buildImage(tv.backdrop_path ?? tv.poster_path ?? ''),
        rating: tv.vote_average?.toFixed(1) ?? '',
        genres: buildMovieGenres(tv.genre_ids),
        link: tvPage(tv.id),
      })),
    }))
  );

  const loadTv = async () => {
    isLoading.value = true;

    try {
      const promises = HOME_TV_GENRES.map((genre) =>
        discoverTv({ with_genres: String(genre.id) })
      );

      const results = await Promise.allSettled(promises);

      tvSections.value = results.map((res, index): TvGenreSection => {
        const genre = HOME_TV_GENRES[index];
        if (!genre) throw new Error('Жанр не найден');

        const data = getSettledDataApi<discoverTvResponse200>(res)?.data;
        const tv: TvByGenre[] = data?.results?.slice(0, 4) ?? [];

        return {
          genre: { id: Number(genre.id), title: genre.title },
          tv,
        };
      });
    } catch (error) {
      toast.error('Ошибка загрузки сериалов по жанру!');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    tvSections,
    formattedTvSections,
    loadTv,
    isLoading,
  };
});
