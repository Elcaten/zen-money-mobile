import {useRef} from 'react';
import {Animated, Easing} from 'react-native';

export const useShake = () => {
  const {current: shakeAnimationValue} = useRef(new Animated.Value(0));

  const translateX = shakeAnimationValue.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -15, 0, 15, 0, -15, 0],
  });

  const shake = () => {
    shakeAnimationValue.setValue(0);
    Animated.timing(shakeAnimationValue, {
      duration: 375,
      toValue: 3,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  return {shake, translateX};
};
