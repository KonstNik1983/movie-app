import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getSettledData } from '@/utils/promise';

import type {
  TvSeriesDetails200,
  TvSeriesCredits200,
  TvSeriesReviews200,
  TvSeriesSimilar200,
  TvSeriesContentRatings200,
} from '@/api/types';

import {
  tvSeriesDetails,
  tvSeriesCredits,
  tvSeriesReviews,
  tvSeriesContentRatings,
} from '@/api/tmdb';

import { tvSimilar } from '@/store/tv/tv.types.ts';

export const useTvPageStore = defineStore('tvPageStore', () => {
  const tv = ref<TvSeriesDetails200 | null>(null);
  const credits = ref<TvSeriesCredits200 | null>(null);
  const reviews = ref<TvSeriesReviews200 | null>(null);
  const similar = ref<TvSeriesSimilar200 | null>(null);
  const contentRatings = ref<TvSeriesContentRatings200 | null>(null);
  const isLoading = ref(false);

  const loadTv = async (tvId: number) => {
    isLoading.value = true;

    try {
      const results = await Promise.allSettled([
        tvSeriesDetails(tvId),
        tvSeriesCredits(tvId),
        tvSeriesReviews(tvId, { language: 'en-US' }),
        tvSimilar(tvId),
        tvSeriesContentRatings(tvId),
      ]);

      const [
        detailsResult,
        creditsResult,
        reviewsResult,
        similarResult,
        ratingsResult,
      ] = results;

      tv.value = getSettledData<TvSeriesDetails200>(detailsResult);
      credits.value = getSettledData<TvSeriesCredits200>(creditsResult);
      reviews.value = getSettledData<TvSeriesReviews200>(reviewsResult);
      similar.value = getSettledData<TvSeriesSimilar200>(similarResult);
      contentRatings.value =
        getSettledData<TvSeriesContentRatings200>(ratingsResult);
    } catch (error) {
      console.error('Ошибка загрузки данных сериала:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    tv,
    credits,
    reviews,
    similar,
    contentRatings,
    loadTv,
  };
});
