import type { MovieNowPlayingList200ResultsItem } from '@/api/types';

export interface SliderState {
  slides: MovieNowPlayingList200ResultsItem[]
  isLoading: boolean
}