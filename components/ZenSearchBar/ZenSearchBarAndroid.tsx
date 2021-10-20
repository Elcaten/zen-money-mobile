import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SearchBar, SearchBarAndroidProps} from 'react-native-elements';
import {ArrowBackIcon} from '../Icons';

export type ZenSearchBarAndroidProps = Pick<SearchBarAndroidProps, 'containerStyle' | 'placeholder' | 'value'> & {
  onChangeText: (text: string) => void;
  onBackPress?: () => void;
};

export const ZenSearchBarAndroid: React.FC<ZenSearchBarAndroidProps> = ({
  containerStyle,
  placeholder,
  value,
  onChangeText,
  onBackPress,
}) => {
  return (
    <SearchBar
      containerStyle={[styles.containerStyle, containerStyle]}
      platform={'android'}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      searchIcon={<BackButton onPress={onBackPress} />}
      cancelIcon={<BackButton onPress={onBackPress} />}
    />
  );
};

ZenSearchBarAndroid.defaultProps = {
  placeholder: 'Search',
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingLeft: 8,
  },
  icon: {
    marginRight: -16,
  },
});

export const BackButton: React.FC<{onPress?: () => void}> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.icon}>
      <ArrowBackIcon color="#000" />
    </TouchableOpacity>
  );
};
