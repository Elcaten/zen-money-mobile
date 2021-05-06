/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {TransactionType} from './screens/components/transaction-type';

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
  TagsScreen: {}; // TODO: figure out what's wrong with navigation.setOptions typing
  TagDetailsScreen: {tagId?: string};
};

export type TransactionsScreenRouteProp = RouteProp<TransactionsParamList, 'TransactionsScreen'>;
export type TransactionsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<TransactionsParamList, 'TransactionsScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;

export type AddTransactionScreenRouteProp = RouteProp<TransactionsParamList, 'AddTransactionScreen'>;
export type AddTransactionScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<TransactionsParamList, 'AddTransactionScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
export type AddTransactionScreenProps = {
  route: AddTransactionScreenRouteProp;
  navigation: AddTransactionScreenNavigationProp;
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
