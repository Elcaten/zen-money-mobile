import * as React from 'react';
import {ReactText, useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {useInstruments} from '../../../api-hooks';
import {Instrument} from '../../../api/models';
import {CheckIcon, Text, View} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {useNavigatorThemeColors} from '../../../themes';
import {InstrumentPickerScreenProps} from '../../../types';
import {useTranslation} from 'react-i18next';

const ITEM_HEIGHT = 54;

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
  const sortedInstruments = useMemo(() => {
    const selectedInstrument: Instrument[] = [];
    const instruments: Instrument[] = [];
    data.forEach((i) => {
      if (i.id === instrumentId) {
        selectedInstrument.push(i);
      } else {
        instruments.push(i);
      }
    });
    return selectedInstrument.concat(instruments.sort((i1, i2) => i1.title.localeCompare(i2.title)));
  }, [data, instrumentId]);

  const [searchExpr, setSearchExpr] = useState('');
  const filteredInstruments = useMemo(
    () => sortedInstruments.filter((i) => i.title.toLocaleLowerCase().includes(searchExpr.toLocaleLowerCase())),
    [searchExpr, sortedInstruments],
  );

  React.useEffect(() => {
    setDataProvider((prevState) => prevState.cloneWithRows(filteredInstruments));
  }, [filteredInstruments]);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar
          containerStyle={styles.searchBar}
          cancelIcon={false}
          searchIcon={false as any}
          platform="android"
          placeholder="Search"
          value={searchExpr}
          onChangeText={setSearchExpr as any}
        />
      ),
    });
  }, [navigation, searchExpr]);

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      {filteredInstruments.length === 0 && (
        <View style={styles.emptyList}>
          <Text>{t('InstrumentPickerScreen.NoCurrenciesFound')}</Text>
        </View>
      )}
      {filteredInstruments.length > 0 && (
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
