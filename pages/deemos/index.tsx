import Head from 'next/head';
import { useContract, chain, useSigner } from 'wagmi';
import DeemoCard from '../../components/deemo-card';
import Layout from '../../components/layout';
import Deemo from '../../models/deemo';
import deemoContract from '../../contracts/DeemoNFT.json';
import { DeemoContractHelper } from '../../lib/deemo-contract-helper';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Spinner from '../../components/spinner';

const Deemos = () => {
  const [deemos, setDeemos] = useState<Deemo[]>([]);
  const [shouldShowSpinner, setShouldShowSpinner] = useState(false);
  const provider = new ethers.providers.AlchemyProvider(
    chain.polygonMumbai.id,
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  );
  const contract = useContract({
    addressOrName: '0xaF9884b0c98C9Dc3f9fD495Dd986a78AdC61b904',
    contractInterface: deemoContract.abi,
    signerOrProvider: provider,
  });
  useEffect(() => {
    (async () => {
      try {
        setShouldShowSpinner(true);
        const deemoContractHelper = new DeemoContractHelper(contract);
        const deemos = await deemoContractHelper.fetchAllDeemos();
        setDeemos(deemos);
      } catch (err) {
        console.error(err);
      } finally {
        setShouldShowSpinner(false);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>All Deemos</title>
      </Head>
      <Layout>
        <h1 className="font-bold text-primary text-3xl mb-14 md:text-5xl text-center">
          All Deemos
        </h1>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] min-h-[300px] relative">
          {shouldShowSpinner ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Spinner />
            </div>
          ) : (
            <>
              {deemos.map((deemo) => (
                <DeemoCard key={deemo.tokenId} deemo={deemo} />
              ))}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Deemos;
