import * as React from 'react';
import {Switch as RNESwitch, SwitchProps} from 'react-native-elements';

export const Switch: React.FC<SwitchProps> = (props) => {
  return <RNESwitch {...props} />;
};
