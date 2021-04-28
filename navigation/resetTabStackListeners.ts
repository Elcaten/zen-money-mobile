import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {EventArg, NavigationState, StackActions} from '@react-navigation/native';
import {Platform} from 'react-native';

export function resetTabStackListener() {
  console.log('OUTER');
  // On Android, we want to clear the tab stack history when a user returns to the tab.
  if (Platform.OS === 'android') {
    return function ResetTabStackListener({navigation}: BottomTabScreenProps<Record<string, undefined>>) {
      console.log('INNER');

      // To accomplish the above without delaying the tab switch or incurring loading or animation UX, we
      // clear the history of all tab stacks except for the one being navigated to. This means that the
      // prior stack will be at the desired state if the user returns to it. Since we don't know which
      // tab the user was coming from, we must clear all but the target stack.
      return {
        tabPress: (e: EventArg<'tabPress', true>) => {
          const state = navigation.dangerouslyGetState();

          if (state) {
            const nonTargetTabs = state.routes.filter((r) => r.key !== e.target);

            nonTargetTabs.forEach((tab) => {
              const stackKey = (tab.state as NavigationState)?.key;

              if (stackKey) {
                navigation.dispatch({
                  ...StackActions.popToTop(),
                  target: stackKey,
                });
              }
            });
          }
        },
      };
    };
  } else {
    // iOS preserves history.
    return undefined;
  }
}
