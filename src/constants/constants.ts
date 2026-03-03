import placeholderImg from '@/assets/placeholder-movie.jpg';

export const PLACEHOLDER_IMAGE = placeholderImg;
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const IMAGE_SIZES = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
} as const;

export interface HomeGenre {
  id: number;
  title: string;
}

export type HomeGenresMap = Record<number, string>;

export const HOME_MOVIE_GENRES: HomeGenresMap = {
  35: 'Комедии',
  18: 'Драмы',
  14: 'Фэнтези',
  53: 'Триллеры',
  9648: 'Детективы',
};

export const HOME_TV_GENRES: HomeGenresMap = {
  35: 'Комедии',
  18: 'Драмы',
  10765: 'Фантастика',
  9648: 'Детективы',
  80: 'Криминал',
};
