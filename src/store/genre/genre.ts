import { defineStore } from "pinia";
import { genreMovieList, genreTvList } from "@/api/tmdb";
import type { GenreState } from "./genre.types";

export const useGenreStore = defineStore("genreStore", {
  state: (): GenreState => ({
    allGenres: [],
    allTvGenres: [],
    isLoading: false,
  }),

  getters: {
    getGenreById: (state) => (id: number) => state.allGenres.find((g) => g.id === id),

    getTvGenreById: (state) => (id: number) => state.allTvGenres.find((g) => g.id === id),
  },

  actions: {
    async loadGenres() {
      this.isLoading = true;

      try {
        const { data } = await genreMovieList();
        this.allGenres = data.genres ?? [];
      } catch (error) {
        console.error("Ошибка загрузки жанров фильмов:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async loadTvGenres() {
      this.isLoading = true;

      try {
        const { data } = await genreTvList();
        this.allTvGenres = data.genres ?? [];
      } catch (error) {
        console.error("Ошибка загрузки жанров сериалов:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
