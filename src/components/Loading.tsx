import React, { memo } from 'react';
import styles from './Loading.module.css';
import loading from '../assets/loading.svg';
import Layout from './Layout';

const isJa = navigator.language.startsWith('ja');

const Loading: React.FC = () => (
  <Layout>
    <main className={styles.container}>
      <div className={styles.inner}>
        <img src={loading} alt="loading..." />
        <p className={styles.text}>
          {isJa
            ? '位置情報を使わせてください！読み込み中です！'
            : 'Please allow the use of location information! Now loading!'}
        </p>
      </div>
    </main>
  </Layout>
);

export default memo(Loading);
