import React, { useCallback, useMemo, useState } from 'react';
import styles from './PageCommon.module.css';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import LinesModal from '../components/LinesModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Station } from '../models/StationAPI';
import { Link } from 'react-router-dom';
import { Snackbar, Button } from '@material-ui/core';

type Props = {
  photoUrl: string | undefined;
  station: Station;
  notHome?: boolean;
  onRefresh?: () => void;
};

const PageCommon: React.FC<Props> = ({
  station,
  photoUrl,
  notHome,
  onRefresh,
}: Props) => {
  const [isLinesModalShow, setIsLinesModalShow] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  // 4 === Tram
  const stationType = station.lines[0].lineType === 4 ? '停留場' : '駅';

  const fullStationName = `${station.name}${stationType}`;

  const handleSnackbarClick = useCallback(() => {
    setSnackbarText('');
    setShowSnackbar(false);
  }, []);

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
      ? `${fullStationName}(${station?.address})`
      : `私は${fullStationName}(${station?.address})付近にいます`;
    try {
      if ('share' in navigator) {
        await nav.share({
          title: 'NearStation',
          text: message,
          url: `https://near.tinykitten.me/station/${station?.groupId}`,
        });
        return;
      }
      if ('clipboard' in navigator) {
        await nav.clipboard.writeText(
          `${message} https://near.tinykitten.me/station/${station?.groupId}`
        );
        setSnackbarText('クリップボードにリンクをコピーしました！');
        setShowSnackbar(true);
        return;
      }
      setShowSnackbar(true);
      setSnackbarText('シェア用APIが利用できません！');
    } catch (err) {
      console.error(err);
      setShowSnackbar(true);
      setSnackbarText('シェアできませんでした！');
    }
  }, [fullStationName, notHome, station]);

  const containerStyle = useMemo(
    () => ({
      background: `#333 url("${photoUrl}") no-repeat center center / cover`,
    }),
    [photoUrl]
  );

  return (
    <Layout>
      <Snackbar
        open={showSnackbar}
        message={snackbarText}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          <Button color="inherit" size="small" onClick={handleSnackbarClick}>
            OK
          </Button>
        }
      />

      {station && (
        <Helmet>
          <title>{station.name} - NearStation</title>
          <meta name="description" content={`${fullStationName}`} />
          <meta name="og:description" content={`${fullStationName}`} />
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
          {!notHome && (
            <button onClick={onRefresh} className={styles.button}>
              再読み込み
            </button>
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
