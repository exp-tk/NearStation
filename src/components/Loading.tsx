import React, { memo } from 'react';
import styles from './Loading.module.css';
import loading from '../assets/loading.svg';
import Layout from './Layout';

const Loading: React.FC = () => (
  <Layout>
    <main className={styles.container}>
      <div className={styles.inner}>
        <img src={loading} alt="loading..." />
      </div>
    </main>
  </Layout>
);

export default memo(Loading);
