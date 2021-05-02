import React from 'react';
import styles from './ErrorScreen.module.css';
import { Link } from 'react-router-dom';
import Layout from './Layout';

type Props = {
  error: string;
  onRetry?: () => void;
  fromNoMatch?: boolean;
};

const ErrorScreen: React.FC<Props> = ({
  error,
  onRetry,
  fromNoMatch,
}: Props) => (
  <Layout>
    <main className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.errorCode}>{error}</h1>
        <p className={styles.message}>
          申し訳ありませんが、リクエストの処理中にエラーが発生しました。
        </p>
        {onRetry && (
          <button onClick={onRetry} className={styles.button}>
            リトライ
          </button>
        )}
        {fromNoMatch && (
          <Link to="/" className={styles.button}>
            トップ
          </Link>
        )}
      </div>
    </main>
  </Layout>
);

export default ErrorScreen;
