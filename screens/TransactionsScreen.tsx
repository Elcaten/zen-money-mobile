import dayjs from 'dayjs';
import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {ListRenderItemInfo, SectionList, StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {TransactionModel, useTransactionModels} from '../api-hooks';
import {Text} from '../components';
import {ListItem} from '../components/ListItem';
import {extractId} from '../utils';
import {groupBy} from '../utils/group-by';
import {TagIcon} from './components';

const StyledIncomeText = styled(Text)`
  color: #4eb64e;
  font-size: 18px;
`;

const StyledOutcomeText = styled(Text)`
  font-size: 18px;
`;

const TransactionItem: React.FC<TransactionModel> = (props) => {
  return (
    <ListItem>
      <TagIcon icon={props.tag?.icon} color={props.tag?.iconColor} size={24} />
      <ListItem.Title>{props.tag?.title}</ListItem.Title>
      {props.income ? <StyledIncomeText>+{props.income}</StyledIncomeText> : null}
      {props.outcome ? <StyledOutcomeText>-{props.outcome}</StyledOutcomeText> : null}
    </ListItem>
  );
};

export const TransactionsScreen: React.FC = () => {
  const {data, isLoading, invalidate} = useTransactionModels();

  const transactionSections = useMemo(() => {
    const transactionsByDate = groupBy(data, 'date');
    const sortedDates = Array.from(transactionsByDate.keys())
      .map((dateString) => ({dateString, dateDayJs: dayjs(dateString)}))
      .sort((a, b) => (a.dateDayJs.isBefore(b.dateDayJs) ? 1 : -1));
    return sortedDates
      .map(({dateString, dateDayJs}) => {
        return {
          title: dateDayJs.format('DD/MM/YYYY'),
          data: transactionsByDate.get(dateString) ?? [],
        };
      })
      .slice(0, 5);
  }, [data]);

  const renderTransaction = React.useCallback(
    (info: ListRenderItemInfo<TransactionModel>) => <TransactionItem {...info.item} />,
    [],
  );
  const renderSectionHeader = useCallback(
    ({section: {title}}) => <Text style={styles.sectionHeader}>{title}</Text>,
    [],
  );

  return (
    <React.Fragment>
      {transactionSections.length > 0 && (
        <SectionList
          sections={transactionSections}
          stickySectionHeadersEnabled
          removeClippedSubviews
          onRefresh={invalidate}
          refreshing={isLoading}
          keyExtractor={extractId}
          renderItem={renderTransaction}
          renderSectionHeader={renderSectionHeader}
        />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  itemTagName: {
    flex: 0,
    minWidth: 72,
  },
  sectionHeader: {
    backgroundColor: '#ddd9d9',
    borderBottomColor: '#999999',
    borderBottomWidth: 2,
    padding: 6,
  },
});
