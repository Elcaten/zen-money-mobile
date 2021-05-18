import React from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OverflowMenuProvider} from 'react-navigation-header-buttons';
import {QueryClient, QueryClientProvider as QCProvider} from 'react-query';
import {persistQueryClient} from 'react-query/persistQueryClient-experimental';
import {PersistGate} from 'zustand-persist';
import {createAsyncStoragePersistor} from './api/create-async-storage-persistor';
import {Text, View} from './components';
import useCachedResources from './hooks/useCachedResources';
import {Root} from './Root';
import {useStore} from './store/use-store';
import {ElementsThemeProvider, NavigatorThemeProvider} from './themes';
import {composeProviders} from './utils';
import './utils/augmentations';

LogBox.ignoreLogs(['Setting a timer']);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});
const queryPersistor = createAsyncStoragePersistor();
persistQueryClient({
  queryClient,
  persistor: queryPersistor,
});
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
