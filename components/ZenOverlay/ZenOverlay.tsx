import React from 'react';
import {Overlay, OverlayProps} from 'react-native-elements/dist/overlay/Overlay';
import {useNavigatorThemeColors} from '../../themes';

export const ZenOverlay: React.FC<OverlayProps> = (props) => {
  const {background} = useNavigatorThemeColors();

  return <Overlay {...props} overlayStyle={{backgroundColor: background, padding: 0, margin: 0}} />;
};
