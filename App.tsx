import React, {useState} from 'react';
import {LogBox} from 'react-native';
import {ThemeProvider as ElementsThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import useCachedResources from './hooks/useCachedResources';
import {Root} from './Root';
import {DefaultElementsTheme, DefaultNavigatorTheme, NavigatorThemeProvider, useElementsTheme} from './themes';

LogBox.ignoreLogs(['Setting a timer']);

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [navigatorTheme, setNavigatorTheme] = useState(DefaultNavigatorTheme);
  const {elementsTheme} = useElementsTheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigatorThemeProvider value={{navigatorTheme, setNavigatorTheme}}>
        <ElementsThemeProvider theme={elementsTheme ?? DefaultElementsTheme}>
          <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
              <Root />
            </QueryClientProvider>
          </SafeAreaProvider>
        </ElementsThemeProvider>
      </NavigatorThemeProvider>
    );
  }
}
