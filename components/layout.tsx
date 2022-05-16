import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="container py-28">{children}</div>;
};

export default Layout;
