import { GetServerSideProps } from 'next';
import DeemoCard from '../../components/deemo-card';
import Layout from '../../components/layout';
import Deemo from '../../models/deemo';

export const deemos: Deemo[] = [
  {
    tokenId: '1',
    title: 'Weird cat sound',
    openSeaURL: 'https://google.com',
    audioCID:
      'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    owner: '0x94aD4e4E11800B8df7f5c848367E0c40Decb699B',
    mintedAt: 10000,
  },
  {
    tokenId: '2',
    title: 'Weird cat sound',
    openSeaURL: 'https://google.com',
    audioCID:
      'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    owner: '0x94aD4e4E11800B8df7f5c848367E0c40Decb699B',
    mintedAt: 10000,
  },
  {
    tokenId: '3',
    title: 'Weird cat sound',
    openSeaURL: 'https://google.com',
    audioCID:
      'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    owner: '0x94aD4e4E11800B8df7f5c848367E0c40Decb699B',
    mintedAt: 10000,
  },
  {
    tokenId: '4',
    title: 'Weird cat sound',
    openSeaURL: 'https://google.com',
    audioCID:
      'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    owner: '0x94aD4e4E11800B8df7f5c848367E0c40Decb699B',
    mintedAt: 10000,
  },
];

type Props = {
  deemos: Deemo[];
};

const Deemos = ({ deemos }: Props) => {
  return (
    <Layout>
      <h1 className="font-bold font-primary text-primary text-3xl mb-6">
        All Deemos
      </h1>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {deemos.map((deemo) => (
          <DeemoCard key={deemo.tokenId} deemo={deemo} />
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      deemos,
    },
  };
};

export default Deemos;
