import comicsImg from '@/assets/collectionsImg/comics.jpg';
import fantasyImg from '@/assets/collectionsImg/fantasy.jpg';
import animeImg from '@/assets/collectionsImg/anime.jpg';
import satiricalImg from '@/assets/collectionsImg/satirical-series.jpg';

export interface CollectionConfig {
  id: number;
  title: string;
  slug: string;
  genreId: number;
  type: 'movie' | 'tv';
  backgroundImage: string;
}

export const COLLECTIONS: CollectionConfig[] = [
  {
    id: 1,
    title: 'Любителям \n комиксов',
    slug: 'comics',
    genreId: 878,
    type: 'movie',
    backgroundImage: comicsImg,
  },
  {
    id: 2,
    title: 'Классика \n фентези',
    slug: 'fantasy',
    genreId: 14,
    type: 'movie',
    backgroundImage: fantasyImg,
  },
  {
    id: 3,
    title: 'Японские \n мультфильмы',
    slug: 'anime',
    genreId: 16,
    type: 'movie',
    backgroundImage: animeImg,
  },
  {
    id: 4,
    title: 'Сатирические \n мультсериалы',
    slug: 'satirical-series',
    genreId: 16,
    type: 'tv',
    backgroundImage: satiricalImg,
  },
];
