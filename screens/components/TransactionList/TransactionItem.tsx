import * as React from 'react';
import {StyleSheet} from 'react-native';
import {TransactionModel} from '../../../api-hooks';
import {SubdirArrowRightIcon, Text, View} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {GREEN_500} from '../../../constants/Colors';
import {TagIcon} from '../../components/TagIcon';

interface TransactionItemProps {
  transaction: TransactionModel;
  secondaryTextColor: string;
  commentBackgroundColor: string;
  onPress: (transactionId: string) => void;
}

// ========================================================================================================================
const styles = StyleSheet.create({
  centralSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  subtitle: {
    fontSize: 14,
  },
  income: {
    color: GREEN_500,
  },
  comment: {
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
        <View style={styles.centralSection}>
          <Text size="large">{tag?.title}</Text>
          <Text style={[styles.subtitle, {color: this.props.secondaryTextColor}]}>
            {income ? incomeAccount?.title : outcomeAccount?.title}
          </Text>
          {comment && (
            <Text
              numberOfLines={1}
              style={[
                styles.comment,
                {color: this.props.secondaryTextColor, backgroundColor: this.props.commentBackgroundColor},
              ]}>
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
        <View style={styles.centralSection}>
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
