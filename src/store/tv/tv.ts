import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getSettledData } from '@/utils/promise';

import type {
  TvSeriesDetails200,
  TvSeasonDetails200,
  TvSeriesCredits200,
  TvSeriesReviews200,
  TvSeriesSimilar200,
  TvSeriesContentRatings200,
} from '@/api/types';

import {
  tvSeriesDetails,
  tvSeasonDetails,
  tvSeriesCredits,
  tvSeriesReviews,
  tvSeriesContentRatings,
} from '@/api/tmdb';

import { tvSimilar } from '@/store/tv/tv.types.ts';

import { useToast } from 'vue-toastification';
const toast = useToast();

export const useTvPageStore = defineStore('tvPageStore', () => {
  const tv = ref<TvSeriesDetails200 | null>(null);
  const seasonEpisodes = ref<Record<number, TvSeasonDetails200>>({});
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
      seasonEpisodes.value = {};
    }
  };

  const loadSeason = async (tvId: number, seasonNumber: number) => {
    if (seasonEpisodes.value[seasonNumber]) return;
    isLoading.value = true;
    try {
      const response = await tvSeasonDetails(tvId, seasonNumber);
      seasonEpisodes.value[seasonNumber] = response.data;
    } catch (error) {
      toast.error('Ошибка загрузки данных сезона!');
    } finally {
      isLoading.value = false;
    }
  };

  const reset = () => {
    tv.value = null;
    seasonEpisodes.value = {};
    credits.value = null;
    reviews.value = null;
    similar.value = null;
    contentRatings.value = null;
    isLoading.value = false;
  };

  return {
    tv,
    seasonEpisodes,
    credits,
    reviews,
    similar,
    contentRatings,
    loadTv,
    loadSeason,
    reset,
  };
});
