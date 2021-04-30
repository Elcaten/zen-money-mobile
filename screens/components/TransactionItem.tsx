import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {TransactionModel} from '../../api-hooks';
import {SubdirArrowRightIcon, Text} from '../../components';
import {ListItem} from '../../components/ListItem';
import {GRAY, SUCCESS} from '../../constants/Colors';
import {TagIcon} from '../components/TagIcon';

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
export class OneWayTransaction extends React.Component<{transaction: TransactionModel}> {
  render() {
    const {tag, income, outcome, incomeAccount, outcomeAccount} = this.props.transaction;
    return (
      <ListItem>
        <TagIcon icon={tag?.icon} color={tag?.iconColor} size={24} />
        <View style={owStyles.info}>
          <Text>{tag?.title}</Text>
          <Text style={owStyles.subtitle}>{income ? incomeAccount : outcomeAccount}</Text>
        </View>
        <React.Fragment>
          {income ? <Text style={owStyles.income}>+ {income}</Text> : null}
          {outcome ? <Text>− {outcome}</Text> : null}
        </React.Fragment>
      </ListItem>
    );
  }

  shouldComponentUpdate() {
    return false;
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

export class TwoWayTransaction extends React.Component<{transaction: TransactionModel}> {
  render() {
    const {income, outcome, incomeAccount, outcomeAccount} = this.props.transaction;
    const isSameAmount = outcome === income;

    return (
      <ListItem>
        <SubdirArrowRightIcon size={24} />
        <View style={twStyles.titleContainer}>
          <Text>{outcomeAccount}</Text>
          <Text>{incomeAccount}</Text>
        </View>
        {isSameAmount ? (
          <Text>{outcome}</Text>
        ) : (
          <View>
            <Text>− {outcome}</Text>
            <Text style={twStyles.income}>+ {income}</Text>
          </View>
        )}
      </ListItem>
    );
  }

  shouldComponentUpdate() {
    return false;
  }
}

// ========================================================================================================================
export const renderTransactionItem = (type: any, model: TransactionModel) => {
  return model.income && model.outcome ? (
    <TwoWayTransaction transaction={model} />
  ) : (
    <OneWayTransaction transaction={model} />
  );
};
