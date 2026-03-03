import placeholderImg from '@/assets/placeholder-movie.jpg';

export const PLACEHOLDER_IMAGE = placeholderImg;
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const IMAGE_SIZES = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
} as const;

type HomeGenre = {
  id: number;
  title: string;
};

export const HOME_MOVIE_GENRES: HomeGenre[] = [
  { id: 35, title: 'Комедии' },
  { id: 18, title: 'Драмы' },
  { id: 14, title: 'Фэнтези' },
  { id: 53, title: 'Триллеры' },
  { id: 9648, title: 'Детективы' },
];

export const HOME_TV_GENRES: HomeGenre[] = [
  { id: 35, title: 'Комедии' },
  { id: 18, title: 'Драмы' },
  { id: 10765, title: 'Фантастика' },
  { id: 9648, title: 'Детективы' },
  { id: 80, title: 'Криминал' },
];
