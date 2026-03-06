import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { discoverMovie } from '@/api/tmdb';

import { buildImage, buildMovieGenres } from '@/utils/movie.utils';
import { capitalize } from '@/utils/capitalize';
import { moviePage } from '@/router/paths';
import { getSettledDataApi } from '@/utils/promise';

import { useGenreStore } from '@/store/genre/genre';

import type {
  MovieGenreSection,
  MovieByGenre,
} from '@/store/movies/movies.types';

import type { discoverMovieResponse200 } from '@/api/tmdb';

import { useToast } from 'vue-toastification';
const toast = useToast();

export const useMoviesStore = defineStore('moviesStore', () => {
  const genreStore = useGenreStore();

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
        media: 'Фильм',
      })),
    }))
  );

  const formattedHomeMovieSections = computed(() =>
    formattedMovieSections.value.slice(0, 3)
  );

  const loadMovies = async () => {
    isLoading.value = true;

    try {
      if (!genreStore.allGenres.length) {
        await genreStore.loadGenres();
      }

      const genres = genreStore.allGenres.slice(0, 6);

      const promises = genres.map((genre) =>
        discoverMovie({ with_genres: String(genre.id) })
      );

      const results = await Promise.allSettled(promises);

      movieSections.value = results.map((res, index): MovieGenreSection => {
        const genre = genres[index];
        if (!genre) throw new Error('Жанр не найден');

        const data = getSettledDataApi<discoverMovieResponse200>(res)?.data;

        const movies: MovieByGenre[] = data?.results?.slice(0, 4) ?? [];

        return {
          genre: { id: Number(genre.id), title: capitalize(genre.name!) },
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
    formattedHomeMovieSections,
    loadMovies,
    isLoading,
  };
});
