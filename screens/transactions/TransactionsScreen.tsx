import dayjs from 'dayjs';
import * as React from 'react';
import {Component} from 'react';
import {Dimensions, RefreshControl, StyleSheet, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {TransactionModel, TransactionModelsInfo, withTransactionModels} from '../../api-hooks';
import {OneWayTransaction, TwoWayTransaction} from './TransactionItem';
import {TransactionSectionHeader} from './TransactionSectionHeader';
import {AddTransactionButton} from './AddTransactionButton';
import {TransactionsScreenProps as TransactionsScreenCmpProps} from '../../types';

let {width} = Dimensions.get('window');

const ViewType = {
  SectionHeader: 0,
  OneWayTransaction: 1,
  TwoWayTransaction: 2,
};
interface TransactionListItem {
  type: number | string;
  value: TransactionModel | string;
}
interface TransactionsScreenProps extends TransactionsScreenCmpProps {
  transactionModels: TransactionModelsInfo;
}
interface TransactionsScreenNewState {
  dataProvider: DataProvider;
}
export class TransactionsScreenCmp extends Component<TransactionsScreenProps, TransactionsScreenNewState> {
  private layoutProvider: LayoutProvider;

  constructor(args: any) {
    super(args);

    this.state = {
      dataProvider: new DataProvider((r1: TransactionModel | string, r2: TransactionModel | string) => {
        const uid1 = (r1 as TransactionModel)?.id ?? r1;
        const uid2 = (r2 as TransactionModel)?.id ?? r2;
        return uid1 !== uid2;
      }),
    };

    this.layoutProvider = new LayoutProvider(
      (i) => {
        return this.state.dataProvider.getDataForIndex(i).type;
      },
      (type, dim) => {
        switch (type) {
          case ViewType.OneWayTransaction:
          case ViewType.TwoWayTransaction:
            dim.width = width;
            dim.height = 72;
            break;
          case ViewType.SectionHeader:
            dim.width = width;
            dim.height = 36;
            break;
          default:
            dim.width = width;
            dim.height = 0;
        }
      },
    );

    this.renderRow = this.renderRow.bind(this);
    this.updateDataProvider = this.updateDataProvider.bind(this);
    this.navigateToDetails = this.navigateToDetails.bind(this);
  }

  componentDidMount() {
    this.updateDataProvider(this.props.transactionModels.data);
  }

  componentDidUpdate(prevProps: {transactionModels: TransactionModelsInfo}) {
    if (this.props.transactionModels.data !== prevProps.transactionModels.data) {
      this.updateDataProvider(this.props.transactionModels.data);
    }
  }

  private updateDataProvider(models: TransactionModel[]) {
    const transactionsByDate = models.groupBy('date');
    const sortedDates = Array.from(transactionsByDate.keys())
      .map((dateString) => ({dateString, dateDayJs: dayjs(dateString)}))
      .sort((a, b) => (a.dateDayJs.isBefore(b.dateDayJs) ? 1 : -1));
    const items = sortedDates.map<TransactionListItem[]>(({dateString, dateDayJs}) => {
      const sectionHeader: TransactionListItem = {
        type: ViewType.SectionHeader,
        value: dateDayJs.format('MMMM D, dddd'),
      };
      const transactionItems: TransactionListItem[] = (transactionsByDate.get(dateString) ?? []).map((i) =>
        i.income && i.outcome
          ? {type: ViewType.TwoWayTransaction, value: i}
          : {type: ViewType.OneWayTransaction, value: i},
      );
      return [sectionHeader].concat(transactionItems);
    });

    this.setState({
      dataProvider: this.state.dataProvider.cloneWithRows(items.flatten()),
    });
  }

  private navigateToDetails(transactionId: string) {
    this.props.navigation.navigate('TransactionDetailsScreen', {transactionId});
  }

  private renderRow(type: string | number, data: TransactionListItem) {
    switch (type) {
      case ViewType.OneWayTransaction:
        return <OneWayTransaction transaction={data.value as TransactionModel} onPress={this.navigateToDetails} />;
      case ViewType.TwoWayTransaction:
        return <TwoWayTransaction transaction={data.value as TransactionModel} onPress={this.navigateToDetails} />;
      case ViewType.SectionHeader:
        return <TransactionSectionHeader title={data.value as string} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.dataProvider.getSize() > 0 && (
          <RecyclerListView
            rowRenderer={this.renderRow}
            dataProvider={this.state.dataProvider}
            layoutProvider={this.layoutProvider}
            scrollViewProps={{
              refreshControl: (
                <RefreshControl
                  refreshing={this.props.transactionModels.isLoading}
                  onRefresh={this.props.transactionModels.invalidate}
                />
              ),
            }}
          />
        )}

        <AddTransactionButton />
      </View>
    );
  }
}

export const TransactionsScreen = withTransactionModels(TransactionsScreenCmp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
