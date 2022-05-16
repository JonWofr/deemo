import React from 'react';
import CreateDeemoCard from '../../components/create-deemo-card';
import Layout from '../../components/layout';

const NewDeemo = () => {
  return (
    <Layout>
      <h1 className="font-bold font-primary text-primary text-3xl mb-6">
        Create a Deemo
      </h1>
      <CreateDeemoCard />
    </Layout>
  );
};

export default NewDeemo;
