import { logout } from '@elrondnetwork/dapp-core/utils';
import { useGetLoginInfo, useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';

import { Button } from 'common-components';
import React from 'react';
import { Style } from 'types';
import { trimAddress } from 'helper';
import { useNavigate } from 'react-router-dom';

interface MaiarConnectProps {
  invert?: boolean;
  style?: Style;
  onClick?: () => void;
}
const MaiarConnect = (props: MaiarConnectProps) => {
  const { invert, style, onClick } = props;
  const history = useNavigate();
  const { address } = useGetAccountInfo();
  const { isLoggedIn } = useGetLoginInfo();

  if (isLoggedIn && address) {
    const formattedAddress = trimAddress(address);
    return (
      <Button
        onClick={() => logout()}
        style={{ minWidth: '200px', ...style }}
        text={{ hover: 'Logout', nonHover: formattedAddress }}
        invert={invert}
      />
    );
  }

  return (
    <Button
      style={{ minWidth: '200px', ...style }}
      onClick={() => {
        if (onClick) onClick();
        history(`unlock/`);
      }}
      text={{ hover: 'Connect Wallet', nonHover: 'Connect Wallet' }}
      invert={invert}
    />
  );
};

export default MaiarConnect;
