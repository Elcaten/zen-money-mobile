import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import Constants from 'expo-constants';
import React from 'react';
import {LogBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {RootSiblingParent} from 'react-native-root-siblings';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OverflowMenuProvider} from 'react-navigation-header-buttons';
import {QueryClient, QueryClientProvider as QCProvider} from 'react-query';
import {persistQueryClient} from 'react-query/persistQueryClient-experimental';
import {createAsyncStoragePersistor} from './api/create-async-storage-persistor';
import useCachedResources from './hooks/useCachedResources';
import {Root} from './root/Root';
import {useStore} from './store/use-store';
import {ElementsThemeProvider, NavigatorThemeProvider} from './themes';
import {composeProviders} from './utils';
import './utils/augmentations';

dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isToday);

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
  buster: Constants.manifest.version,
});
const QueryClientProvider: React.FC = ({children}) => {
  return <QCProvider client={queryClient}>{children}</QCProvider>;
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  const hasHydrated = useStore.use._hasHydrated();

  const WrappedApp = composeProviders(
    RootSiblingParent,
    NavigatorThemeProvider,
    ElementsThemeProvider,
    PaperProvider,
    OverflowMenuProvider,
    SafeAreaProvider,
    QueryClientProvider,
    ActionSheetProvider,
  )(Root);

  return hasHydrated && isLoadingComplete ? <WrappedApp /> : <React.Fragment />;
}
