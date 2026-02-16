import { defineStore } from 'pinia';
import { genreMovieList } from '@/api/tmdb';
import type { GenreState } from './genre.types';

export const useGenreStore = defineStore('genreStore', {
  state: (): GenreState => ({
    allGenres: [],
    isLoading: false,
  }),

  getters: {
    getGenreById: (state) => (id: number) =>
      state.allGenres.find((g) => g.id === id),
  },

  actions: {
    async loadGenres() {
      this.isLoading = true;

      try {
        const { data } = await genreMovieList();
        this.allGenres = data.genres ?? [];
      } catch (error) {
        console.error('Ошибка загрузки жанров:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
