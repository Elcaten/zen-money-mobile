import {HeaderBackButton} from '@react-navigation/stack';
import * as React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Keyboard, RefreshControl, StyleSheet} from 'react-native';
import {Overlay, SearchBar} from 'react-native-elements';
import {useTransactionModels} from '../../../api-hooks';
import {View} from '../../../components';
import {Card} from '../../../components/Card';
import {ListItem} from '../../../components/ListItem';
import {ZenText} from '../../../components/ZenText';
import {
  SearchSuggestion,
  useGrandTotal,
  useNativeHeaderTitle,
  useSearchResults,
  useSearchSuggestions,
} from '../../../hooks';
import {useHeaderButtons} from '../../../hooks/useHeaderButtons';
import {useNavigatorThemeColors} from '../../../themes';
import {TransactionsScreenProps} from '../../../types';
import {extractIndex} from '../../../utils';
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

  const grandTotal = useGrandTotal();

  useEffect(() => {
    setSearchExpr('');
  }, [visible]);

  useHeaderButtons(navigation, {onSearchPress: toggleOverlay});

  useNativeHeaderTitle(navigation, grandTotal.toString());

  const navigateToDetails = useCallback(
    (transactionId: string) => {
      navigation.navigate('EditTransactionScreen', {transactionId});
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
              keyExtractor={extractIndex}
              keyboardShouldPersistTaps="always"
              renderItem={({item}) => (
                <ListItem bottomDivider onPress={() => onItemPress(item)}>
                  <ListItem.Title>
                    <ZenText style={styles.bold}>{item.match}</ZenText> -{' '}
                    <ZenText style={styles.italic}>{item.type}</ZenText>
                  </ListItem.Title>
                </ListItem>
              )}
            />
          </Card>
        )}
        {!showSuggestions && searchResults.length === 0 && (
          <View style={styles.flexCenter}>
            <ZenText>{t('TransactionsScreen.NoTransactionsFound')}</ZenText>
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
