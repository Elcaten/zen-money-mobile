import * as React from 'react';
import {ReactText, useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {useInstruments} from '../../../api-hooks';
import {Instrument} from '../../../api/models';
import {CheckIcon, View} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {ZenText} from '../../../components/ZenText';
import {useNavigatorThemeColors} from '../../../themes';
import {InstrumentPickerScreenProps} from '../../../types';

const ITEM_HEIGHT = Platform.select({ios: 44, default: 54});

const DATA_PROVIDER = new DataProvider((r1: Instrument, r2: Instrument) => {
  return r1.id !== r2.id;
});

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
  const selectedInstruments = useMemo(() => (data.has(instrumentId!) ? [data.get(instrumentId!)!] : []), [
    data,
    instrumentId,
  ]);
  const unselectedInstruments = useMemo(() => data.valuesArray().filter((i) => i.id !== instrumentId), [
    data,
    instrumentId,
  ]);

  const [searchExpr, setSearchExpr] = useState('');
  const foundInstruments = useMemo(
    () =>
      unselectedInstruments
        .filter((i) => i.title.toLocaleLowerCase().includes(searchExpr.toLocaleLowerCase()))
        .sort((i1, i2) => i1.title.localeCompare(i2.title)),
    [searchExpr, unselectedInstruments],
  );

  React.useEffect(() => {
    setDataProvider((prevState) => prevState.cloneWithRows([...selectedInstruments, ...foundInstruments]));
  }, [foundInstruments, selectedInstruments]);

  const {primary} = useNavigatorThemeColors();

  const rowRenderer = useCallback(
    (_type: ReactText, item: Instrument) => {
      return (
        <ListItem
          bottomDivider
          onPress={() => {
            route.params.onSelect(item.id);
          }}>
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          {item.id === instrumentId ? <CheckIcon size={20} color={primary} /> : <></>}
        </ListItem>
      );
    },
    [instrumentId, primary, route.params],
  );

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.searchBar}
        cancelIcon={false}
        searchIcon={false as any}
        platform={Platform.select({ios: 'ios', android: 'android', default: 'default'})}
        placeholder="Search"
        value={searchExpr}
        onChangeText={setSearchExpr as any}
      />
      {foundInstruments.length === 0 && (
        <View style={styles.emptyList}>
          <ZenText>{t('InstrumentPickerScreen.NoCurrenciesFound')}</ZenText>
        </View>
      )}
      {foundInstruments.length > 0 && (
        <RecyclerListView layoutProvider={layoutProvider} dataProvider={dataProvider} rowRenderer={rowRenderer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  container: {
    flex: 1,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
