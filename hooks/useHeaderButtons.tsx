import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
import React, {useLayoutEffect} from 'react';
import {HeaderButtons} from 'react-navigation-header-buttons';

export const useHeaderButtons = (
  navigation: {setOptions: (options: StackHeaderOptions) => void},
  renderButtons: () => React.ReactNode[] | React.ReactNode,
) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButtons>{renderButtons()}</HeaderButtons>,
    });
  }, [navigation, renderButtons]);
};
