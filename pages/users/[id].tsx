import { GetServerSideProps } from 'next';
import React from 'react';
import DeemoCard from '../../components/deemo-card';
import Layout from '../../components/layout';
import { abbreviateHash } from '../../lib/deemos';
import Deemo from '../../models/deemo';
import { deemos } from '../deemos';

type Props = {
  id: string;
  deemos: Deemo[];
};

const User = ({ id, deemos }: Props) => {
  return (
    <Layout>
      <h1 className="font-bold font-primary text-primary text-3xl mb-6">
        {abbreviateHash(id)}'s Deemos
      </h1>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {deemos.length > 0 ? (
          deemos.map((deemo) => <DeemoCard key={deemo.tokenId} deemo={deemo} />)
        ) : (
          <p className="text-secondary">
            It appears this user does not own any Deemos!
          </p>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.params!.id as string;
  const ownedDeemos = deemos.filter((deemo) => deemo.owner === id);
  return {
    props: {
      id,
      deemos: ownedDeemos,
    },
  };
};

export default User;
