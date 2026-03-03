import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { discoverMovie } from '@/api/tmdb';
import { HOME_MOVIE_GENRES } from '@/constants/constants';
import { buildImage, buildMovieGenres } from '@/utils/movie.utils';
import { moviePage } from '@/router/paths';
import { getSettledDataApi } from '@/utils/promise';

import type {
  MovieGenreSection,
  MovieByGenre,
} from '@/store/movies/movies.types';

import type { discoverMovieResponse200 } from '@/api/tmdb';

import { useToast } from 'vue-toastification';
const toast = useToast();

export const useMoviesStore = defineStore('moviesStore', () => {
  const movieSections = ref<MovieGenreSection[]>([]);
  const isLoading = ref(false);

  const formattedMovieSections = computed(() =>
    movieSections.value.map((section) => ({
      genre: section.genre,
      movies: section.movies.map((movie: MovieByGenre) => ({
        id: movie.id!,
        title: movie.title ?? movie.original_title ?? '',
        image: buildImage(movie.backdrop_path ?? movie.poster_path ?? ''),
        rating: movie.vote_average?.toFixed(1) ?? '',
        genres: buildMovieGenres(movie.genre_ids),
        link: moviePage(movie.id),
      })),
    }))
  );

  const loadMovies = async () => {
    isLoading.value = true;

    try {
      const promises = HOME_MOVIE_GENRES.map((genre) =>
        discoverMovie({ with_genres: String(genre.id) })
      );

      const results = await Promise.allSettled(promises);

      movieSections.value = results.map((res, index): MovieGenreSection => {
        const genre = HOME_MOVIE_GENRES[index];
        if (!genre) throw new Error('Жанр не найден');

        const data = getSettledDataApi<discoverMovieResponse200>(res)?.data;

        const movies: MovieByGenre[] = data?.results?.slice(0, 4) ?? [];

        return {
          genre: { id: Number(genre.id), title: genre.title },
          movies,
        };
      });
    } catch (error) {
      toast.error('Ошибка загрузки фильмов по жанру!');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    movieSections,
    formattedMovieSections,
    loadMovies,
    isLoading,
  };
});
