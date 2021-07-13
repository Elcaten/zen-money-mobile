import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {TransactionModel} from '../../../api-hooks';
import {SubdirArrowRightIcon, Text} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {GRAY, LIGHT_GRAY, SUCCESS} from '../../../constants/Colors';
import {TagIcon} from '../../components/TagIcon';

interface TransactionItemProps {
  transaction: TransactionModel;
  onPress: (transactionId: string) => void;
}

// ========================================================================================================================
const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: GRAY,
  },
  income: {
    color: SUCCESS,
  },
  comment: {
    backgroundColor: LIGHT_GRAY,
    color: GRAY,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 14,
    marginTop: 8,
  },
});

// ========================================================================================================================
export class OneWayTransaction extends React.Component<TransactionItemProps> {
  render() {
    const {
      tag,
      income,
      incomeFormatted,
      outcome,
      outcomeFormatted,
      incomeAccount,
      outcomeAccount,
      comment,
    } = this.props.transaction;
    return (
      <ListItem onPress={() => this.props.onPress(this.props.transaction.id)}>
        <TagIcon icon={tag?.icon} color={tag?.iconColor} size={24} />
        <View style={styles.flexFill}>
          <Text size="large">{tag?.title}</Text>
          <Text style={styles.subtitle}>{income ? incomeAccount?.title : outcomeAccount?.title}</Text>
          {comment && (
            <Text numberOfLines={1} style={styles.comment}>
              {comment}
            </Text>
          )}
        </View>
        <React.Fragment>
          {income ? (
            <Text size="large" style={styles.income}>
              + {incomeFormatted}
            </Text>
          ) : null}
          {outcome ? <Text size="large">− {outcomeFormatted}</Text> : null}
        </React.Fragment>
      </ListItem>
    );
  }

  shouldComponentUpdate(newProps: TransactionItemProps) {
    return this.props.transaction.changed !== newProps.transaction.changed;
  }
}

// ========================================================================================================================
export class TwoWayTransaction extends React.Component<TransactionItemProps> {
  render() {
    const {
      income,
      outcome,
      incomeFormatted,
      outcomeFormatted,
      incomeAccount,
      outcomeAccount,
      comment,
    } = this.props.transaction;
    const isSameAmount = outcome === income;

    return (
      <ListItem onPress={() => this.props.onPress(this.props.transaction.id)}>
        <SubdirArrowRightIcon size={24} />
        <View style={styles.flexFill}>
          <Text size="large">{outcomeAccount?.title}</Text>
          <Text size="large">{incomeAccount?.title}</Text>
          {comment && (
            <Text numberOfLines={1} style={styles.comment}>
              {comment}
            </Text>
          )}
        </View>
        {isSameAmount ? (
          <Text size="large">{outcomeFormatted}</Text>
        ) : (
          <View>
            <Text size="large">− {outcomeFormatted}</Text>
            <Text size="large" style={styles.income}>
              + {incomeFormatted}
            </Text>
          </View>
        )}
      </ListItem>
    );
  }

  shouldComponentUpdate(newProps: TransactionItemProps) {
    return this.props.transaction.changed !== newProps.transaction.changed;
  }
}
