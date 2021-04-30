import dayjs from 'dayjs';
import * as React from 'react';
import {useMemo} from 'react';
import {ListRenderItemInfo, SectionList, SectionListData, StyleSheet, View} from 'react-native';
import {TransactionModel, useTransactionModels} from '../api-hooks';
import {SubdirArrowRightIcon, Text} from '../components';
import {ListItem} from '../components/ListItem';
import {extractId} from '../utils';
import {groupBy} from '../utils/group-by';
import {AddTransactionButton, TagIcon} from './components';

// ========================================================================================================================
const owStyles = StyleSheet.create({
  info: {
    flex: 1,
    flexDirection: 'column',
  },
  subtitle: {
    fontSize: 14,
    color: '#8a8a8c',
  },
  income: {
    color: '#4eb64e',
  },
});
class OneWayTransaction extends React.Component<TransactionModel> {
  render() {
    const {tag, income, outcome, incomeAccount, outcomeAccount} = this.props;
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
    color: '#4eb64e',
  },
});

class TwoWayTransaction extends React.Component<TransactionModel> {
  render() {
    const {income, outcome, incomeAccount, outcomeAccount} = this.props;
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
const renderTransactionItem = (info: ListRenderItemInfo<TransactionModel>) => {
  return info.item.income && info.item.outcome ? (
    <TwoWayTransaction {...info.item} />
  ) : (
    <OneWayTransaction {...info.item} />
  );
};

const sectionHeaderStyles = StyleSheet.create({
  title: {
    color: '#8a8a8c',
    fontWeight: 'bold',
  },
});
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
    <ListItem.Title style={sectionHeaderStyles.title}>{info.section.title}</ListItem.Title>
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
    return sortedDates.map(({dateString, dateDayJs}) => {
      return {
        title: dateDayJs.format('MMMM D, dddd'),
        data: transactionsByDate.get(dateString) ?? [],
      };
    });
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
