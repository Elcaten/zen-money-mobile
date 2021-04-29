import dayjs from 'dayjs';
import * as React from 'react';
import {useMemo} from 'react';
import {ListRenderItemInfo, SectionList, SectionListData, StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {TransactionModel, useTransactionModels} from '../api-hooks';
import {FabButton, MenuIcon, SubdirArrowRightIcon, Text, WalletIcon} from '../components';
import {ListItem} from '../components/ListItem';
import {FloatingAction} from '../lib/react-native-floating-action';
import {extractId} from '../utils';
import {groupBy} from '../utils/group-by';
import {TagIcon} from './components';
import {AddTransactionButton} from './components';

// ========================================================================================================================
const Info = styled(View)`
  flex: 1;
  flex-direction: column;
`;
const Subtitle = styled(Text)`
  font-size: 14px;
  color: #8a8a8c;
`;
const Income = styled(Text)`
  color: #4eb64e;
`;
const OneWayTransaction: React.FC<TransactionModel> = ({tag, income, outcome, incomeAccount, outcomeAccount}) => {
  return (
    <ListItem>
      <TagIcon icon={tag?.icon} color={tag?.iconColor} size={24} />
      <Info>
        <Text>{tag?.title}</Text>
        <Subtitle>{income ? incomeAccount : outcomeAccount}</Subtitle>
      </Info>
      <React.Fragment>
        {income ? <Income>+ {income}</Income> : null}
        {outcome ? <Text>− {outcome}</Text> : null}
      </React.Fragment>
    </ListItem>
  );
};

// ========================================================================================================================
const TitleContainer = styled(View)`
  flex: 1;
  flex-direction: column;
`;
const TwoWayTransaction: React.FC<TransactionModel> = ({income, outcome, incomeAccount, outcomeAccount}) => {
  const isSameAmount = outcome === income;
  return (
    <ListItem>
      <SubdirArrowRightIcon size={24} />
      <TitleContainer>
        <Text>{outcomeAccount}</Text>
        <Text>{incomeAccount}</Text>
      </TitleContainer>
      {isSameAmount ? (
        <Text>{outcome}</Text>
      ) : (
        <View>
          <Text>− {outcome}</Text>
          <Income>+ {income}</Income>
        </View>
      )}
    </ListItem>
  );
};

// ========================================================================================================================
const renderTransactionItem = (info: ListRenderItemInfo<TransactionModel>) => {
  return info.item.income && info.item.outcome ? (
    <TwoWayTransaction {...info.item} />
  ) : (
    <OneWayTransaction {...info.item} />
  );
};

const SectionTitle = styled(ListItem.Title)`
  color: #8a8a8c;
  font-weight: bold;
`;
const renderSectionHeader = (info: {
  section: SectionListData<
    TransactionModel,
    {
      title: string;
      data: TransactionModel[];
    }
  >;
}) => (
  <ListItem topDivider>
    <SectionTitle>{info.section.title}</SectionTitle>
  </ListItem>
);

// ========================================================================================================================
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
          title: dateDayJs.format('MMMM D, dddd'),
          data: transactionsByDate.get(dateString) ?? [],
        };
      })
      .slice(0, 5);
  }, [data]);

  return (
    <View style={styles.container}>
      {transactionSections.length > 0 && (
        <SectionList
          sections={transactionSections}
          stickySectionHeadersEnabled
          removeClippedSubviews
          onRefresh={invalidate}
          refreshing={isLoading}
          keyExtractor={extractId}
          renderItem={renderTransactionItem}
          renderSectionHeader={renderSectionHeader}
        />
      )}
      <AddTransactionButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
