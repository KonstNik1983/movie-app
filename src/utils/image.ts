import { IMAGE_BASE_URL } from '@/constants/img.constants';

export const buildAvatarUrl = (path?: string) => {
  if (!path) return 'https://i.pravatar.cc/100?img=3';

  if (path.includes('http')) {
    return path.replace(/^\/+/, '');
  }

  return `${IMAGE_BASE_URL}w185${path}`;
};
