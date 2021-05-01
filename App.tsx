import React, {useState} from 'react';
import {LogBox} from 'react-native';
import {ThemeProvider as ElementsThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OverflowMenuProvider} from 'react-navigation-header-buttons';
import {QueryClient, QueryClientProvider} from 'react-query';
import {PersistGate} from 'zustand-persist';
import {Text, View} from './components';
import useCachedResources from './hooks/useCachedResources';
import {Root} from './Root';
import {useStore} from './store/use-store';
import {DefaultElementsTheme, DefaultNavigatorTheme, NavigatorThemeProvider, useElementsTheme} from './themes';

LogBox.ignoreLogs(['Setting a timer']);

const queryClient = new QueryClient();

const Loading = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Loading...</Text>
  </View>
);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [navigatorTheme, setNavigatorTheme] = useState(DefaultNavigatorTheme);
  const {elementsTheme} = useElementsTheme();

  // Must call useStore to bootstrap persistence or will stop on loading screen
  useStore();

  return (
    <PersistGate>
      {isLoadingComplete ? (
        <NavigatorThemeProvider value={{navigatorTheme, setNavigatorTheme}}>
          <ElementsThemeProvider theme={elementsTheme ?? DefaultElementsTheme}>
            <OverflowMenuProvider>
              <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                  <Root />
                </QueryClientProvider>
              </SafeAreaProvider>
            </OverflowMenuProvider>
          </ElementsThemeProvider>
        </NavigatorThemeProvider>
      ) : (
        <Loading />
      )}
    </PersistGate>
  );
}
