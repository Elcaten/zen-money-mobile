export const flatten = <T>(array: T[][]): T[] => {
  return ([] as T[]).concat(...array);
};
