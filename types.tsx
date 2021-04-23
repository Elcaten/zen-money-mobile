/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Accounts: undefined;
  Transactions: undefined;
  More: undefined;
};

export type AccountsParamList = {
  AccountsScreen: undefined;
};

export type TransactionsParamList = {
  TransactionsScreen: undefined;
};

export type MoreParamList = {
  MoreScreen: undefined;
  TagsScreen: undefined;
  TagDetailsScreen: {tagId: string};
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
