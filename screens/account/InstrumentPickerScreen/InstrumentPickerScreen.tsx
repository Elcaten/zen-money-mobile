import * as React from 'react';
import {useMemo} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {useInstruments} from '../../../api-hooks';
import {Instrument} from '../../../api/models';
import {CheckIcon, Text} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {useNavigatorThemeColors} from '../../../themes';
import {InstrumentPickerScreenProps} from '../../../types';

export const InstrumentPickerScreen: React.FC<InstrumentPickerScreenProps> = ({navigation, route}) => {
  const {data} = useInstruments();
  const instruments = useMemo(() => data.valuesArray() ?? [], [data]);

  const {primary} = useNavigatorThemeColors();

  const renderItem: ListRenderItem<Instrument> = ({item}) => {
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
  };

  return <FlatList data={instruments} renderItem={renderItem} keyExtractor={getId} />;
};

function getId(item: Instrument) {
  return item.id.toString();
}
