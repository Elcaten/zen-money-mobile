import {useRef} from 'react';
import {Animated} from 'react-native';

export const useToolbarOpacity = (height: number) => {
  const {current: scrollY} = useRef<Animated.Value>(new Animated.Value(0));
  const opacity = scrollY.interpolate({
    inputRange: [0, height],
    outputRange: [0, 1],
  });
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
    useNativeDriver: false,
  });
  return {opacity, onScroll};
};
