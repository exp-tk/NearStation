import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Layout from '../components/Layout';
import LinesModal from '../components/LinesModal';
import { Station } from '../models/StationAPI';

type Props = {
  photoUrl: string;
  photoLoading: boolean;
  station: Station;
  notHome?: boolean;
  onRefresh?: () => void;
  poorAccuracy?: boolean;
};

const isJa = navigator.language.startsWith('ja');

const Container = styled.main`
  position: relative;
  height: 100vh;
  margin: 0;
  background-color: #333;
  text-align: center;
`;

const Inner = styled.div`
  background: rgba(0, 0, 0, 0.75);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
`;

const StationName = styled.h1`
  font-size: 2.5rem;
`;

const StationAddress = styled.h2`
  font-weight: normal;
  font-size: 1rem;
  letter-spacing: 1px;
  opacity: 0.75;
  margin-top: 8px;
`;

const Buttons = styled.div`
  display: flex;
  width: 240px;
  max-width: 85%;
`;

const buttonMixin = css`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  border: 1px solid white;
  cursor: default;
  text-align: center;
  margin: 16px 8px 0 8px;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  appearance: none;
  width: 100%;

  :first-child {
    margin-left: 0;
  }
  :last-child {
    margin-right: 0;
  }
  :focus {
    outline: none;
  }
`;

const LinesButton = styled.button`
  ${buttonMixin};
`;

const AutoWidthButton = styled.button`
  ${buttonMixin};
  width: auto;
`;

const AltButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  max-width: 85%;
`;

const ClosestStationButton = styled(Link)`
  ${buttonMixin};
  width: 100%;
  margin-left: 0;
  margin-right: 0;
`;

const ReloadButton = styled.button`
  ${buttonMixin};
  margin-left: 0;
  margin-right: 0;
  width: auto;
`;

const AccuracyWarning = styled.p`
  font-weight: normal;
  font-size: 0.75rem;
  letter-spacing: 1px;
  opacity: 0.75;
  margin-top: 24px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

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
            content={`${import.meta.env.BASE_URL}/station/${station.groupId}`}
          />
          <meta name="og:title" content={`${station.name} - NearStation`} />
          <meta name="og:type" content="article" />
        </Helmet>
      )}
      <Container style={containerStyle}>
        <Inner>
          <StationName style={{ letterSpacing: isJa ? '2px' : '0px' }}>
            {isJa ? station.name : station.nameR}
          </StationName>
          <StationAddress>{station.address}</StationAddress>
          <Buttons>
            <LinesButton onClick={handleLineInfoClick}>
              {isJa ? '路線情報' : 'Lines'}
            </LinesButton>
            <AutoWidthButton onClick={handleShareButtonClick}>
              <FontAwesomeIcon icon={faShareAlt} />
            </AutoWidthButton>
          </Buttons>
          <AltButtons>
            {notHome && (
              <ClosestStationButton to="/">
                {isJa ? '自分の最寄り駅を見る' : 'My closest station'}
              </ClosestStationButton>
            )}
            {!notHome && (
              <ReloadButton onClick={onRefresh}>
                {isJa ? '再読み込み' : 'Refresh'}
              </ReloadButton>
            )}
          </AltButtons>
          {poorAccuracy && (
            <AccuracyWarning>
              {isJa
                ? '現在ご使用の環境に応じて、低い精度の位置情報を使用しています。'
                : `We are currently using low accuracy location information depending on your environment.`}
            </AccuracyWarning>
          )}
        </Inner>
      </Container>
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
