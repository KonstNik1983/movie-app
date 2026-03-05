import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getSettledData } from '@/utils/promise';

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

import { useToast } from 'vue-toastification';
const toast = useToast();

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

      const [
        detailsResult,
        creditsResult,
        reviewsResult,
        similarResult,
        releaseResult,
      ] = results;

      movie.value = getSettledData<MovieDetails200>(detailsResult);
      credits.value = getSettledData<MovieCredits200>(creditsResult);
      reviews.value = getSettledData<MovieReviews200>(reviewsResult);
      similar.value = getSettledData<MovieSimilar200>(similarResult);
      releaseDates.value = getSettledData<MovieReleaseDates200>(releaseResult);
    } catch (error) {
      toast.error('Ошибка загрузки данных фильма!');
    } finally {
      isLoading.value = false;
    }
  };

  const reset = () => {
    movie.value = null;
    credits.value = null;
    reviews.value = null;
    similar.value = null;
    releaseDates.value = null;
    isLoading.value = false;
  };

  return {
    movie,
    credits,
    reviews,
    similar,
    releaseDates,
    isLoading,
    loadMovie,
    reset,
  };
});
