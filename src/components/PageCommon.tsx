import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import LinesModal from '../components/LinesModal';
import { Station } from '../models/StationAPI';
import styles from './PageCommon.module.css';

type Props = {
  photoUrl: string;
  photoLoading: boolean;
  station: Station;
  notHome?: boolean;
  onRefresh?: () => void;
  poorAccuracy?: boolean;
};

const isJa = navigator.language.startsWith('ja');

const PageCommon: React.FC<Props> = ({
  station,
  photoUrl,
  photoLoading,
  notHome,
  onRefresh,
  poorAccuracy,
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
  const stationType = ((): string => {
    if (!isJa) {
      return 'Station';
    }
    return station.lines[0].lineType === 4 ? '停留場' : '駅';
  })();

  const fullStationName = isJa
    ? `${station.name}${stationType}`
    : `${station.nameR} ${stationType}`;

  const handleSnackbarClick = (): void => {
    setSnackbarText('');
    setShowSnackbar(false);
  };
  const handleLineInfoClick = (): void => {
    setIsLinesModalShow(true);
  };
  const handleModalClose = (): void => {
    setIsLinesModalShow(false);
  };

  const shareMessage = ((): string => {
    if (!isJa) {
      return notHome ? `${fullStationName}` : `I'm close ${fullStationName}`;
    }

    return notHome
      ? `${fullStationName}(${station?.address})`
      : `私は${fullStationName}(${station?.address})付近にいます`;
  })();

  const handleShareButtonClick = async (): Promise<void> => {
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
  };

  const containerStyle = ((): { background: string } => ({
    background: `#333 url("${photoUrl}") no-repeat center center / cover`,
  }))();

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
            <button
              onClick={handleShareButtonClick}
              className={[styles.button, styles.autoWidth].join(' ')}
            >
              <FontAwesomeIcon icon={faShareAlt} />
            </button>
          </div>
          <div className={styles.altButtons}>
            {notHome && (
              <Link
                to="/"
                className={[
                  styles.button,
                  styles.buttonFull,
                  styles.autoWidth,
                ].join(' ')}
              >
                {isJa ? '自分の最寄り駅を見る' : 'My closest station'}
              </Link>
            )}
            {!notHome && (
              <button
                onClick={onRefresh}
                className={[styles.button, styles.buttonFull].join(' ')}
              >
                {isJa ? '再読み込み' : 'Refresh'}
              </button>
            )}
          </div>
          {poorAccuracy && (
            <p className={styles.poorAccuracy}>
              {isJa
                ? '現在ご使用の環境に応じて、低い精度の位置情報を使用しています。'
                : `We are currently using low accuracy location information depending on your environment.`}
            </p>
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

export default PageCommon;
