import React, {isValidElement} from 'react';
import {ScrollView} from 'react-native';

const ScrollViewWithHeaderComponent: React.ForwardRefRenderFunction<
  ScrollViewWithHeaderHadle,
  ScrollViewWithHeaderProps
> = ({children, HeaderComponent, ...rest}, ref) => {
  return (
    <ScrollView ref={ref as unknown as any} {...rest}>
      {HeaderComponent ? isValidElement(HeaderComponent) ? HeaderComponent : <HeaderComponent /> : null}
      {children}
    </ScrollView>
  );
};

export const ScrollViewWithHeader = React.forwardRef(ScrollViewWithHeaderComponent);

export interface ScrollViewWithHeaderProps {
  HeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

export interface ScrollViewWithHeaderHadle {}
