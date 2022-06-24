import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  color: #fff;
  position: absolute;
  bottom: 24px;
  opacity: 0.5;
  left: 0;
  right: 0;
  text-align: center;
`;

const ForkMeOn = styled.p`
  margin-bottom: 8px;
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;
  margin-bottom: 8px;
  line-height: 24px;
  .link:active {
    outline: none;
  }
`;

const AppFooter: React.FC = () => (
  <Footer>
    <ForkMeOn>
      <Link
        href="https://github.com/TinyKitten/NearStation"
        rel="noopener noreferrer"
        target="_blank"
      >
        Fork me on GitHub
      </Link>
    </ForkMeOn>
    <Link
      rel="noopener noreferrer"
      target="_blank"
      href="https://tinykitten.me"
    >
      Copyright &copy;&nbsp;2018-{new Date().getFullYear()}&nbsp;TinyKitten
    </Link>
  </Footer>
);

export default AppFooter;
