import * as React from 'react';
import {ReactText, useCallback, useMemo} from 'react';
import {Dimensions} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {useInstruments} from '../../../api-hooks';
import {Instrument} from '../../../api/models';
import {CheckIcon} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {useNavigatorThemeColors} from '../../../themes';
import {InstrumentPickerScreenProps} from '../../../types';

const {width} = Dimensions.get('window');
const ITEM_HEIGHT = 48;

const DATA_PROVIDER = new DataProvider((r1: Instrument, r2: Instrument) => {
  return r1.id !== r2.id;
});

const LAYOUT_PROVIDER = new LayoutProvider(
  (index) => 'item',
  (type, dim) => {
    dim.width = width;
    dim.height = ITEM_HEIGHT;
  },
);

export const InstrumentPickerScreen: React.FC<InstrumentPickerScreenProps> = ({navigation, route}) => {
  const [dataProvider, setDataProvider] = React.useState(DATA_PROVIDER);
  const [layoutProvider] = React.useState(LAYOUT_PROVIDER);

  const {data} = useInstruments();
  const options = useMemo(() => {
    const instruments = data.valuesArray() ?? [];
    const sortedInstruments = instruments.sort((i1, i2) => i1.title.localeCompare(i2.title));
    return sortedInstruments;
  }, [data]);

  React.useEffect(() => {
    setDataProvider((prevState) => prevState.cloneWithRows(options));
  }, [options]);

  const {primary} = useNavigatorThemeColors();

  const rowRenderer = useCallback(
    (_type: ReactText, item: Instrument) => {
      return (
        <ListItem
          onPress={() => {
            route.params.onSelect(item.id);
            navigation.goBack();
          }}>
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          {item.id === route.params.instrument ? <CheckIcon size={20} color={primary} /> : <></>}
        </ListItem>
      );
    },
    [navigation, primary, route.params],
  );

  return <RecyclerListView layoutProvider={layoutProvider} dataProvider={dataProvider} rowRenderer={rowRenderer} />;
};
