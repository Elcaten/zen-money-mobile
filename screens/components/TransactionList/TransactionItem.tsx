import * as React from 'react';
import {StyleSheet} from 'react-native';
import {TransactionModel} from '../../../api-hooks';
import {SubdirArrowRightIcon, View} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {ZenText} from '../../../components/ZenText';
import {GREEN_500} from '../../../constants/Colors';
import {TagIcon} from '../../components/TagIcon';

interface TransactionItemProps {
  transaction: TransactionModel;
  secondaryTextColor: string;
  commentBackgroundColor: string;
  uncategorizedTitle: string;
  onPress: (transactionId: string) => void;
}

// ========================================================================================================================
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  centralSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  income: {
    color: GREEN_500,
  },
  comment: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 8,
  },
});

// ========================================================================================================================
export class OneWayTransaction extends React.Component<TransactionItemProps> {
  render() {
    const {tag, income, incomeFormatted, outcome, outcomeFormatted, incomeAccount, outcomeAccount, comment} =
      this.props.transaction;
    return (
      <ListItem style={styles.wrapper} onPress={() => this.props.onPress(this.props.transaction.id)}>
        <TagIcon icon={tag?.icon} color={tag?.iconColor} />
        <View style={styles.centralSection}>
          <ZenText size="large">{tag?.title ?? this.props.uncategorizedTitle}</ZenText>
          <ZenText size="small" style={{color: this.props.secondaryTextColor}}>
            {income ? incomeAccount?.title : outcomeAccount?.title}
          </ZenText>
          {comment && (
            <ZenText
              numberOfLines={1}
              size="small"
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
    const {income, outcome, incomeFormatted, outcomeFormatted, incomeAccount, outcomeAccount, comment} =
      this.props.transaction;
    const isSameAmount = outcome === income;

    return (
      <ListItem style={styles.wrapper} onPress={() => this.props.onPress(this.props.transaction.id)}>
        <SubdirArrowRightIcon />
        <View style={styles.centralSection}>
          <ZenText size="large">{outcomeAccount?.title}</ZenText>
          <ZenText size="large">{incomeAccount?.title}</ZenText>
          {comment && (
            <ZenText
              numberOfLines={1}
              size="small"
              style={[
                styles.comment,
                {color: this.props.secondaryTextColor, backgroundColor: this.props.commentBackgroundColor},
              ]}>
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
