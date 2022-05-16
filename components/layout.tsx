import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <main className="container py-28">{children}</main>;
};

export default Layout;
