const hexColorByArgb = new Map<number, string>();

export function argbToHEX(color: number) {
  if (!hexColorByArgb.has(color)) {
    // eslint-disable-next-line no-bitwise
    hexColorByArgb.set(color, '#' + ('000000' + (color & 0xffffff).toString(16)).slice(-6));
  }
  return hexColorByArgb.get(color)!;
}
