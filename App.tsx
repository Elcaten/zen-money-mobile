import dayjs from 'dayjs';
import React from 'react';
import {LogBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {RootSiblingParent} from 'react-native-root-siblings';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OverflowMenuProvider} from 'react-navigation-header-buttons';
import {QueryClient, QueryClientProvider as QCProvider} from 'react-query';
import {persistQueryClient} from 'react-query/persistQueryClient-experimental';
import {PersistGate} from 'zustand-persist';
import {createAsyncStoragePersistor} from './api/create-async-storage-persistor';
import useCachedResources from './hooks/useCachedResources';
import {Root} from './root/Root';
import {State, useStore} from './store/use-store';
import {ElementsThemeProvider, NavigatorThemeProvider} from './themes';
import {composeProviders} from './utils';
import './utils/augmentations';

var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

LogBox.ignoreLogs(['Setting a timer', 'Non-serializable values were found in the navigation state']);

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

export default function App() {
  const isLoadingComplete = useCachedResources();

  // Must call useStore to bootstrap persistence or will stop on loading screen
  useStore(themeSelector);

  const WrappedApp = composeProviders(
    RootSiblingParent,
    NavigatorThemeProvider,
    ElementsThemeProvider,
    PaperProvider,
    OverflowMenuProvider,
    SafeAreaProvider,
    QueryClientProvider,
  )(Root);

  return <PersistGate>{isLoadingComplete ? <WrappedApp /> : <React.Fragment />}</PersistGate>;
}

const themeSelector = (x: State) => x.theme;
