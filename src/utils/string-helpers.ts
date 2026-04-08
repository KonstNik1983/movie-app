import { pluralizeRu } from '@/utils/pluralize';

export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const isRussian = (str: string) => /[А-Яа-яЁё]/.test(str);

export const MIN_CHARS_MESSAGE = (char: number) =>
  `Минимум ${pluralizeRu(char, ['символ', 'символа', 'символов'])}`;
