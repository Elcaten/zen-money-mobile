import React from 'react';
import {SearchBar, SearchBarIosProps} from 'react-native-elements';

export type ZenSearchBarIosProps = Pick<SearchBarIosProps, 'containerStyle' | 'placeholder' | 'value'> & {
  onChangeText: (text: string) => void;
};

export const ZenSearchBarIos: React.FC<ZenSearchBarIosProps> = ({placeholder, value, onChangeText}) => {
  return <SearchBar platform={'ios'} placeholder={placeholder} value={value} onChangeText={onChangeText} />;
};

ZenSearchBarIos.defaultProps = {
  placeholder: 'Search',
};
