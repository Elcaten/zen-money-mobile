import {exhaustiveCheck} from './exhaustive-check';

export type FontSize = 'tiny' | 'small' | 'medium' | 'large' | 'giant';

export function getFontSize(size?: FontSize) {
  switch (size) {
    case 'tiny':
      return 12;
    case 'small':
      return 14;
    case undefined:
    case 'medium':
      return 16;
    case 'large':
      return 18;
    case 'giant':
      return 20;
    default:
      exhaustiveCheck(size);
  }
}
