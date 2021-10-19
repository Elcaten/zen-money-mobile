import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {FullTheme, ThemeContext, useTheme} from 'react-native-elements';
import {DarkNavigatorTheme, DefaultNavigatorTheme} from './navigator-themes';

declare type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type ElementsTheme = RecursivePartial<FullTheme>;

export const DefaultElementsTheme: ElementsTheme = {
  // ButtonGroup: {
  //   containerStyle: {
  //     borderColor: DefaultNavigatorTheme.colors.border,
  //   },
  //   buttonStyle: {
  //     backgroundColor: DefaultNavigatorTheme.colors.background,
  //   },
  //   textStyle: {
  //     color: DefaultNavigatorTheme.colors.text,
  //   },
  // },
  colors: {
    primary: DefaultNavigatorTheme.colors.primary,
    secondary: DefaultNavigatorTheme.colors.secondary,
    white: '#ffffff',
    black: '#242424',
    grey0: '#393e42',
    grey1: '#43484d',
    grey2: '#5e6977',
    grey3: '#86939e',
    grey4: '#bdc6cf',
    grey5: '#e1e8ee',
    greyOutline: '#bbb',
    searchBg: '#303337',
    success: '#52c41a',
    error: '#ff190c',
    warning: '#faad14',
    disabled: 'hsl(208, 8%, 90%)',
    // Darker color if hairlineWidth is not thin enough
    divider: StyleSheet.hairlineWidth < 1 ? 'rgba(0, 0, 0, 0.24)' : 'rgba(0, 0, 0, 0.12)',
    platform: {
      ios: {
        primary: DefaultNavigatorTheme.colors.primary,
        secondary: DefaultNavigatorTheme.colors.secondary,
        grey: '#7d7d7d',
        searchBg: '#dcdce1',
        success: '#4cd964',
        error: '#ff3b30',
        warning: '#ffcc00',
      },
      android: {
        primary: DefaultNavigatorTheme.colors.primary,
        secondary: DefaultNavigatorTheme.colors.secondary,
        grey: 'rgba(0, 0, 0, 0.54)',
        searchBg: '#dcdce1',
        success: '#4caf50',
        error: '#f44336',
        warning: '#ffeb3b',
      },
      web: {
        primary: DefaultNavigatorTheme.colors.primary,
        secondary: DefaultNavigatorTheme.colors.secondary,
        grey: '#393e42',
        searchBg: '#303337',
        success: '#52c41a',
        error: '#ff190c',
        warning: '#faad14',
      },
      default: {
        primary: DefaultNavigatorTheme.colors.primary,
        secondary: DefaultNavigatorTheme.colors.secondary,
        grey: '#7d7d7d',
        searchBg: '#dcdce1',
        success: '#4cd964',
        error: '#ff3b30',
        warning: '#ffcc00',
      },
    },
  },
};

export const DarkElementsTheme: ElementsTheme = {
  // ButtonGroup: {
  //   containerStyle: {
  //     borderColor: DarkNavigatorTheme.colors.border,
  //   },
  //   buttonStyle: {
  //     backgroundColor: DarkNavigatorTheme.colors.background,
  //   },
  //   textStyle: {
  //     color: DarkNavigatorTheme.colors.text,
  //   },
  // },
  colors: {
    primary: DarkNavigatorTheme.colors.primary,
    secondary: DarkNavigatorTheme.colors.secondary,
    white: '#242424', // default 080808
    black: '#f2f2f2',
    grey5: '#393e42',
    grey4: '#43484d',
    grey3: '#5e6977',
    grey2: '#86939e',
    grey1: '#bdc6cf',
    grey0: '#e1e8ee',
    greyOutline: '#bbb',
    searchBg: '#303337',
    success: '#439946',
    error: '#bf2c24',
    warning: '#cfbe27',
    disabled: 'hsl(208, 8%, 90%)',
    // Darker color if hairlineWidth is not thin enough
    divider: StyleSheet.hairlineWidth < 1 ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.12)',
    platform: {
      ios: {
        primary: DarkNavigatorTheme.colors.primary,
        secondary: DarkNavigatorTheme.colors.secondary,
        grey: '#ffffff',
        searchBg: '#393e42',
        success: '#439946',
        error: '#bf2c24',
        warning: '#cfbe27',
      },
      android: {
        primary: DarkNavigatorTheme.colors.primary,
        secondary: DarkNavigatorTheme.colors.secondary,
        grey: '#393e42',
        searchBg: '#393e42',
        success: '#439946',
        error: '#bf2c24',
        warning: '#cfbe27',
      },
      web: {
        primary: DarkNavigatorTheme.colors.primary,
        secondary: DarkNavigatorTheme.colors.secondary,
        grey: '#ffffff',
        searchBg: '#393e42',
        success: '#439946',
        error: '#bf2c24',
        warning: '#cfbe27',
      },
      default: {
        primary: DarkNavigatorTheme.colors.primary,
        secondary: DarkNavigatorTheme.colors.secondary,
        grey: '#ffffff',
        searchBg: '#393e42',
        success: '#439946',
        error: '#bf2c24',
        warning: '#cfbe27',
      },
    },
  },
};

export const useElementsTheme = () => {
  const {theme, replaceTheme} = useTheme();
  const elementsTheme = theme as Partial<FullTheme>;
  return {elementsTheme, setElementsTheme: replaceTheme};
};

export const ElementsThemeProvider: React.FC = ({children}) => {
  const [elementsTheme, setElementsTheme] = useState(DefaultElementsTheme);

  return (
    <ThemeContext.Provider
      value={{
        theme: elementsTheme as any,
        updateTheme: setElementsTheme,
        replaceTheme: setElementsTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
