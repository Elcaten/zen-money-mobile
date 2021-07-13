import * as React from 'react';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {PieChart, PieChartData} from 'react-native-svg-charts';
import {Fade, Placeholder, PlaceholderLine} from 'rn-placeholder';
import {useAccounts, useInstruments, useMe} from '../../api-hooks';
import {AccountType} from '../../api/models';
import {Text, View} from '../../components';
import {Card} from '../../components/Card';
import {ListItem} from '../../components/ListItem';
import {LIGHT_GRAY} from '../../constants/Colors';
import {useCurrencyFormat} from '../../hooks';

//=====================================================================================================================
export interface AccountOverviewScreenProps {}

export const AccountOverviewScreen: React.FC<AccountOverviewScreenProps> = () => {
  const {data: accountList} = useAccounts();
  const {data: instrumentsMap} = useInstruments();
  const {data: user} = useMe();
  const userCurrency = instrumentsMap.get(user?.currency!)!;
  const userCurrencySymbol = userCurrency.symbol;

  const [instrumentBalances, setInstrumentBalances] = useState<InstrumentBalance[]>([]);
  const formatCurrency = useCurrencyFormat();

  useEffect(() => {
    const accountsByInstrument = (accountList ?? []).filter((a) => a.type !== AccountType.Debt).groupBy('instrument');
    const balances = accountsByInstrument
      .entriesArray()
      .map(([instrumentId, accounts]) => {
        const instrument = instrumentsMap?.get(instrumentId);
        return {
          instrument,
          balance: accounts.reduce((prev, curr) => prev + curr.balance, 0),
        };
      })
      .filter((i) => i.instrument != null)
      .map((b, idx) => {
        const balanceInUserCurrency = (b.balance * b.instrument!.rate) / userCurrency.rate;
        return {
          id: b.instrument!.id,
          balance: b.balance,
          balanceFormatted: formatCurrency(b.balance, '', 0),
          balanceInUserCurrency: balanceInUserCurrency,
          balanceInUserCurrencyFormatted: formatCurrency(balanceInUserCurrency, userCurrencySymbol, 0),
          shortTitle: b.instrument!.shortTitle,
          color: getColor(idx),
        };
      });

    setInstrumentBalances(balances);
  }, [accountList, formatCurrency, instrumentsMap, userCurrency.rate, userCurrencySymbol]);

  const {t} = useTranslation();

  return (
    <React.Fragment>
      <Card>
        <Card.Title>{t('Screen.AccountOverview.DistributionByCurrency')}</Card.Title>
        <InstrumentBalancesPieChart balances={instrumentBalances} />
      </Card>
      <InstrumentBalancesList balances={instrumentBalances} />
    </React.Fragment>
  );
};

//=====================================================================================================================

export interface InstrumentBalancesPieChartProps {
  balances: InstrumentBalance[];
}

export const InstrumentBalancesPieChart: React.FC<InstrumentBalancesPieChartProps> = ({balances}) => {
  const [pieData, setPieData] = useState<PieChartData[]>([{key: 'pie-0', value: 10, svg: {fill: LIGHT_GRAY}}]);

  useEffect(() => {
    const data = balances.map((b, index) => ({
      value: b.balanceInUserCurrency,
      svg: {
        fill: b.color,
        onPress: () => console.log('press', b),
      },
      key: `pie-${index}`,
    }));

    setPieData(data);
  }, [balances]);

  return <PieChart style={chartStyles.pieChart} innerRadius="75%" data={pieData} />;
};

const chartStyles = StyleSheet.create({
  pieChart: {
    padding: 16,
    height: 200,
  },
});

//=====================================================================================================================
const InstrumentBalancesList: React.FC<{balances: InstrumentBalance[]}> = ({balances}) => {
  if (balances.length === 0) {
    return (
      <View style={infoStyles.placeholdersContainer}>
        <Placeholder Animation={Fade}>
          <PlaceholderLine width={80} />
          <PlaceholderLine width={30} />
          <PlaceholderLine width={60} />
        </Placeholder>
      </View>
    );
  }

  const grandTotal = balances.reduce((prev, curr) => prev + curr.balanceInUserCurrency, 0);

  return (
    <React.Fragment>
      {balances.map((b) => (
        <ListItem key={b.id}>
          <Text style={[infoStyles.percentage, {color: b.color}]}>
            {((b.balanceInUserCurrency / grandTotal) * 100).toFixed(2)}%
          </Text>
          <Text style={infoStyles.shortTitle}>{b.shortTitle}</Text>
          <Text style={infoStyles.balance}>{b.balanceFormatted}</Text>
          <Text>{b.balanceInUserCurrencyFormatted}</Text>
        </ListItem>
      ))}
    </React.Fragment>
  );
};

const infoStyles = StyleSheet.create({
  placeholdersContainer: {
    padding: 8,
  },
  percentage: {
    minWidth: 50,
  },
  shortTitle: {
    fontWeight: 'bold',
  },
  balance: {
    flex: 1,
  },
});

//=====================================================================================================================
const getColor = (index: number) => ['#b35806', '#f1a340', '#998ec3', '#542788'][index % 4];

interface InstrumentBalance {
  id: number;
  balance: number;
  balanceFormatted: string;
  balanceInUserCurrency: number;
  balanceInUserCurrencyFormatted: string;
  shortTitle: string;
  color: string;
}
