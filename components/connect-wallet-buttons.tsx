import React, { useEffect, useState } from 'react';
import Button from './button';
import ConnectIcon from '../assets/icons/connect-icon.svg';
import { useConnect } from 'wagmi';
import Connection from '../models/connection';
import MetaMaskIcon from '../assets/icons/metamask-icon.svg';
import CoinbaseIcon from '../assets/icons/coinbase-icon.svg';
import WalletConnectIcon from '../assets/icons/wallet-connect-icon.svg';

const walletIcons: { [key: string]: React.FunctionComponent } = {
  MetaMask: MetaMaskIcon,
  'Coinbase Wallet': CoinbaseIcon,
  WalletConnect: WalletConnectIcon,
  Injected: ConnectIcon,
};

const ConnectWalletButtons = () => {
  const [connection, setConnection] = useState<Connection | undefined>(
    undefined
  );

  const result = useConnect();

  useEffect(() => setConnection(result), []);

  return (
    <div className="flex flex-col gap-2 max-w-sm mx-auto">
      {connection?.connectors.map((connector) => (
        <Button
          isDisabled={!connector.ready}
          key={connector.id}
          onClick={() => connection.connect(connector)}
          label={`${connector.name}
          ${!connector.ready ? ' (unsupported)' : ''}
          ${
            connection.isConnecting &&
            connector.id === connection.pendingConnector?.id
              ? ' (connecting)'
              : ''
          }`}
          Icon={walletIcons[connector.name] ?? ConnectIcon}
        ></Button>
      ))}
      {connection?.error && (
        <p className="text-red-400 text-center">{connection.error.message}</p>
      )}
    </div>
  );
};

export default ConnectWalletButtons;
