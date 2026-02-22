export interface FormattedMedia {
  id: number;
  title: string;
  image: string;
  rating: string | number;
  genres: string;
}

export interface FormattedSection {
  genre: { id: number; title: string };
  movies: FormattedMedia[];
}
