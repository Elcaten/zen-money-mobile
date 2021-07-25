import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {AccountType, TagIconName} from './api/models';
import {TransactionType} from './screens/transactions/transaction-type';

interface PickerScreenProps<T> {
  value: T;
  onSelect: (value: T) => void;
}

//===============================================||  PARAM LISTS  ||===================================================
export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Accounts: NavigatorScreenParams<AccountsParamList>;
  Transactions: NavigatorScreenParams<TransactionsParamList>;
  Analytics: NavigatorScreenParams<AnalyticsParamList>;
  More: NavigatorScreenParams<MoreParamList>;
};

export type AccountsParamList = {
  AccountsScreen: {};
  AccountDetailsScreen: {
    accountId: string;
  };
  EditAccountScreen: {
    accountId?: string;
  };
  AccountOverviewScreen: undefined;
  InstrumentPickerScreen: PickerScreenProps<number | null>;
  AccountTypePickerScreen: PickerScreenProps<AccountType | null>;
};

export type TransactionsParamList = {
  TransactionsScreen: {};
  TransactionDetailsScreen: {
    transactionId: string;
  };
  EditTransactionScreen: {
    transactionType: TransactionType;
  };
  AccountPickerScreen: PickerScreenProps<string | null>;
};

export type AnalyticsParamList = {
  AnalyticsScreen: undefined;
};

export type MoreParamList = {
  MoreScreen: undefined;
  ThemesScreen: undefined;
  LocalesScreen: undefined;
  AccountSettingsScreen: undefined;
  IconPickerScreen: {
    icon: TagIconName | null | undefined;
    color: number | null | undefined;
    onSave: (icon: TagIconName | null | undefined, color: number | null | undefined) => void;
  }; // TODO: figure out what's wrong with navigation.setOptions typing
  TagsScreen: {}; // TODO: figure out what's wrong with navigation.setOptions typing
  TagDetailsScreen: {tagId?: string};
  InstrumentPickerScreen: PickerScreenProps<number | null>;
};

//=================================================||  ACCOUNTS  ||====================================================
export type AccountsScreenRouteProp = RouteProp<AccountsParamList, 'AccountsScreen'>;
export type AccountsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AccountsParamList, 'AccountsScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type AccountsScreenProps = {
  route: AccountsScreenRouteProp;
  navigation: AccountsScreenNavigationProp;
};

export type AccountDetailsScreenRouteProp = RouteProp<AccountsParamList, 'AccountDetailsScreen'>;
export type AccountDetailsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AccountsParamList, 'AccountDetailsScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type AccountDetailsScreenProps = {
  route: AccountDetailsScreenRouteProp;
  navigation: AccountDetailsScreenNavigationProp;
};

export type InstrumentPickerScreenRouteProp = RouteProp<AccountsParamList, 'InstrumentPickerScreen'>;
export type InstrumentPickerScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AccountsParamList, 'InstrumentPickerScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type InstrumentPickerScreenProps = {
  route: InstrumentPickerScreenRouteProp;
  navigation: InstrumentPickerScreenNavigationProp;
};

export type AccountTypePickerScreenRouteProp = RouteProp<AccountsParamList, 'AccountTypePickerScreen'>;
export type AccountTypePickerScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AccountsParamList, 'AccountTypePickerScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type AccountTypePickerScreenProps = {
  route: AccountTypePickerScreenRouteProp;
  navigation: AccountTypePickerScreenNavigationProp;
};

//===============================================||  TRANSACTIONS  ||==================================================
export type TransactionsScreenRouteProp = RouteProp<TransactionsParamList, 'TransactionsScreen'>;
export type TransactionsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<TransactionsParamList, 'TransactionsScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type TransactionsScreenProps = {
  route: TransactionsScreenRouteProp;
  navigation: TransactionsScreenNavigationProp;
};

export type TransactionDetailsScreenRouteProp = RouteProp<TransactionsParamList, 'TransactionDetailsScreen'>;
export type TransactionDetailsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<TransactionsParamList, 'TransactionDetailsScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type TransactionDetailsScreenProps = {
  route: TransactionDetailsScreenRouteProp;
  navigation: TransactionDetailsScreenNavigationProp;
};

export type EditTransactionScreenRouteProp = RouteProp<TransactionsParamList, 'EditTransactionScreen'>;
export type EditTransactionScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<TransactionsParamList, 'EditTransactionScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type EditTransactionScreenProps = {
  route: EditTransactionScreenRouteProp;
  navigation: EditTransactionScreenNavigationProp;
};

export type AccountPickerScreenRouteProp = RouteProp<TransactionsParamList, 'AccountPickerScreen'>;
export type AccountPickerScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<TransactionsParamList, 'AccountPickerScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type AccountPickerScreenProps = {
  route: AccountPickerScreenRouteProp;
  navigation: AccountPickerScreenNavigationProp;
};

//===================================================||  MORE  ||======================================================
export type MoreScreenRouteProp = RouteProp<MoreParamList, 'MoreScreen'>;
export type MoreScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MoreParamList, 'MoreScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type MoreScreenProps = {
  route: MoreScreenRouteProp;
  navigation: MoreScreenNavigationProp;
};

export type TagsScreenRouteProp = RouteProp<MoreParamList, 'TagsScreen'>;
export type TagsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MoreParamList, 'TagsScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type TagsScreenProps = {
  route: TagsScreenRouteProp;
  navigation: TagsScreenNavigationProp;
};

export type TagDetailsScreenRouteProp = RouteProp<MoreParamList, 'TagDetailsScreen'>;
export type TagDetailsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MoreParamList, 'TagDetailsScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type TagDetailsScreenProps = {
  route: TagDetailsScreenRouteProp;
  navigation: TagDetailsScreenNavigationProp;
};

export type IconPickerScreenRouteProp = RouteProp<MoreParamList, 'IconPickerScreen'>;
export type IconPickerScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MoreParamList, 'IconPickerScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type IconPickerScreenProps = {
  route: IconPickerScreenRouteProp;
  navigation: IconPickerScreenNavigationProp;
};
