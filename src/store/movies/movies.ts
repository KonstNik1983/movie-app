import { defineStore } from 'pinia';
import { discoverMovie } from '@/api/tmdb';
import { HOME_GENRES } from '@/config/constants';
import { buildImage } from '@/utils/movie.utils';

import { buildMovieGenres } from '@/utils/movie.utils';

import type {
  GenreSection,
  MovieByGenre,
  MoviesByGenreState,
} from '@/store/movies/movies.types.ts';

export const useMoviesStore = defineStore('moviesStore', {
  state: (): MoviesByGenreState => ({
    sections: [],
    isLoading: false,
  }),

  getters: {
    formattedSections(state) {
      const sections = state.sections;

      const result = sections.map((section) => ({
        genre: section.genre,
        movies: section.movies.map((movie: MovieByGenre) => ({
          id: movie.id!,
          title: movie.title ?? movie.original_title ?? '',
          image: buildImage(movie.backdrop_path ?? movie.poster_path ?? ''),
          rating: movie.vote_average ?? '',
          genres: buildMovieGenres(movie.genre_ids),
        })),
      }));

      return result;
    },
  },

  actions: {
    async loadMovies() {
      this.isLoading = true;

      try {
        const promises = HOME_GENRES.map(async (genre) => {
          const { data } = await discoverMovie({
            with_genres: String(genre.id),
          });

          const movies: MovieByGenre[] = (data.results ?? []).slice(0, 4);

          return {
            genre,
            movies,
          } as GenreSection;
        });

        const sections = await Promise.all(promises);
        this.sections = sections;
      } catch (error) {
        console.error('Ошибка загрузки фильмов по жанру:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
