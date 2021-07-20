import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
import React, {useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

export const useHeaderButtons = (
  navigation: {setOptions: (options: StackHeaderOptions) => void},
  {
    onAddPress,
    onEditPress,
    onSavePress,
    onDeletePress,
    onSearchPress,
    renderButtons,
    renderButtonPosition,
  }: {
    onAddPress?: () => void;
    onEditPress?: () => void;
    onSavePress?: () => void;
    onDeletePress?: () => void;
    onSearchPress?: () => void;
    renderButtons?: () => React.ReactNode | React.ReactNode[];
    renderButtonPosition?: 'left' | 'right';
  },
) => {
  const {t} = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          {renderButtonPosition === 'left' && renderButtons && renderButtons()}
          {onAddPress && (
            <Item
              title={t('Button.Add')}
              IconComponent={MaterialIcons}
              iconName="add"
              iconSize={24}
              onPress={onAddPress}
            />
          )}
          {onSavePress && (
            <Item
              title={t('Button.Save')}
              IconComponent={MaterialIcons}
              iconName="save"
              iconSize={24}
              onPress={onSavePress}
            />
          )}
          {onDeletePress && (
            <Item
              title={t('Button.Delete')}
              IconComponent={MaterialCommunityIcons}
              iconName="trash-can-outline"
              iconSize={24}
              onPress={onDeletePress}
            />
          )}
          {onEditPress && (
            <Item
              title={t('Button.Edit')}
              IconComponent={MaterialIcons}
              iconName="edit"
              iconSize={24}
              onPress={onEditPress}
            />
          )}
          {onSearchPress && (
            <Item
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
