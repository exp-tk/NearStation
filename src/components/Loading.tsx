import React from 'react';
import styles from './Loading.module.css';
import loading from '../assets/loading.svg';
import Layout from './Layout';

const isJa = navigator.language.startsWith('ja');

type Props = {
  usingLocation?: boolean;
};

const Loading: React.FC<Props> = ({ usingLocation }: Props) => {
  const message = ((): string => {
    if (isJa) {
      return usingLocation
        ? '位置情報を使わせてください！読み込み中です！'
        : '読み込み中です！';
    }
    return usingLocation
      ? 'Please allow the use of location information! Now loading!'
      : 'Now loading!';
  })();

  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.inner}>
          <img src={loading} alt="loading..." />
          <p className={styles.text}>{message}</p>
        </div>
      </main>
    </Layout>
  );
};
export default Loading;
