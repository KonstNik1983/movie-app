import avatar from '@/assets/icons/avatar.png';
import avatarIronman from '@/assets/icons/avatar-ironman.png';
import avatarYoda from '@/assets/icons/avatar-yoda.png';
import avatar64 from '@/assets/icons/avatar-64.png';

export interface Advantage {
  id: number;
  title: string;
  text: string;
  icon: string;
}

export const ADVANTAGES: Advantage[] = [
  {
    id: 1,
    title: 'Большой выбор',
    text: '10 000 фильмов и сериалов уже в библиотеке. Ежедневное пополнение новинками кино',
    icon: avatar,
  },
  {
    id: 2,
    title: 'Рекомендации',
    text: 'Персонализированный список рекомендаций, подобранных на основе ваших интересов',
    icon: avatarIronman,
  },
  {
    id: 3,
    title: 'Лучшее мировое кино',
    text: 'Кино, сериалы со всего мира, включая Европу и Азию. А так же достойное российское кино',
    icon: avatarYoda,
  },
  {
    id: 4,
    title: 'Месяц бесплатно',
    text: 'Весь каталог КиноДома, и все новинки кино и сериалов бесплатно целый месяц после регистрации',
    icon: avatar64,
  },
];
