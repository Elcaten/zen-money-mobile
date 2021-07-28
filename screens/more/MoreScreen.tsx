import * as React from 'react';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {useQueryClient} from 'react-query';
import {useInstruments, useMe, useMutateMe} from '../../api-hooks';
import {QueryKeys} from '../../api-hooks/query-keys';
import {useLogout} from '../../auth';
import {
  FingerprintIcon,
  LanguageIcon,
  LogoutIcon,
  MoneyIcon,
  PlusCircleOutlineIcon,
  TagIcon,
  ThemeIcon,
} from '../../components';
import {PickerListItem, SwitchListItem} from '../../components/ListItem';
import {useThemeName} from '../../hooks/useThemeName';
import {
  biometricUnlockSelector,
  fastAddTransactionSelector,
  localeSelector,
  setBiometricUnlockSelector,
  setFastAddTransactionSelector,
  themeSelector,
  useStore,
} from '../../store/use-store';
import {MoreScreenProps} from '../../types';
import {getLocaleName} from '../../utils';

export const MoreScreen: React.FC<MoreScreenProps> = ({navigation}) => {
  const theme = useStore(themeSelector);
  const themeName = useThemeName(theme);

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
  const localeName = getLocaleName(locale);

  const fastAddTransaction = useStore(fastAddTransactionSelector);
  const setFastAddTransaction = useStore(setFastAddTransactionSelector);
  const biometricUnlock = useStore(biometricUnlockSelector);
  const setBiometricUnlock = useStore(setBiometricUnlockSelector);

  const logout = useLogout();

  const {t} = useTranslation();

  return (
    <ScrollView>
      <PickerListItem
        leftIcon={() => <ThemeIcon />}
        title={t('MoreScreen.Themes')}
        value={themeName}
        onPress={() => navigation.navigate('ThemesScreen')}
      />
      <PickerListItem
        leftIcon={() => <MoneyIcon />}
        title={t('MoreScreen.MainCurrency')}
        value={instrumentTitle}
        disabled={isMutating}
        onPress={openCurrencyPicker}
      />
      <PickerListItem
        leftIcon={() => <LanguageIcon />}
        title={t('MoreScreen.Locales')}
        value={localeName}
        onPress={() => navigation.navigate('LocalesScreen')}
      />
      <PickerListItem
        leftIcon={() => <TagIcon />}
        title={t('MoreScreen.Tags')}
        onPress={() => navigation.navigate('TagsScreen', {})}
      />
      <SwitchListItem
        leftIcon={() => <FingerprintIcon />}
        title={t('MoreScreen.BiometricUnlock')}
        value={biometricUnlock}
        onValueChange={setBiometricUnlock}
      />
      <SwitchListItem
        leftIcon={() => <PlusCircleOutlineIcon />}
        title={t('MoreScreen.FastAddTransaction')}
        value={fastAddTransaction}
        onValueChange={setFastAddTransaction}
      />
      <PickerListItem leftIcon={() => <LogoutIcon />} title={t('MoreScreen.SignOut')} onPress={logout} />
    </ScrollView>
  );
};
