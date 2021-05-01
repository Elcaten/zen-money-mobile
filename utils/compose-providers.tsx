import React from 'react';

export function composeProviders(...Providers: React.ComponentType<any>[]) {
  return (Child: React.ComponentType<any>) => (props: any) =>
    Providers.reduce((acc, Provider) => <Provider>{acc}</Provider>, <Child {...props} />);
}
