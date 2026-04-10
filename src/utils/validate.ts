import { pluralizeRu } from '@/utils/pluralize';

export const MIN_CHARS_MESSAGE = (char: number) =>
  `Минимум ${pluralizeRu(char, ['символ', 'символа', 'символов'])}`;

export const ERROR_REQUIRED = 'Поле обязательно';
