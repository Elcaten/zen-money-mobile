import React from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OverflowMenuProvider} from 'react-navigation-header-buttons';
import {QueryClient, QueryClientProvider as QCProvider} from 'react-query';
import {PersistGate} from 'zustand-persist';
import {Text, View} from './components';
import useCachedResources from './hooks/useCachedResources';
import {Root} from './Root';
import {useStore} from './store/use-store';
import {ElementsThemeProvider, NavigatorThemeProvider} from './themes';
import {composeProviders} from './utils';

LogBox.ignoreLogs(['Setting a timer']);

const queryClient = new QueryClient();
const QueryClientProvider: React.FC = ({children}) => {
  return <QCProvider client={queryClient}>{children}</QCProvider>;
};

const Loading: React.FC = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Loading...</Text>
  </View>
);

export default function App() {
  const isLoadingComplete = useCachedResources();

  // Must call useStore to bootstrap persistence or will stop on loading screen
  useStore();

  const WrappedApp = composeProviders(
    NavigatorThemeProvider,
    ElementsThemeProvider,
    OverflowMenuProvider,
    SafeAreaProvider,
    QueryClientProvider,
  )(Root);

  return <PersistGate>{isLoadingComplete ? <WrappedApp /> : <Loading />}</PersistGate>;
}
