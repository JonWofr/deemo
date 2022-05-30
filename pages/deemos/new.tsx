import React, { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import CreateDeemoCard from '../../components/create-deemo-card';
import Layout from '../../components/layout';
import { chain, GetAccountResult } from '@wagmi/core';
import { BaseProvider } from '@ethersproject/providers';
import ConnectWalletButtons from '../../components/connect-wallet-buttons';
import { abbreviateHash } from '../../lib/helper-functions';
import Head from 'next/head';
import Button from '../../components/button';
import ReplaceIcon from '../../assets/icons/replace-icon.svg';

const NewDeemo = () => {
  const [account, setAccount] = useState<
    GetAccountResult<BaseProvider> | undefined
  >(undefined);
  const { data } = useAccount();
  const { activeChain, switchNetwork } = useNetwork();

  useEffect(() => setAccount(data), [data]);

  const renderNote = () => {
    if (account && isRightNetwork())
      return `Currently connected to ${
        account.address ? abbreviateHash(account.address) : ''
      }`;
    else if (account && !isRightNetwork())
      return 'You are connected to the wrong network. Please change your network to Polygon Mumbai.';
    else {
      return 'You can only mint a Deemo once you connect the dApp with your wallet!';
    }
  };

  const isRightNetwork = () => {
    return activeChain?.id === chain.polygonMumbai.id;
  };

  const renderContent = () => {
    if (account && isRightNetwork()) {
      return <CreateDeemoCard />;
    } else if (account && !isRightNetwork() && switchNetwork) {
      return (
        <div className="flex justify-center">
          <Button
            Icon={ReplaceIcon}
            label="Change Network"
            onClick={() => switchNetwork(chain.polygonMumbai.id)}
          />
        </div>
      );
    } else return <ConnectWalletButtons />;
  };

  return (
    <>
      <Head>
        <title>New Deemo</title>
      </Head>
      <Layout>
        <h1 className="font-bold text-primary text-3xl mb-6 md:text-5xl text-center">
          Create a Deemo
        </h1>
        <p className="text-secondary mb-4 text-center text-xs">
          {renderNote()}
        </p>
        {renderContent()}
      </Layout>
    </>
  );
};

export default NewDeemo;
