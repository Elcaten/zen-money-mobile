import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
import React, {useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationOptions} from 'react-native-screens/lib/typescript/native-stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

export const useHeaderButtons = (
  navigation: {setOptions: (options: NativeStackNavigationOptions & StackHeaderOptions) => void},
  {
    onAddPress,
    onEditPress,
    onSavePress,
    onDeletePress,
    onSearchPress,
    renderButtons,
    renderButtonPosition,
    disabled,
  }: {
    onAddPress?: () => void;
    onEditPress?: () => void;
    onSavePress?: () => void;
    onDeletePress?: () => void;
    onSearchPress?: () => void;
    renderButtons?: () => React.ReactNode | React.ReactNode[];
    renderButtonPosition?: 'left' | 'right';
    disabled?: boolean;
  },
) => {
  const {t} = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          {renderButtonPosition === 'left' && renderButtons && renderButtons()}
          {onDeletePress && (
            <Item
              disabled={disabled}
              title={t('Button.Delete')}
              IconComponent={MaterialCommunityIcons}
              iconName="trash-can-outline"
              iconSize={24}
              onPress={onDeletePress}
            />
          )}
          {onAddPress && (
            <Item
              disabled={disabled}
              title={t('Button.Add')}
              IconComponent={MaterialIcons}
              iconName="add"
              iconSize={24}
              onPress={onAddPress}
            />
          )}
          {onSavePress && (
            <Item
              disabled={disabled}
              title={t('Button.Save')}
              IconComponent={MaterialIcons}
              iconName="save"
              iconSize={24}
              onPress={onSavePress}
            />
          )}
          {onEditPress && (
            <Item
              disabled={disabled}
              title={t('Button.Edit')}
              IconComponent={MaterialIcons}
              iconName="edit"
              iconSize={24}
              onPress={onEditPress}
            />
          )}
          {onSearchPress && (
            <Item
              disabled={disabled}
              title={t('Button.Search')}
              IconComponent={MaterialIcons}
              iconName="search"
              iconSize={24}
              onPress={onSearchPress}
            />
          )}
          {renderButtonPosition === 'right' && renderButtons && renderButtons()}
        </HeaderButtons>
      ),
    });
  }, [
    disabled,
    navigation,
    onAddPress,
    onDeletePress,
    onEditPress,
    onSavePress,
    onSearchPress,
    renderButtonPosition,
    renderButtons,
    t,
  ]);
};
