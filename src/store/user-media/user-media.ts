import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { MovieDetails200, TvSeriesDetails200 } from '@/api/types';
import type { UserMediaCard } from '@/store/user-media/user-media.typse';
import { movieDetails, tvSeriesDetails } from '@/api/tmdb';

import { getSettledData } from '@/utils/promise';
import { buildImage } from '@/utils/movie.utils';
import { moviePage } from '@/router/paths';

import { useToast } from 'vue-toastification';

const toast = useToast();

export const useUserMediaStore = defineStore('userMediaStore', () => {
  const userMedia = ref<UserMediaCard[]>([]);
  const isLoading = ref(false);

  const mediaTitle = (data: MovieDetails200 | TvSeriesDetails200) => {
    if ('title' in data) return data.title;
    if ('name' in data) return data.name;
    return '';
  };

  const mediaGenres = (data: MovieDetails200 | TvSeriesDetails200) => {
    return (
      data.genres
        ?.map((item) => item.name)
        .slice(0, 2)
        .join(', ') ?? ''
    );
  };

  const loadUserMedia = async (
    mediaList: { id: number; type: 'movie' | 'tv' }[]
  ) => {
    if (!mediaList.length) return;

    isLoading.value = true;

    try {
      const promises = mediaList.map((item) => {
        if (item.type === 'movie') {
          return movieDetails(item.id);
        } else {
          return tvSeriesDetails(item.id);
        }
      });

      const results = await Promise.allSettled(promises);

      userMedia.value = results
        .map((response, index) => {
          const data = getSettledData(response);
          if (!data) return null;
          const item = mediaList[index];

          return {
            id: data.id,
            title: mediaTitle(data),
            image: buildImage(data.backdrop_path ?? ''),
            rating: data.vote_average,
            genres: mediaGenres(data),
            link: moviePage(data.id),
            media: item?.type === 'movie' ? 'Фильм' : 'Сериал',
          };
        })
        .filter(Boolean) as typeof userMedia.value;
    } catch (error) {
      toast.error('Ошибка получения медиа');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    userMedia,
    loadUserMedia,
  };
});
