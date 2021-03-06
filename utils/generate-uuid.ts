export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
    // eslint-disable-next-line no-bitwise
    const seed = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const hexValue = char === 'x' ? seed : (seed & 0x3) | 0x8;
    return hexValue.toString(16);
  });
}
