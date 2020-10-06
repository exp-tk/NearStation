import React, { memo } from 'react';
import styles from './ErrorScreen.module.css';
import { Link } from 'react-router-dom';
import Layout from './Layout';

type Props = {
  error: string;
};

const ErrorScreen: React.FC<Props> = ({ error }: Props) => (
  <Layout>
    <main className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.errorCode}>{error}</h1>
        <p className={styles.message}>
          申し訳ありませんが、リクエストの処理中にエラーが発生しました。
        </p>
        <Link to="/" className={styles.button}>
          トップ
        </Link>
      </div>
    </main>
  </Layout>
);

export default memo(ErrorScreen);
