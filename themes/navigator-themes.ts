import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import React, {useContext} from 'react';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export type NavigatorTheme = Theme & {
  colors: {
    iconColor: string;
    tintColor: string;
  };
};

export const DefaultNavigatorTheme: NavigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    iconColor: '#656566',
    tintColor: tintColorLight,
  },
};

export const DarkNavigatorTheme: NavigatorTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: '#D7D7D7',
    iconColor: '#D7D7D7',
    tintColor: tintColorDark,
  },
};

const NavigatorThemeContext = React.createContext({
  navigatorTheme: DefaultNavigatorTheme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNavigatorTheme: (theme: NavigatorTheme) => {},
});

export const NavigatorThemeProvider = NavigatorThemeContext.Provider;
export const useNavigatorTheme = () => useContext(NavigatorThemeContext);

export const useNavigatorThemeColors = () => useContext(NavigatorThemeContext).navigatorTheme.colors;
