export interface UserMediaCard {
  id: number;
  title: string;
  image: string;
  rating: number | undefined;
  genres: string;
  link: string;
  media: 'Фильм' | 'Сериал';
}
