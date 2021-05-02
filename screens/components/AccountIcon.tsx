import React from 'react';
import {AccountType} from '../../api/models';
import {BankIcon, HelpIcon, IconProps, WalletIcon} from '../../components/Icons';

export type AccountIconProps = IconProps & {
  type: AccountType;
};

export const AccountIcon: React.FC<AccountIconProps> = ({type, ...props}) => {
  switch (type) {
    case 'cash':
      return <WalletIcon {...props} />;
    case 'ccard':
    case 'checking':
      return <BankIcon {...props} />;
    default:
      return <HelpIcon {...props} />;
  }
};
