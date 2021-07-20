import {MaterialIcons} from '@expo/vector-icons';
import {HeaderBackButton} from '@react-navigation/stack';
import * as React from 'react';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Keyboard, RefreshControl, StyleSheet, View} from 'react-native';
import {Overlay, SearchBar} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useTransactionModels} from '../../../api-hooks';
import {Text} from '../../../components';
import {Card} from '../../../components/Card';
import {ListItem} from '../../../components/ListItem';
import {SearchSuggestion, useSearchResults, useSearchSuggestions} from '../../../hooks';
import {useNavigatorThemeColors} from '../../../themes';
import {TransactionsScreenProps} from '../../../types';
import {TransactionList} from '../../components/TransactionList';
import {AddTransactionButton} from './AddTransactionButton';

export const TransactionsScreen: React.FC<TransactionsScreenProps> = ({navigation}) => {
  const ref = useRef<any>(null);
  const {t} = useTranslation();
  const {data: transactions, isLoading, invalidate} = useTransactionModels();

  const [visible, setVisible] = useState(false);
  const toggleOverlay = useCallback(() => setVisible((v) => !v), []);

  const [searchExpr, setSearchExpr] = useState('');
  const suggestions = useSearchSuggestions(searchExpr);
  const [searchSuggestion, setSearchSuggestion] = useState<SearchSuggestion | null>(null);
  const searchResults = useSearchResults(transactions, searchSuggestion);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const onItemPress = useCallback((item: SearchSuggestion) => {
    Keyboard.dismiss();
    setShowSuggestions(false);
    setSearchSuggestion(item);
  }, []);

  const onBackPress = useCallback(() => {
    if (showSuggestions) {
      toggleOverlay();
    } else {
      setShowSuggestions(true);
      ref.current?.focus();
    }
  }, [showSuggestions, toggleOverlay]);

  useEffect(() => {
    setSearchExpr('');
  }, [visible]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item title={''} IconComponent={MaterialIcons} iconName="search" iconSize={24} onPress={toggleOverlay} />
        </HeaderButtons>
      ),
    });
  }, [navigation, toggleOverlay]);

  const navigateToDetails = useCallback(
    (transactionId: string) => {
      navigation.navigate('TransactionDetailsScreen', {transactionId});
    },
    [navigation],
  );

  const {card} = useNavigatorThemeColors();

  return (
    <View style={styles.wrapper}>
      <Overlay
        isVisible={visible}
        animationType="slide"
        overlayStyle={{backgroundColor: card}}
        fullScreen={true}
        onShow={() => ref.current?.focus()}
        onRequestClose={() => toggleOverlay()}>
        <SearchBar
          ref={ref}
          containerStyle={styles.searchBar}
          platform="android"
          placeholder="Search"
          onFocus={() => setShowSuggestions(true)}
          value={searchExpr}
          onChangeText={setSearchExpr as any}
          searchIcon={<HeaderBackButton style={styles.navButton} onPress={onBackPress} />}
          cancelIcon={<HeaderBackButton style={styles.navButton} onPress={onBackPress} />}
        />
        {showSuggestions && (
          <Card style={styles.suggestionsWrapper}>
            <FlatList
              data={suggestions}
              keyExtractor={(x, i) => i.toString()}
              keyboardShouldPersistTaps="always"
              renderItem={({item}) => (
                <ListItem bottomDivider onPress={() => onItemPress(item)}>
                  <ListItem.Title>
                    <Text style={styles.bold}>{item.match}</Text> - <Text style={styles.italic}>{item.type}</Text>
                  </ListItem.Title>
                </ListItem>
              )}
            />
          </Card>
        )}
        {!showSuggestions && searchResults.length === 0 && (
          <View style={styles.flexCenter}>
            <Text>{t('Screen.Transactions.NoTransactionsFound')}</Text>
          </View>
        )}
        {!showSuggestions && <TransactionList data={searchResults} onItemPress={() => {}} />}
      </Overlay>
      <TransactionList
        data={transactions}
        scrollViewProps={{
          refreshControl: <RefreshControl refreshing={isLoading} onRefresh={invalidate} />,
        }}
        onItemPress={navigateToDetails}
      />
      <AddTransactionButton />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  navButton: {
    marginRight: 0,
  },
  searchBar: {
    elevation: 4,
  },
  suggestionsWrapper: {
    elevation: 4,
    marginTop: 1,
  },
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});
