import { ref } from 'vue';
import { defineStore } from 'pinia';

import type {
  MovieDetails200,
  MovieReviews200,
  MovieCredits200,
  MovieSimilar200,
  MovieReleaseDates200,
} from '@/api/types';

import {
  movieDetails,
  movieCredits,
  movieReviews,
  movieSimilar,
  movieReleaseDates,
} from '@/api/tmdb';

export const useMoviePageStore = defineStore('movieStore', () => {
  const movie = ref<MovieDetails200 | null>(null);
  const credits = ref<MovieCredits200 | null>(null);
  const reviews = ref<MovieReviews200 | null>(null);
  const similar = ref<MovieSimilar200 | null>(null);
  const releaseDates = ref<MovieReleaseDates200 | null>(null);
  const isLoading = ref(false);

  const loadMovie = async (movieId: number) => {
    isLoading.value = true;

    try {
      const results = await Promise.allSettled([
        movieDetails(movieId),
        movieCredits(movieId),
        movieReviews(movieId, { language: 'en-US' }),
        movieSimilar(movieId),
        movieReleaseDates(movieId),
      ]);

      const getData = <T>(res: PromiseSettledResult<{ data: T }>): T | null => {
        return res.status === 'fulfilled' ? res.value.data : null;
      };

      movie.value = getData<MovieDetails200>(results[0]);
      credits.value = getData<MovieCredits200>(results[1]);
      reviews.value = getData<MovieReviews200>(results[2]);
      similar.value = getData<MovieSimilar200>(results[3]);
      releaseDates.value = getData<MovieReleaseDates200>(results[4]);
    } catch (error) {
      console.error('Ошибка загрузки данных фильма:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    movie,
    credits,
    reviews,
    similar,
    releaseDates,
    isLoading,
    loadMovie,
  };
});
