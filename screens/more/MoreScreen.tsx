import * as React from 'react';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {useQueryClient} from 'react-query';
import {useInstruments, useMe} from '../../api-hooks';
import {QueryKeys} from '../../api-hooks/query-keys';
import {useMutateMe} from '../../api-hooks/useMutateMe';
import {useLogout} from '../../auth';
import {PickerListItem, SwitchListItem} from '../../components/ListItem';
import {
  localeSelector,
  setFastAddTransactionSelector,
  themeSelector,
  fastAddTransactionSelector,
  useStore,
} from '../../store/use-store';
import {MoreScreenProps} from '../../types';

export const MoreScreen: React.FC<MoreScreenProps> = ({navigation}) => {
  const theme = useStore(themeSelector);

  const {data: me} = useMe();
  const instrumentId = me!.currency;
  const {data: instruments} = useInstruments();
  const instrument = instruments.get(instrumentId!) ?? null;
  const {mutateAsync: mutateMe, isLoading: isMutating} = useMutateMe();
  const queryClient = useQueryClient();

  const openCurrencyPicker = useCallback(() => {
    navigation.navigate('InstrumentPickerScreen', {
      instrument: instrumentId,
      onSelect: async (i) => {
        navigation.pop();
        if (i) {
          await mutateMe({currency: i});
          await queryClient.invalidateQueries(QueryKeys.Users);
        }
      },
    });
  }, [instrumentId, mutateMe, navigation, queryClient]);

  const locale = useStore(localeSelector);

  const fastAddTransaction = useStore(fastAddTransactionSelector);
  const setFastAddTransaction = useStore(setFastAddTransactionSelector);

  const logout = useLogout();

  const {t} = useTranslation();

  return (
    <ScrollView>
      <PickerListItem
        title={t('Screen.Themes.Themes')}
        value={theme}
        onPress={() => navigation.navigate('ThemesScreen')}
      />
      <PickerListItem
        title={t('Screen.More.MainCurrency')}
        value={instrument?.title}
        disabled={isMutating}
        onPress={openCurrencyPicker}
      />
      <PickerListItem title={t('Screen.Locales')} value={locale} onPress={() => navigation.navigate('LocalesScreen')} />
      <PickerListItem title={t('Screen.Tags')} onPress={() => navigation.navigate('TagsScreen', {})} />
      <SwitchListItem
        title={t('Screen.More.FastAddTransaction')}
        value={fastAddTransaction}
        onValueChange={setFastAddTransaction}
      />
      <PickerListItem title={t('SignOut')} onPress={logout} />
    </ScrollView>
  );
};
