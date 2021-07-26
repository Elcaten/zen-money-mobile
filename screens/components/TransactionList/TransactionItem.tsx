import * as React from 'react';
import {StyleSheet} from 'react-native';
import {TransactionModel} from '../../../api-hooks';
import {SubdirArrowRightIcon, View} from '../../../components';
import {ZenText} from '../../../components/ZenText';
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
          <ZenText size="large">{tag?.title}</ZenText>
          <ZenText style={[styles.subtitle, {color: this.props.secondaryTextColor}]}>
            {income ? incomeAccount?.title : outcomeAccount?.title}
          </ZenText>
          {comment && (
            <ZenText
              numberOfLines={1}
              style={[
                styles.comment,
                {color: this.props.secondaryTextColor, backgroundColor: this.props.commentBackgroundColor},
              ]}>
              {comment}
            </ZenText>
          )}
        </View>
        <React.Fragment>
          {income ? (
            <ZenText size="large" style={styles.income}>
              + {incomeFormatted}
            </ZenText>
          ) : null}
          {outcome ? <ZenText size="large">− {outcomeFormatted}</ZenText> : null}
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
          <ZenText size="large">{outcomeAccount?.title}</ZenText>
          <ZenText size="large">{incomeAccount?.title}</ZenText>
          {comment && (
            <ZenText numberOfLines={1} style={styles.comment}>
              {comment}
            </ZenText>
          )}
        </View>
        {isSameAmount ? (
          <ZenText size="large">{outcomeFormatted}</ZenText>
        ) : (
          <View>
            <ZenText size="large">− {outcomeFormatted}</ZenText>
            <ZenText size="large" style={styles.income}>
              + {incomeFormatted}
            </ZenText>
          </View>
        )}
      </ListItem>
    );
  }

  shouldComponentUpdate(newProps: TransactionItemProps) {
    return this.props.transaction.changed !== newProps.transaction.changed;
  }
}
