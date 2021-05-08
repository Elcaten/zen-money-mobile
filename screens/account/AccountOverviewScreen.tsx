import * as React from 'react';
import {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {PieChart, PieChartData} from 'react-native-svg-charts';
import {Fade, Placeholder, PlaceholderMedia} from 'rn-placeholder';
import {useAccounts, useInstruments} from '../../api-hooks';
import {Text} from '../../components';
import {Card} from '../../components/Card';
import {ListItem} from '../../components/ListItem';
import {groupBy} from '../../utils';

export interface AccountOverviewScreenProps {}

const getColor = (index: number) => ['#b35806', '#f1a340', '#998ec3', '#542788'][index % 4];

interface InstrumentBalance {
  id: number;
  balance: number;
  balanceRub: number;
  shortTitle: string;
  color: string;
}

const useInstrumentBalances = (): InstrumentBalance[] => {
  const {data: acountsData} = useAccounts();
  const {data: instrumentsData} = useInstruments();

  return useMemo(() => {
    const accountsByInstrument = groupBy(acountsData ?? [], 'instrument');
    const balances = Array.from(accountsByInstrument.entries())
      .map(([instrumentId, accounts]) => {
        const instrument = instrumentsData?.get(instrumentId);
        return {
          instrument,
          balance: accounts.reduce((prev, curr) => prev + curr.balance, 0),
        };
      })
      .filter((i) => i.instrument != null);

    return balances.map((b, idx) => ({
      id: b.instrument!.id,
      balance: b.balance,
      balanceRub: b.balance * b.instrument!.rate,
      shortTitle: b.instrument!.shortTitle,
      color: getColor(idx),
    }));
  }, [acountsData, instrumentsData]);
};

const AccountBalancesInfo: React.FC<{balances: InstrumentBalance[]}> = ({balances}) => {
  const grandTotal = balances.reduce((prev, curr) => prev + curr.balanceRub, 0);
  return (
    <React.Fragment>
      {balances.map((b) => (
        <ListItem style={styles.infoItem} key={b.id}>
          <Text style={[styles.percentage, {color: b.color}]}>{((b.balanceRub / grandTotal) * 100).toFixed(2)}%</Text>
          <Text style={styles.shortTitle}>{b.shortTitle}</Text>
          <Text style={styles.balance}>{b.balance.toFixed(2)}</Text>
          <Text style={styles.balanceRub}>{b.balanceRub} ₽</Text>
        </ListItem>
      ))}
    </React.Fragment>
  );
};

export const AccountOverviewScreen: React.FC<AccountOverviewScreenProps> = (props) => {
  const instrumentBalances = useInstrumentBalances();
  const {t} = useTranslation();

  const [pieData, setPieData] = useState<PieChartData[]>([]);
  useEffect(() => {
    const data = instrumentBalances.map((b, index) => ({
      value: b.balanceRub,
      svg: {
        fill: b.color,
        onPress: () => console.log('press', b),
      },
      key: `pie-${index}`,
    }));
    setPieData(data);
  }, [instrumentBalances]);

  return (
    <React.Fragment>
      <Card>
        <Card.Title style={styles.distributionTitle}>{t('Screen.AccountOverview.DistributionByCurrency')}</Card.Title>
        {pieData.length > 0 ? (
          <PieChart style={styles.pieChart} innerRadius="75%" data={pieData} />
        ) : (
          <Placeholder Animation={Fade} style={styles.pieChartPlaceholder}>
            <PlaceholderMedia isRound size={160} />
          </Placeholder>
        )}
      </Card>
      <AccountBalancesInfo balances={instrumentBalances} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  distributionTitle: {
    padding: 16,
  },
  pieChart: {
    padding: 16,
    height: 200,
  },
  pieChartPlaceholder: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 16,
    height: 200,
  },
  infoItem: {},
  percentage: {
    minWidth: 50,
  },
  shortTitle: {
    fontWeight: 'bold',
  },
  balance: {
    flex: 1,
  },
  balanceRub: {},
});
