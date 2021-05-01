import {Platform} from 'react-native';
import {colors, FullTheme, useTheme} from 'react-native-elements';

declare type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type ElementsTheme = RecursivePartial<FullTheme>;

export const DefaultElementsTheme: ElementsTheme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

export const DarkElementsTheme: ElementsTheme = {
  colors: {
    primary: '#5b8fb9',
    secondary: '#814d8a',
  },
};

export const useElementsTheme = () => {
  const {theme, replaceTheme} = useTheme();
  const elementsTheme = theme as Partial<FullTheme>;
  return {elementsTheme, setElementsTheme: replaceTheme};
};
