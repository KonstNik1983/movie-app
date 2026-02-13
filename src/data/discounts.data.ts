import ricSanches from '@/assets/icons/ric-sanches.png';
import gin from '@/assets/icons/gin.png';
import type { ButtonVariant } from '@/types/ui.types';

export interface Discount {
  id: number;
  title: string;
  text: string;
  icon: string;
  buttonText: string;
  buttonVariant: ButtonVariant;
}

export const DISCOUNTS: Discount[] = [
  {
    id: 1,
    title: 'Скидка 50% на активность в сервисе',
    text: 'Смотри кино, принимай участие в развитии сервиса: пиши рецензии, собирай подборки из фильмов и сериалов, проходи квизы. Копи баллы и получай скидку 50% на любой тариф при следующей оплате подписки на КиноДом.',
    icon: ricSanches,
    buttonText: 'Подробнее',
    buttonVariant: 'ghost',
  },
  {
    id: 2,
    title: 'Скидка для студентов 50%',
    text: 'Просто приложи фото действующего студенческого билета при оформлении подписки и наслаждайся кино! Важно: скидка действует до конца текущего года. Студенческая скидка не суммируется с другими акциями сервиса.',
    icon: gin,
    buttonText: 'Я студент, хочу скидку',
    buttonVariant: 'primary',
  },
];
