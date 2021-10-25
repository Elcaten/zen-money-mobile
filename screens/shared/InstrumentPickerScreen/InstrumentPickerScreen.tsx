import * as React from 'react';
import {ReactText, useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {useInstruments} from '../../../api-hooks';
import {Instrument} from '../../../api/models';
import {View} from '../../../components';
import {OptionListItem} from '../../../components/ListItem';
import {ZenSearchBar} from '../../../components/ZenSearchBar';
import {ZenText} from '../../../components/ZenText';
import {InstrumentPickerScreenProps} from '../../../types';

const ITEM_HEIGHT = Platform.select({ios: 70, default: 54});

const DATA_PROVIDER = new DataProvider((r1: Instrument, r2: Instrument) => {
  return r1.id !== r2.id;
});

const ViewComponent = Platform.select({ios: View, default: SafeAreaView});

export const InstrumentPickerScreen: React.FC<InstrumentPickerScreenProps> = ({route, navigation}) => {
  const instrumentId = route.params.value;
  const [dataProvider, setDataProvider] = React.useState(DATA_PROVIDER);
  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        (_index) => 'item',
        (_type, dim) => {
          dim.width = Dimensions.get('window').width;
          dim.height = ITEM_HEIGHT;
        },
      ),
    [],
  );

  const {data} = useInstruments();
  const selectedInstruments = useMemo(
    () => (data.has(instrumentId!) ? [data.get(instrumentId!)!] : []),
    [data, instrumentId],
  );
  const unselectedInstruments = useMemo(
    () => data.valuesArray().filter((i) => i.id !== instrumentId),
    [data, instrumentId],
  );

  const [searchExpr, setSearchExpr] = useState('');
  const foundInstruments = useMemo(
    () =>
      unselectedInstruments
        .filter((i) => i.title.toLocaleLowerCase().includes(searchExpr.toLocaleLowerCase()))
        .sort((i1, i2) => i1.title.localeCompare(i2.title)),
    [searchExpr, unselectedInstruments],
  );

  useEffect(() => {
    setDataProvider((prevState) => prevState.cloneWithRows([...selectedInstruments, ...foundInstruments]));
  }, [foundInstruments, selectedInstruments]);

  const rowRenderer = useCallback(
    (_type: ReactText, item: Instrument) => {
      return (
        <OptionListItem
          title={item.title}
          onPress={() => {
            route.params.onSelect(item.id);
          }}
          checked={item.id === instrumentId}
          bottomDivider
          style={styles.listItem}
        />
      );
    },
    [instrumentId, route.params],
  );

  const {t} = useTranslation();
  const onBackPress = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <ViewComponent style={styles.container}>
      <ZenSearchBar
        placeholder={t('InstrumentPickerScreen.SearchCurrency')}
        value={searchExpr}
        onChangeText={setSearchExpr}
        onBackPress={onBackPress}
        containerStyle={styles.searchBar}
      />
      {foundInstruments.length === 0 && (
        <View style={styles.emptyList}>
          <ZenText>{t('InstrumentPickerScreen.NoCurrenciesFound')}</ZenText>
        </View>
      )}
      {foundInstruments.length > 0 && (
        <RecyclerListView
          layoutProvider={layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={rowRenderer}
          forceNonDeterministicRendering={true}
        />
      )}
    </ViewComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    elevation: 4,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    width: '100%',
  },
});
