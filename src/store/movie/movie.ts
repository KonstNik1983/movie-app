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
      const [detailsRes, creditsRes, reviewsRes, similarRes, releaseRes] =
        await Promise.all([
          movieDetails(movieId),
          movieCredits(movieId),
          movieReviews(movieId, { language: 'en-US' }),
          movieSimilar(movieId),
          movieReleaseDates(movieId),
        ]);

      console.log(
        detailsRes.data,
        creditsRes.data,
        reviewsRes.data,
        similarRes.data,
        releaseRes.data
      );

      movie.value = detailsRes.data;
      credits.value = creditsRes.data;
      reviews.value = reviewsRes.data;
      similar.value = similarRes.data;
      releaseDates.value = releaseRes.data;
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
    isLoading,
    releaseDates,
    loadMovie,
  };
});
