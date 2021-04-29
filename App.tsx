import React, {useState} from 'react';
import {LogBox} from 'react-native';
import {ThemeProvider as ElementsThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {PersistGate} from 'zustand-persist';
import {Text} from './components';
import useCachedResources from './hooks/useCachedResources';
import {Root} from './Root';
import {useStore} from './store/use-store';
import {DefaultElementsTheme, DefaultNavigatorTheme, NavigatorThemeProvider, useElementsTheme} from './themes';

LogBox.ignoreLogs(['Setting a timer']);

const queryClient = new QueryClient();

const Loading = () => <Text>Loading App...</Text>;

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [navigatorTheme, setNavigatorTheme] = useState(DefaultNavigatorTheme);
  const {elementsTheme} = useElementsTheme();

  // Must call useStore to bootstrap persistence or will stop on loading screen
  useStore();

  return (
    <PersistGate loading={<Loading />}>
      {isLoadingComplete ? (
        <NavigatorThemeProvider value={{navigatorTheme, setNavigatorTheme}}>
          <ElementsThemeProvider theme={elementsTheme ?? DefaultElementsTheme}>
            <SafeAreaProvider>
              <QueryClientProvider client={queryClient}>
                <Root />
              </QueryClientProvider>
            </SafeAreaProvider>
          </ElementsThemeProvider>
        </NavigatorThemeProvider>
      ) : (
        <Loading />
      )}
    </PersistGate>
  );
}
