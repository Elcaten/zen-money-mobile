import {useState} from 'react';
import {useEffect} from 'react';
import {Dimensions, ScaledSize} from 'react-native';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState({window, screen});

  useEffect(() => {
    const onDimensionsChange = (value: {window: ScaledSize; screen: ScaledSize}) => {
      setDimensions(value);
    };
    Dimensions.addEventListener('change', onDimensionsChange);
    return () => Dimensions.removeEventListener('change', onDimensionsChange);
  }, []);

  return dimensions;
};
