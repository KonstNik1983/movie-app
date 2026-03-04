export function pluralizeRu(count: number, forms: [string, string, string]) {
  if (count % 10 === 1 && count % 100 !== 11) return `${count} ${forms[0]}`;
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100))
    return `${count} ${forms[1]}`;
  return `${count} ${forms[2]}`;
}
