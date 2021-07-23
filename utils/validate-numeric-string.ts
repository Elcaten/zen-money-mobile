export const validateNumericString = (value: string) => {
  const num = Number.parseInt(value, 10);
  return !isNaN(num) && num > 0;
};
