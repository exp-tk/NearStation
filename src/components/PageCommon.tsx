import React, { useCallback, useMemo, useState } from 'react';
import styles from './PageCommon.module.css';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import LinesModal from '../components/LinesModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { useAlert } from 'react-alert';
import { Station } from '../models/StationAPI';
import { Link } from 'react-router-dom';

type Props = {
  photoUrl: string | undefined;
  station: Station;
  notHome?: boolean;
};

const PageCommon: React.FC<Props> = ({ station, photoUrl, notHome }: Props) => {
  const [isLinesModalShow, setIsLinesModalShow] = useState(false);

  const alert = useAlert();

  const handleLineInfoClick = useCallback(() => {
    setIsLinesModalShow(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsLinesModalShow(false);
  }, []);

  const handleShareButtonClick = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = navigator as any;
    const message = notHome
      ? `${station?.name}駅(${station?.address})`
      : `私は${station?.name}駅(${station?.address})付近にいます`;
    if ('share' in navigator) {
      nav.share({
        title: 'NearStation',
        text: message,
        url: `https://near.tinykitten.me/station/${station?.groupId}`,
      });
      return;
    }
    if ('clipboard' in navigator) {
      nav.clipboard.writeText(
        `${message} https://near.tinykitten.me/station/${station?.groupId}`
      );
      alert.show('クリップボードにリンクをコピーしました！');
      return;
    }
    alert.error('シェア用APIが利用できません！');
  }, [alert, notHome, station]);

  const containerStyle = useMemo(
    () => ({
      background: `#333 url("${photoUrl}") no-repeat center center / cover`,
    }),
    [photoUrl]
  );

  return (
    <Layout>
      {station && (
        <Helmet>
          <title>{station.name} - NearStation</title>
          <meta name="description" content={`${station.name}駅`} />
          <meta name="og:description" content={`${station.name}駅`} />
          <meta
            name="og:url"
            content={`${process.env.PUBLIC_URL}/station/${station.groupId}`}
          />
          <meta name="og:title" content={`${station.name} - NearStation`} />
          <meta name="og:type" content="article" />
        </Helmet>
      )}
      <main className={styles.container} style={containerStyle}>
        <div className={styles.inner}>
          <h1 className={styles.name}>{station.name}</h1>
          <h2 className={styles.address}>{station.address}</h2>
          <div className={styles.buttons}>
            <button onClick={handleLineInfoClick} className={styles.button}>
              路線情報
            </button>
            <button onClick={handleShareButtonClick} className={styles.button}>
              <FontAwesomeIcon icon={faShareAlt} />
            </button>
          </div>
          {notHome && (
            <Link to="/" className={styles.button}>
              自分の最寄り駅を見る
            </Link>
          )}
        </div>
      </main>
      <LinesModal
        station={station}
        lines={station.lines}
        closeModal={handleModalClose}
        isOpen={isLinesModalShow}
      />
    </Layout>
  );
};

export default React.memo(PageCommon);