import dayjs from 'dayjs';
import * as React from 'react';
import {Component} from 'react';
import {Translation} from 'react-i18next';
import {Dimensions} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView, RecyclerListViewProps} from 'recyclerlistview';
import {TransactionModel} from '../../../api-hooks';
import {NavigatorTheme, NavigatorThemeContextConsumer} from '../../../themes/navigator-themes';
import {OneWayTransaction, TwoWayTransaction} from './TransactionItem';
import {TransactionSectionHeader} from './TransactionSectionHeader';

const ViewType = {
  SectionHeader: 0,
  ListHeader: 1,
  OneWayTransaction: 2,
  TwoWayTransaction: 3,
  OneWayTransactionWithComment: 4,
  TwoWayTransactionWithComment: 5,
};
interface TransactionListItem {
  type: number | string;
  value: TransactionModel | string;
}
export type TransactionsListProps = {
  data: TransactionModel[];
  onItemPress: (transactionId: string) => void;
  renderHeader?: () => JSX.Element;
  headerHeight?: number;
} & Pick<RecyclerListViewProps, 'externalScrollView' | 'scrollViewProps' | 'onScroll' | 'style'>;
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
        let {width} = Dimensions.get('window');
        switch (type) {
          case ViewType.OneWayTransaction:
            dim.width = width;
            dim.height = 75;
            break;
          case ViewType.OneWayTransactionWithComment:
            dim.width = width;
            dim.height = 110;
            break;
          case ViewType.TwoWayTransaction:
            dim.width = width;
            dim.height = 80;
            break;
          case ViewType.TwoWayTransactionWithComment:
            dim.width = width;
            dim.height = 110;
            break;
          case ViewType.SectionHeader:
            dim.width = width;
            dim.height = 36;
            break;
          case ViewType.ListHeader:
            dim.width = width;
            dim.height = this.props.headerHeight ?? 0;
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
    const transactionsByDate = models
      .groupBy('date')
      .mapValues((transactions) => transactions.sort((t1, t2) => t2.created - t1.created));
    const sortedDates = Array.from(transactionsByDate.keys())
      .map((dateString) => ({dateString, dateDayJs: dayjs(dateString)}))
      .sort((a, b) => (a.dateDayJs.isBefore(b.dateDayJs) ? 1 : -1));
    const items = sortedDates
      .map<TransactionListItem[]>(({dateString, dateDayJs}) => {
        const sectionHeader: TransactionListItem = {
          type: ViewType.SectionHeader,
          value: dateDayJs.format('MMMM D, dddd'),
        };
        const transactionItems: TransactionListItem[] = (transactionsByDate.get(dateString) ?? []).map((i) =>
          i.income && i.outcome
            ? {type: i.comment ? ViewType.TwoWayTransactionWithComment : ViewType.TwoWayTransaction, value: i}
            : {type: i.comment ? ViewType.OneWayTransactionWithComment : ViewType.OneWayTransaction, value: i},
        );
        return [sectionHeader].concat(transactionItems);
      })
      .flatten();

    this.setState({
      dataProvider: this.state.dataProvider.cloneWithRows(
        this.props.renderHeader ? [{type: ViewType.ListHeader}, ...items] : items,
      ),
    });
  }

  private renderRow(type: string | number, data: TransactionListItem, _index: number, extendedState?: object) {
    const {theme, t} = extendedState as {theme: NavigatorTheme; t: any};
    switch (type) {
      case ViewType.OneWayTransaction:
      case ViewType.OneWayTransactionWithComment:
        return (
          <OneWayTransaction
            transaction={data.value as TransactionModel}
            onPress={this.props.onItemPress}
            secondaryTextColor={theme.colors.secondaryText}
            commentBackgroundColor={theme.colors.background}
            uncategorizedTitle={t('Tags.Uncategorized')}
          />
        );
      case ViewType.TwoWayTransaction:
      case ViewType.TwoWayTransactionWithComment:
        return (
          <TwoWayTransaction
            transaction={data.value as TransactionModel}
            onPress={this.props.onItemPress}
            secondaryTextColor={theme.colors.secondaryText}
            commentBackgroundColor={theme.colors.background}
            uncategorizedTitle={t('Tags.Uncategorized')}
          />
        );
      case ViewType.SectionHeader:
        return <TransactionSectionHeader title={data.value as string} color={theme.colors.secondaryText} />;
      case ViewType.ListHeader:
        return this.props.renderHeader ? <this.props.renderHeader /> : null;
      default:
        return null;
    }
  }

  render() {
    return (
      <NavigatorThemeContextConsumer>
        {(theme) => (
          <Translation>
            {(t) =>
              this.state.dataProvider.getSize() > 0 && (
                <RecyclerListView
                  extendedState={{theme, t}}
                  externalScrollView={this.props.externalScrollView}
                  scrollViewProps={this.props.scrollViewProps}
                  onScroll={this.props.onScroll}
                  rowRenderer={this.renderRow}
                  dataProvider={this.state.dataProvider}
                  layoutProvider={this.layoutProvider}
                />
              )
            }
          </Translation>
        )}
      </NavigatorThemeContextConsumer>
    );
  }
}
