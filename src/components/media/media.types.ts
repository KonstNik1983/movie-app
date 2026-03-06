export interface FormattedMedia {
  id: number;
  title: string;
  image: string;
  rating: string | number;
  genres: string;
  link: string;
  media: string;
}

export interface FormattedSection {
  genre: { id: number; title: string };
  movies: FormattedMedia[];
}
