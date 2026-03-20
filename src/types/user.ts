interface UserMedia {
  id: number;
  type: 'movie' | 'tv';
}

export interface User {
  id: string;
  username: string;
  password: string;
  favorites: UserMedia[];
  watchList: UserMedia[];
}
