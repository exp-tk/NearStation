import React from 'react';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => (
  <>
    {children}
    <Footer />
  </>
);

export default Layout;
