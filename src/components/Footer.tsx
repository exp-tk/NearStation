import React, { memo } from 'react';
import styles from './Footer.module.css';
import tinykitten from '../assets/tinykitten.svg';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <a
      href="https://tinykitten.me"
      rel="noopener noreferrer"
      target="_blank"
      className={[styles.link, styles.productof].join(' ')}
    >
      A product of&nbsp;
      <img src={tinykitten} alt="TinyKitten" />
    </a>
    <p className={[styles.link, styles.copyright].join(' ')}>
      Copyright &copy; {new Date().getFullYear()}&nbsp;
      <a rel="noopener noreferrer" target="_blank" href="https://tinykitten.me">
        TinyKitten
      </a>
    </p>
  </footer>
);

export default memo(Footer);
