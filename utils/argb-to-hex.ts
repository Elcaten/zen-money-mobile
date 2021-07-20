const hexColorByArgb = new Map<number, string>();

export function argbToHEX(color: number) {
  if (!hexColorByArgb.has(color)) {
    // eslint-disable-next-line no-bitwise
    hexColorByArgb.set(color, '#' + ('000000' + (color & 0xffffff).toString(16)).slice(-6));
  }
  return hexColorByArgb.get(color)!;
}

export function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    // eslint-disable-next-line no-bitwise
    return (r << 16) + (g << 8) + (b << 0);
  }
  return null;
}
