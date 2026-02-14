import { defineStore } from 'pinia';
import {
  fetchGenres,
  fetchMediaByGenre,
  fetchFirstPoster,
} from '@/api/base.api';
import { shuffleArray } from '@/utils/movie.utils';

import type { Genre, Collection } from '@/types/movie.types';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    genres: [] as Genre[],
    collections: [] as Collection[],
    isLoading: false,
  }),

  actions: {
    async loadHomeData() {
      this.isLoading = true;

      this.genres = await fetchGenres();

      await Promise.all(
        this.genres.map(async (genre) => {
          const [movies, tvs] = await Promise.all([
            fetchMediaByGenre(genre.id, 'movie'),
            fetchMediaByGenre(genre.id, 'tv'),
          ]);

          genre.movies = shuffleArray([...movies, ...tvs]).slice(0, 4);
        })
      );

      this.collections = [
        {
          id: 1,
          title: 'Любителям \n комиксов',
          genreId: 878,
          type: 'movie',
          posterUrl: '',
        },
        {
          id: 2,
          title: 'Классика \n фентези',
          genreId: 14,
          type: 'movie',
          posterUrl: '',
        },
        {
          id: 3,
          title: 'Японские \n мультфильмы',
          genreId: 16,
          type: 'movie',
          posterUrl: '',
        },
        {
          id: 4,
          title: 'Сатирические \n мультсериалы',
          genreId: 16,
          type: 'tv',
          posterUrl: '',
        },
      ];

      for (const collection of this.collections) {
        await fetchFirstPoster(collection);
      }

      this.isLoading = false;
    },
  },
});
