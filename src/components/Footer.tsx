import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <p className={styles.marginBottom}>
      <a
        href="https://github.com/TinyKitten/NearStation"
        rel="noopener noreferrer"
        target="_blank"
        className={styles.link}
      >
        Fork me on GitHub
      </a>
    </p>
    <p>
      <a
        className={styles.link}
        rel="noopener noreferrer"
        target="_blank"
        href="https://tinykitten.me"
      >
        Copyright &copy;&nbsp;2018-{new Date().getFullYear()}&nbsp;TinyKitten
      </a>
    </p>
  </footer>
);

export default Footer;
