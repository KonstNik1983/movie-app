import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export function formatDate(value?: string): string {
  return dayjs(value).format('D MMMM YYYY');
}
