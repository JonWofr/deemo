import type { NextPage } from 'next';
import Link from 'next/link';
import RecordIcon from '../assets/icons/record-icon.svg';
import Button from '../components/button';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deemo</title>
      </Head>
      <main className="w-screen h-screen flex flex-col justify-center">
        <div className="container flex flex-col items-center">
          <h1 className="font-bold text-5xl text-primary md:text-7xl text-center mb-4">
            Decentralised
            <br />
            <span className="bg-gradient-to-r from-accentFrom to-accentTo bg-clip-text text-transparent">
              Memos
            </span>
          </h1>
          <p className="text-secondary text-2xl max-w-sm text-center mb-6">
            Make your sounds, vocals, noises{' '}
            <span className="font-bold text-primary">unstoppable</span> by
            bringing them onto the blockchain!
          </p>
          <Link href={'/deemos/new'}>
            <Button Icon={RecordIcon} label="Create Deemo" />
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
