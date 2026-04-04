import comicsJpg from '@/assets/collectionsImg/comics.jpg';
import comicsWebp from '@/assets/collectionsImg/comics.webp';
import fantasyJpg from '@/assets/collectionsImg/fantasy.jpg';
import fantasyWebp from '@/assets/collectionsImg/fantasy.webp';
import animeJpg from '@/assets/collectionsImg/anime.jpg';
import animeWebp from '@/assets/collectionsImg/anime.webp';
import satiricalJpg from '@/assets/collectionsImg/satirical-series.jpg';
import satiricalWebp from '@/assets/collectionsImg/satirical-series.webp';

export interface CollectionConfig {
  id: number;
  title: string;
  slug: string;
  genreId: number;
  type: 'movie' | 'tv';
  backgroundImage: {
    webp: string;
    jpg: string;
  };
}

export const COLLECTIONS: CollectionConfig[] = [
  {
    id: 1,
    title: 'Любителям \n комиксов',
    slug: 'comics',
    genreId: 878,
    type: 'movie',
    backgroundImage: { webp: comicsWebp, jpg: comicsJpg },
  },
  {
    id: 2,
    title: 'Классика \n фентези',
    slug: 'fantasy',
    genreId: 14,
    type: 'movie',
    backgroundImage: { webp: fantasyWebp, jpg: fantasyJpg },
  },
  {
    id: 3,
    title: 'Японские \n мультфильмы',
    slug: 'anime',
    genreId: 16,
    type: 'movie',
    backgroundImage: { webp: animeWebp, jpg: animeJpg },
  },
  {
    id: 4,
    title: 'Сатирические \n мультсериалы',
    slug: 'satirical-series',
    genreId: 16,
    type: 'tv',
    backgroundImage: { webp: satiricalWebp, jpg: satiricalJpg },
  },
];
