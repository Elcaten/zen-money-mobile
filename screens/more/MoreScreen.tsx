import * as React from 'react';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {useQueryClient} from 'react-query';
import {useInstruments, useMe, useMutateMe} from '../../api-hooks';
import {QueryKeys} from '../../api-hooks/query-keys';
import {useLogout} from '../../auth';
import {LanguageIcon, LogoutIcon, MoneyIcon, PlusCircleOutlineIcon, TagIcon, ThemeIcon} from '../../components';
import {PickerListItem, SwitchListItem} from '../../components/ListItem';
import {
  fastAddTransactionSelector,
  localeSelector,
  setFastAddTransactionSelector,
  themeSelector,
  useStore,
} from '../../store/use-store';
import {MoreScreenProps} from '../../types';

export const MoreScreen: React.FC<MoreScreenProps> = ({navigation}) => {
  const theme = useStore(themeSelector);

  const {data: me} = useMe();
  const instrumentId = me!.currency;
  const {data: instruments} = useInstruments();
  const instrumentTitle = instruments.get(instrumentId!)?.title;
  const {mutateAsync: mutateMe, isLoading: isMutating} = useMutateMe();
  const queryClient = useQueryClient();

  const openCurrencyPicker = useCallback(() => {
    navigation.navigate('InstrumentPickerScreen', {
      value: instrumentId,
      onSelect: async (instrument) => {
        navigation.pop();
        if (instrument) {
          await mutateMe({currency: instrument});
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
        leftIcon={() => <ThemeIcon size={24} />}
        title={t('MoreScreen.Themes')}
        value={theme}
        onPress={() => navigation.navigate('ThemesScreen')}
      />
      <PickerListItem
        leftIcon={() => <MoneyIcon size={24} />}
        title={t('MoreScreen.MainCurrency')}
        value={instrumentTitle}
        disabled={isMutating}
        onPress={openCurrencyPicker}
      />
      <PickerListItem
        leftIcon={() => <LanguageIcon size={24} />}
        title={t('MoreScreen.Locales')}
        value={locale}
        onPress={() => navigation.navigate('LocalesScreen')}
      />
      <PickerListItem
        leftIcon={() => <TagIcon size={24} />}
        title={t('MoreScreen.Tags')}
        onPress={() => navigation.navigate('TagsScreen', {})}
      />
      <SwitchListItem
        leftIcon={() => <PlusCircleOutlineIcon size={24} />}
        title={t('MoreScreen.FastAddTransaction')}
        value={fastAddTransaction}
        onValueChange={setFastAddTransaction}
      />
      <PickerListItem leftIcon={() => <LogoutIcon size={24} />} title={t('MoreScreen.SignOut')} onPress={logout} />
    </ScrollView>
  );
};
