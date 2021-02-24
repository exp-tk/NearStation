import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  photoUrl: string;
  photoLoading: boolean;
  station: Station;
  notHome?: boolean;
  onRefresh?: () => void;
};

const isJa = navigator.language.startsWith('ja');

const PageCommon: React.FC<Props> = ({
  station,
  photoUrl,
  photoLoading,
  notHome,
  onRefresh,
}: Props) => {
  const [isLinesModalShow, setIsLinesModalShow] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  useEffect(() => {
    if (!photoLoading && !photoUrl.length) {
      setSnackbarText(
        isJa
          ? '駅画像が見つかりませんでした！'
          : 'The station image was not found!'
      );
      setShowSnackbar(true);
    }
  }, [photoLoading, photoUrl]);

  // 4 === Tram
  const stationType = useMemo(() => {
    if (!isJa) {
      return 'Station';
    }
    return station.lines[0].lineType === 4 ? '停留場' : '駅';
  }, [station.lines]);

  const fullStationName = isJa
    ? `${station.name}${stationType}`
    : `${station.nameR} ${stationType}`;

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

  const shareMessage = useMemo(() => {
    if (!isJa) {
      return notHome ? `${fullStationName}` : `I'm near ${fullStationName}`;
    }

    return notHome
      ? `${fullStationName}(${station?.address})`
      : `私は${fullStationName}(${station?.address})付近にいます`;
  }, [fullStationName, notHome, station]);

  const handleShareButtonClick = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = navigator as any;
    try {
      if ('share' in navigator) {
        await nav.share({
          title: 'NearStation',
          text: shareMessage,
          url: `https://near.tinykitten.me/station/${station?.groupId}`,
        });
        return;
      }
      if ('clipboard' in navigator) {
        await nav.clipboard.writeText(
          `${shareMessage} https://near.tinykitten.me/station/${station?.groupId}`
        );
        setSnackbarText(
          isJa ? 'クリップボードにリンクをコピーしました！' : 'Link copied!'
        );
        setShowSnackbar(true);
        return;
      }
      setShowSnackbar(true);
      setSnackbarText(
        isJa
          ? 'シェア用APIが利用できません！'
          : 'The API for sharing is not available!'
      );
    } catch (err) {
      console.error(err);
      setShowSnackbar(true);
      setSnackbarText(isJa ? 'シェアできませんでした！' : `Couldn't share!`);
    }
  }, [shareMessage, station]);

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
          <title>{isJa ? station.name : station.nameR} - NearStation</title>
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
          <h1
            style={{ letterSpacing: isJa ? '2px' : '0px' }}
            className={styles.name}
          >
            {isJa ? station.name : station.nameR}
          </h1>
          <h2 className={styles.address}>{station.address}</h2>
          <div className={styles.buttons}>
            <button onClick={handleLineInfoClick} className={styles.button}>
              {isJa ? '路線情報' : 'Lines'}
            </button>
            <button onClick={handleShareButtonClick} className={styles.button}>
              <FontAwesomeIcon icon={faShareAlt} />
            </button>
          </div>
          {notHome && (
            <Link to="/" className={styles.button}>
              {isJa ? '自分の最寄り駅を見る' : 'My closest station'}
            </Link>
          )}
          {!notHome && (
            <button onClick={onRefresh} className={styles.button}>
              {isJa ? '再読み込み' : 'Refresh'}
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
