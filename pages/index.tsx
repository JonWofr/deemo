import type { NextPage } from 'next';
import Link from 'next/link';
import RecordIcon from '../assets/icons/record-icon.svg';
import Button from '../components/button';
import Head from 'next/head';
import styles from './index.module.scss';
import classNames from 'classnames';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deemo</title>
      </Head>
      <main
        className={classNames(
          styles.hero,
          'w-screen h-screen flex flex-col justify-center bg-center bg-cover'
        )}
      >
        <div className="container flex flex-col items-center">
          <h1 className="font-bold text-5xl text-primary md:text-7xl text-center mb-4">
            Decentralised
            <br />
            <span className="bg-gradient-to-r from-accentTo via-accentFrom to-accentTo bg-left [background-size:_200%,_100%] bg-clip-text text-transparent animate-backgroundMove ">
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
