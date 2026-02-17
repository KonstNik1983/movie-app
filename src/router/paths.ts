export const ROUTES = {
  home: '/',
  movies: '/movies',
  series: '/series',
  collections: '/collections',
};

export const moviePage = (id?: number | string) => (id ? `/movies/${id}` : '#');

export const collectionPage = (slug: string) => `/collections/${slug}`;
