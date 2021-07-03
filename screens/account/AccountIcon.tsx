import React from 'react';
import {AccountType} from '../../api/models';
import {BankIcon, HelpIcon, IconProps, WalletIcon} from '../../components';

export type AccountIconProps = IconProps & {
  type: AccountType;
};

export const AccountIcon: React.FC<AccountIconProps> = ({type, ...props}) => {
  switch (type) {
    case AccountType.Cash:
      return <WalletIcon {...props} />;
    case AccountType.Card:
    case AccountType.Checking:
      return <BankIcon {...props} />;
    default:
      return <HelpIcon {...props} />;
  }
};
