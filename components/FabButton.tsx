import * as React from 'react';
import {FloatingAction, IFloatingActionProps} from '../lib/react-native-floating-action';
import {useNavigatorThemeColors} from '../themes';

export interface FabButtonProps extends IFloatingActionProps {}

export const FabButton: React.FC<IFloatingActionProps> = (props) => {
  const {primary} = useNavigatorThemeColors();
  return <FloatingAction color={primary} {...props} />;
};
