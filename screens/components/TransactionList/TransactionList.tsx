import dayjs from 'dayjs';
import * as React from 'react';
import {Component} from 'react';
import {Dimensions, RefreshControl, StyleSheet, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {TransactionModel} from '../../../api-hooks';
import {OneWayTransaction, TwoWayTransaction} from './TransactionItem';
import {TransactionSectionHeader} from './TransactionSectionHeader';

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
interface TransactionsListProps {
  data: TransactionModel[];
  isLoading: boolean;
  onRefresh: () => void;
  onItemPress: (transactionId: string) => void;
}
interface TransactionListState {
  dataProvider: DataProvider;
}

export class TransactionList extends Component<TransactionsListProps, TransactionListState> {
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
  }

  componentDidMount() {
    this.updateDataProvider(this.props.data);
  }

  componentDidUpdate(prevProps: TransactionsListProps) {
    if (this.props.data !== prevProps.data) {
      this.updateDataProvider(this.props.data);
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

  private renderRow(type: string | number, data: TransactionListItem) {
    switch (type) {
      case ViewType.OneWayTransaction:
        return <OneWayTransaction transaction={data.value as TransactionModel} onPress={this.props.onItemPress} />;
      case ViewType.TwoWayTransaction:
        return <TwoWayTransaction transaction={data.value as TransactionModel} onPress={this.props.onItemPress} />;
      case ViewType.SectionHeader:
        return <TransactionSectionHeader title={data.value as string} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.dataProvider.getSize() > 0 && (
          <RecyclerListView
            rowRenderer={this.renderRow}
            dataProvider={this.state.dataProvider}
            layoutProvider={this.layoutProvider}
            scrollViewProps={{
              refreshControl: <RefreshControl refreshing={this.props.isLoading} onRefresh={this.props.onRefresh} />,
            }}
          />
        )}
      </React.Fragment>
    );
  }
}
