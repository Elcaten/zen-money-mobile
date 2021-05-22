import {LIGHT_GRAY} from '../../constants/Colors';
import {hexToRgb} from '../../utils';

export const TagColor = {
  NoColor: hexToRgb(LIGHT_GRAY)!, //TODO: fix wrong color
  /** #fb8d01 */
  VividOrange: 16485633,
  /** #43a047 */
  LimeGreen: 4431943,
  /** #1564c0 */
  StrongBlue: 1402048,
  /** #29b6f6 */
  BrightBlue: 2733814,
  /** #cc3077 */
  StrongPink: 13381751,
  /** #9c26b0 */
  DarkMagenta: 10233520,
};

export const tagColors = Object.values(TagColor) as number[];
