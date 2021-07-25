import {Theme} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {BLACK, DEEP_PURPLE_300, DEEP_PURPLE_500, ERROR_DARK, ERROR_LIGHT, TEAL_500, WHITE} from '../constants/Colors';

export type NavigatorTheme = Theme & {
  colors: {
    secondary: string;
    error: string;
    iconColor: string;
    secondaryText: string;
    disabledText: string;
    onPrimary: string;
    onSecondary: string;
  };
};

export const DefaultNavigatorTheme: NavigatorTheme = {
  dark: false,
  colors: {
    primary: DEEP_PURPLE_500,
    secondary: TEAL_500,
    error: ERROR_LIGHT,
    background: '#F2F2F2',
    card: WHITE,

    text: `${BLACK}DE`,
    secondaryText: `${BLACK}8A`,
    disabledText: `${BLACK}61`,
    onPrimary: BLACK,
    onSecondary: WHITE,

    border: `${BLACK}1F`,
    iconColor: `${BLACK}61`,

    notification: DEEP_PURPLE_500,
  },
};

export const DarkNavigatorTheme: NavigatorTheme = {
  dark: true,
  colors: {
    primary: DEEP_PURPLE_300,
    secondary: TEAL_500,
    error: ERROR_DARK,
    background: BLACK,
    card: '#121212',

    text: WHITE,
    secondaryText: `${WHITE}B3`,
    disabledText: `${WHITE}80`,
    onPrimary: WHITE,
    onSecondary: WHITE,

    border: `${WHITE}1F`,
    iconColor: `${WHITE}80`,

    notification: DEEP_PURPLE_300,
  },
};

const NavigatorThemeContext = React.createContext({
  navigatorTheme: DefaultNavigatorTheme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNavigatorTheme: (theme: NavigatorTheme) => {},
});

export const NavigatorThemeProvider: React.FC = ({children}) => {
  const [navigatorTheme, setNavigatorTheme] = useState(DefaultNavigatorTheme);

  return (
    <NavigatorThemeContext.Provider value={{navigatorTheme, setNavigatorTheme}}>
      {children}
    </NavigatorThemeContext.Provider>
  );
};

export const NavigatorThemeContextConsumer = NavigatorThemeContext.Consumer;

export const useNavigatorTheme = () => useContext(NavigatorThemeContext);

export const useNavigatorThemeColors = () => useContext(NavigatorThemeContext).navigatorTheme.colors;
