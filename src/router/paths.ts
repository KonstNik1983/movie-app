export const ROUTES_OLD = {
  home: '/',
  movies: '/movies',
  series: '/series',
  collections: '/collections',
};

export const ROUTES = {
  home: {
    name: 'HomeView',
    path: '',
  },
  movies: {
    name: 'MoviesView',
    path: 'movies',
  },
  series: {
    name: 'SeriesView',
    path: 'series',
  },
  collections: {
    name: 'CollectionsView',
    path: 'collections',
  },
  collection: {
    name: 'CollectionPage',
    path: 'collections/:slug',
  },
  movie: {
    name: 'MoviePage',
    path: 'movies/:id',
  },
} as const;

export const moviePage = (id?: number | string) => (id ? `/movies/${id}` : '#');

export const collectionPage = (slug: string) => `/collections/${slug}`;
