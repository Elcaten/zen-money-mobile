/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {TransactionType} from './screens/components/transaction-type';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Accounts: undefined;
  Transactions: undefined;
  Analytics: undefined;
  More: undefined;
};

export type AccountsParamList = {
  AccountsScreen: undefined;
  AccountOverviewScreen: undefined;
};

export type TransactionsParamList = {
  TransactionsScreen: undefined;
  AddTransactionScreen: {
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
  TagsScreen: undefined;
  TagDetailsScreen: {tagId: string};
};

export type TransactionsScreenRouteProp = RouteProp<TransactionsParamList, 'TransactionsScreen'>;
export type TransactionsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<TransactionsParamList, 'TransactionsScreen'>,
  BottomTabNavigationProp<TransactionsParamList>
>;

export type AddTransactionScreenRouteProp = RouteProp<TransactionsParamList, 'AddTransactionScreen'>;
export type AddTransactionScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<TransactionsParamList, 'AddTransactionScreen'>,
  BottomTabNavigationProp<TransactionsParamList>
>;
export type AddTransactionScreenProps = {
  route: AddTransactionScreenRouteProp;
  navigation: AddTransactionScreenNavigationProp;
};

export type MoreScreenRouteProp = RouteProp<MoreParamList, 'MoreScreen'>;
export type MoreScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MoreParamList, 'MoreScreen'>,
  BottomTabNavigationProp<TransactionsParamList>
>;
export type MoreScreenProps = {
  route: MoreScreenRouteProp;
  navigation: MoreScreenNavigationProp;
};

export type TagsScreenRouteProp = RouteProp<MoreParamList, 'TagsScreen'>;
export type TagsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MoreParamList, 'TagsScreen'>,
  BottomTabNavigationProp<TransactionsParamList>
>;
export type TagsScreenProps = {
  route: TagsScreenRouteProp;
  navigation: TagsScreenNavigationProp;
};

export type TagDetailsScreenRouteProp = RouteProp<MoreParamList, 'TagDetailsScreen'>;
export type TagDetailsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MoreParamList, 'TagDetailsScreen'>,
  BottomTabNavigationProp<TransactionsParamList>
>;
export type TagDetailsScreenProps = {
  route: TagDetailsScreenRouteProp;
  navigation: TagDetailsScreenNavigationProp;
};
