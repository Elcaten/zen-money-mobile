export const getLocalePrefix = (locale: string) => {
  return locale.substring(0, 2).toLocaleLowerCase();
};
