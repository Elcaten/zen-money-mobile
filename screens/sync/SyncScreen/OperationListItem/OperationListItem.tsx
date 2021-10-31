import dayjs from 'dayjs';
import React, {useCallback} from 'react';
import {Control, Controller} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {ListItem} from '../../../../components/ListItem';
import {ZenText} from '../../../../components/ZenText';
import {GREEN_500, RED_500} from '../../../../constants/Colors';
import {useNavigatorThemeColors} from '../../../../themes';
import {AccountPicker} from '../../../components/AccountPicker';
import {SyncAccountPicker} from '../../../components/SyncAccountPicker';
import {SyncMappingTypePicker} from '../../../components/SyncMappingTypePicker';
import {SyncTagPicker} from '../../../components/SyncTagPicker';
import {TagListPicker} from '../../../components/TagListPicker';
import {OperationMapping} from '../types';

export interface OperationListItemProps {
  control: Control<
    {
      mappings: OperationMapping[];
    },
    object
  >;
  index: number;
  item: OperationMapping;
  onPress: (mapping: OperationMapping) => void;
  onUpdate: (index: number, mapping: OperationMapping) => void;
}

export const OperationListItem: React.FC<OperationListItemProps> = ({control, index, item, onPress, onUpdate}) => {
  const {text} = useNavigatorThemeColors();

  const operation = item.operation;
  const date = dayjs(operation.operationTime.milliseconds);
  const sign = operation.type === 'Debit' ? '-' : operation.type === 'Credit' ? '+' : '??';
  const amountColor = operation.type === 'Debit' ? RED_500 : operation.type === 'Credit' ? GREEN_500 : text;

  const renderMappingTypePicer = useCallback(
    () => (
      <SyncMappingTypePicker
        onSelect={(type) => {
          onUpdate(index, {...item, type});
        }}
        containerStyle={{marginRight: 12}}
        value={item.type}
      />
    ),
    [index, item, onUpdate],
  );

  const renderAccountPicker = useCallback(
    () => (
      <AccountPicker
        RenderAs={SyncAccountPicker}
        title={item.accountTitle}
        value={item.accountId}
        onSelect={(account) => {
          onUpdate(index, {
            ...item,
            accountId: account.title,
            accountTitle: account.title,
          });
        }}
        recentAccounts={[]}
      />
    ),
    [index, item, onUpdate],
  );

  const renderTagPicker = useCallback(
    () => (
      <TagListPicker
        RenderAs={SyncTagPicker}
        tagId={item.tagId}
        onSelect={(tag) => {
          onUpdate(index, {...item, tagId: tag?.id});
        }}
      />
    ),
    [index, item, onUpdate],
  );

  const onPressMemo = useCallback(() => onPress(item), [item, onPress]);

  return (
    <ListItem onPress={onPressMemo}>
      <ListItem.Content>
        <View style={styles.row}>
          <Controller
            control={control}
            name={`mappings.${index}.type` as 'mappings.0.type'}
            render={renderMappingTypePicer}
          />

          <View style={styles.flexFill}>
            <View style={styles.row}>
              <ZenText numberOfLines={1} style={styles.flexFill}>
                {operation.category.name} {operation.description}
              </ZenText>
              <ZenText>{date.format(date.isToday() ? 'HH:mm' : 'DD MMM HH:mm')}</ZenText>
            </View>

            <View style={styles.row}>
              <ZenText style={styles.flexFill}>{operation.cardNumber ?? operation.payment?.cardNumber}</ZenText>
              <ZenText style={{color: amountColor}}>
                {sign} {operation.accountAmount.value} {operation.accountAmount.currency.name}
              </ZenText>
            </View>

            <View style={{flexDirection: 'row', marginTop: 8}}>
              <Controller
                control={control}
                name={`mappings.${index}.accountId` as 'mappings.0.accountId'}
                render={renderAccountPicker}
              />
              {(item.type === 'expense' || item.type === 'income') && (
                <Controller
                  control={control}
                  name={`mappings.${index}.tagId` as 'mappings.0.tagId'}
                  render={renderTagPicker}
                />
              )}
            </View>
          </View>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
});
