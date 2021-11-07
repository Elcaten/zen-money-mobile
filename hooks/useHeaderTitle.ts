import {StackNavigationProp} from '@react-navigation/stack';
import {useLayoutEffect} from 'react';
import type {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack';

export function useHeaderTitle<T extends Record<string, object | undefined>>(
  navigation: Pick<StackNavigationProp<T>, 'setOptions'>,
  title?: Parameters<StackNavigationProp<T>['setOptions']>[0]['headerTitle'],
) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [title, navigation]);
}

export function useNativeHeaderTitle<T extends Record<string, object | undefined>>(
  navigation: NativeStackNavigationProp<T>,
  title?: Parameters<NativeStackNavigationProp<T>['setOptions']>[0]['headerTitle'],
) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [title, navigation]);
}
