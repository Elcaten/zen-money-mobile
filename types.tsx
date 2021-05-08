/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TransactionType} from './screens/transactions/transaction-type';

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
  AccountsScreen: undefined;
  AccountDetailsScreen: {
    accountId: string;
  };
  AccountOverviewScreen: undefined;
};

export type TransactionsParamList = {
  TransactionsScreen: undefined;
  TransactionDetailsScreen: {
    transactionId: string;
  };
  EditTransactionScreen: {
    transactionType: TransactionType;
  };
};

export type AnalyticsParamList = {
  AnalyticsScreen: undefined;
};

export type MoreParamList = {
  MoreScreen: undefined;
  ThemesScreen: undefined;
  LocalesScreen: undefined;
  TagsScreen: {}; // TODO: figure out what's wrong with navigation.setOptions typing
  TagDetailsScreen: {tagId?: string};
};

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

export type TransactionsScreenRouteProp = RouteProp<TransactionsParamList, 'TransactionsScreen'>;
export type TransactionsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<TransactionsParamList, 'TransactionsScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type TransactionsScreenProps = {
  route: TransactionsScreenRouteProp;
  navigation: TransactionsScreenNavigationProp;
};

export type TransactionDetailsScreenRouteProp = RouteProp<TransactionsParamList, 'TransactionDetailsScreen'>;
export type TransactionDetailsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<TransactionsParamList, 'TransactionDetailsScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type TransactionDetailsScreenProps = {
  route: TransactionDetailsScreenRouteProp;
  navigation: TransactionDetailsScreenNavigationProp;
};

export type EditTransactionScreenRouteProp = RouteProp<TransactionsParamList, 'EditTransactionScreen'>;
export type EditTransactionScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<TransactionsParamList, 'EditTransactionScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type EditTransactionScreenProps = {
  route: EditTransactionScreenRouteProp;
  navigation: EditTransactionScreenNavigationProp;
};

export type MoreScreenRouteProp = RouteProp<MoreParamList, 'MoreScreen'>;
export type MoreScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MoreParamList, 'MoreScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type MoreScreenProps = {
  route: MoreScreenRouteProp;
  navigation: MoreScreenNavigationProp;
};

export type TagsScreenRouteProp = RouteProp<MoreParamList, 'TagsScreen'>;
export type TagsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MoreParamList, 'TagsScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type TagsScreenProps = {
  route: TagsScreenRouteProp;
  navigation: TagsScreenNavigationProp;
};

export type TagDetailsScreenRouteProp = RouteProp<MoreParamList, 'TagDetailsScreen'>;
export type TagDetailsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MoreParamList, 'TagDetailsScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type TagDetailsScreenProps = {
  route: TagDetailsScreenRouteProp;
  navigation: TagDetailsScreenNavigationProp;
};
