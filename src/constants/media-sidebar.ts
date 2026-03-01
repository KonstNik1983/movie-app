export interface SidebarProps {
  rating?: string | number;
  genres?: string | null;
  director?: string | null;
  cast?: string | null;
  countries?: string | null;
  duration?: string | null;
  languages?: string | null;
}

export const MEDIA_SIDEBAR_ROWS: { key: keyof SidebarProps; label: string }[] =
  [
    { key: 'rating', label: 'Рейтинг' },
    { key: 'genres', label: 'Жанр' },
    { key: 'director', label: 'Режиссёр' },
    { key: 'cast', label: 'В ролях' },
    { key: 'countries', label: 'Страна' },
    { key: 'duration', label: 'Длительность' },
    { key: 'languages', label: 'Аудио' },
  ];
