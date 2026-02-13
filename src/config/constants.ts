import placeholderImg from '@/assets/placeholder-movie.jpg';

export const PLACEHOLDER_IMAGE = placeholderImg;
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const IMAGE_SIZES = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
} as const;

export const GENRE_TITLES: Record<number, string> = {
  35: 'Комедии',
  18: 'Драмы',
  14: 'Фэнтези',
  53: 'Триллеры',
  9648: 'Детективы',
};

export const ALLOWED_GENRE_IDS = [35, 18, 14, 53, 9648];
