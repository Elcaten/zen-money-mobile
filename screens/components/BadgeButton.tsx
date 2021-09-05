import * as React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Button, ButtonProps} from 'react-native-elements';
import {useNavigatorThemeColors} from '../../themes';

export const BadgeButton: React.FC<ButtonProps> = ({containerStyle, buttonStyle, titleProps, titleStyle, ...rest}) => {
  const {secondary, text} = useNavigatorThemeColors();

  return (
    <Button
      type="clear"
      containerStyle={[styles.badgeButtonContainer, {borderColor: secondary}, containerStyle]}
      buttonStyle={[styles.badgeButton, buttonStyle]}
      titleProps={{numberOfLines: 1, ...(titleProps ?? {})}}
      titleStyle={[{color: text, marginLeft: 4, maxWidth: Dimensions.get('screen').width / 3}, titleStyle]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  badgeButtonContainer: {
    overflow: 'hidden',
    borderRadius: 100,
    borderWidth: 1,
    marginRight: 8,
  },
  badgeButton: {
    minWidth: 75,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
});
