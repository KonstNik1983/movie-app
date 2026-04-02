export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const isRussian = (str: string) => /[А-Яа-яЁё]/.test(str);
