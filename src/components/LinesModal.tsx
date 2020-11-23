import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import useStatiosByLineId from '../hooks/useStatiosByLineId';
import { Line, Station } from '../models/StationAPI';
import styles from './LinesModal.module.css';
import { Button, Snackbar } from '@material-ui/core';

type Props = {
  isOpen: boolean;
  onAfterOpen?: () => void;
  closeModal: () => void;
  station: Station;
  lines: Line[];
};

const customStyles: Modal.Styles = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: '480px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
  },
};

const isJa = navigator.language.startsWith('ja');

type StationOrLineListProps = {
  selectedLine: Line | null;
  lines: Line[];
  stations: Station[];
  handleLineClick: (line: Line) => void;
  handleLinkClick: () => void;
};

const StationOrLineList: React.FC<StationOrLineListProps> = ({
  selectedLine,
  lines,
  stations,
  handleLineClick,
  handleLinkClick,
}: StationOrLineListProps) => {
  const getLineStyle = useCallback(
    (line: Line) => ({
      borderLeft: `21px solid #${line.lineColorC}`,
    }),
    []
  );

  return (
    <ul className={styles.lines}>
      {!selectedLine
        ? lines.map((l) => (
            <li
              onClick={(): void => handleLineClick(l)}
              className={styles.padding}
              key={l.id}
              style={getLineStyle(l)}
            >
              <span className={styles.lineName}>{isJa ? l.name : l.nameR}</span>
            </li>
          ))
        : null}

      {selectedLine && !stations.length ? (
        <p className={styles.padding}>{isJa ? '読込中...' : 'Loading...'}</p>
      ) : null}
      {selectedLine
        ? stations.map((s) => (
            <li
              className={styles.padding}
              key={s.id}
              style={getLineStyle(selectedLine)}
            >
              <Link
                onClick={handleLinkClick}
                to={`/station/${s.groupId}`}
                className={styles.link}
              >
                <span className={styles.lineName}>
                  {isJa ? s.name : s.nameR}
                </span>
              </Link>
            </li>
          ))
        : null}
    </ul>
  );
};

const LinesModal: React.FC<Props> = ({
  isOpen,
  onAfterOpen,
  closeModal,
  station,
  lines,
}: Props) => {
  const [selectedLine, setSelectedLine] = useState<Line | null>(null);
  const [errorSnackbarOpened, setErrorSnackbarOpened] = useState(false);

  const [fetchFunc, stations, error] = useStatiosByLineId();

  const handleLineClick = useCallback(
    (line: Line) => {
      if (!isOpen) {
        return;
      }
      fetchFunc(line.id);
      setSelectedLine(line);
    },
    [fetchFunc, isOpen]
  );

  const handleCloseModal = useCallback(() => {
    closeModal();
    setSelectedLine(null);
  }, [closeModal]);

  useEffect(() => {
    if (error) {
      setErrorSnackbarOpened(true);
    }
  }, [error]);

  const handleDismissError = useCallback(() => {
    setErrorSnackbarOpened(false);
  }, []);

  const handleBackClick = useCallback(() => setSelectedLine(null), []);

  const headerTitle = useMemo(() => {
    if (selectedLine) {
      return isJa
        ? `${selectedLine.name}の駅`
        : `Stations at ${selectedLine.nameR}`;
    }

    return isJa
      ? `${station.name}駅の路線`
      : `Lines at ${station.nameR} station`;
  }, [selectedLine, station.name, station.nameR]);

  return (
    <Modal
      closeTimeoutMS={250}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      contentLabel={
        isJa ? `${station.name}駅の路線` : `Lines at ${station.nameR} station`
      }
    >
      <header className={styles.header}>
        {selectedLine && (
          <FontAwesomeIcon
            onClick={handleBackClick}
            className={styles.backIcon}
            icon={faChevronLeft}
          />
        )}
        <span className={styles.headerTitle}>{headerTitle}</span>
        <FontAwesomeIcon
          onClick={handleCloseModal}
          className={styles.closeIcon}
          icon={faTimes}
        />
      </header>
      {isOpen ? (
        <StationOrLineList
          selectedLine={selectedLine}
          lines={lines}
          stations={stations}
          handleLineClick={handleLineClick}
          handleLinkClick={handleCloseModal}
        />
      ) : null}
      <Snackbar
        open={errorSnackbarOpened}
        message={isJa ? 'エラーが発生しました！' : 'An error occurred!'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          <Button color="inherit" size="small" onClick={handleDismissError}>
            {isJa ? 'リロード' : 'Reload'}
          </Button>
        }
      />
    </Modal>
  );
};

export default React.memo(LinesModal);
