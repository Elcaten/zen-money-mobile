import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {TransactionModel} from '../../api-hooks';
import {SubdirArrowRightIcon, Text} from '../../components';
import {ListItem} from '../../components/ListItem';
import {GRAY, SUCCESS} from '../../constants/Colors';
import {TagIcon} from '../components/TagIcon';

interface TransactionItemProps {
  transaction: TransactionModel;
  onPress: (transactionId: string) => void;
}

// ========================================================================================================================
const owStyles = StyleSheet.create({
  info: {
    flex: 1,
    flexDirection: 'column',
  },
  subtitle: {
    fontSize: 14,
    color: GRAY,
  },
  income: {
    color: SUCCESS,
  },
});
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
    } = this.props.transaction;
    return (
      <ListItem onPress={() => this.props.onPress(this.props.transaction.id)}>
        <TagIcon icon={tag?.icon} color={tag?.iconColor} size={24} />
        <View style={owStyles.info}>
          <Text>{tag?.title}</Text>
          <Text style={owStyles.subtitle}>{income ? incomeAccount : outcomeAccount}</Text>
        </View>
        <React.Fragment>
          {income ? <Text style={owStyles.income}>+ {incomeFormatted}</Text> : null}
          {outcome ? <Text>− {outcomeFormatted}</Text> : null}
        </React.Fragment>
      </ListItem>
    );
  }

  shouldComponentUpdate(newProps: TransactionItemProps) {
    return this.props.transaction.changed !== newProps.transaction.changed;
  }
}

// ========================================================================================================================
const twStyles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  income: {
    color: SUCCESS,
  },
});

export class TwoWayTransaction extends React.Component<TransactionItemProps> {
  render() {
    const {income, outcome, incomeFormatted, outcomeFormatted, incomeAccount, outcomeAccount} = this.props.transaction;
    const isSameAmount = outcome === income;

    return (
      <ListItem onPress={() => this.props.onPress(this.props.transaction.id)}>
        <SubdirArrowRightIcon size={24} />
        <View style={twStyles.titleContainer}>
          <Text>{outcomeAccount}</Text>
          <Text>{incomeAccount}</Text>
        </View>
        {isSameAmount ? (
          <Text>{outcomeFormatted}</Text>
        ) : (
          <View>
            <Text>− {outcomeFormatted}</Text>
            <Text style={twStyles.income}>+ {incomeFormatted}</Text>
          </View>
        )}
      </ListItem>
    );
  }

  shouldComponentUpdate(newProps: TransactionItemProps) {
    return this.props.transaction.changed !== newProps.transaction.changed;
  }
}
