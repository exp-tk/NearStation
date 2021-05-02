import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
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
    overflow: 'hidden',
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
  const getLineStyle = (line: Line): { borderLeft: string } => ({
    borderLeft: `21px solid #${line.lineColorC}`,
  });

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
            <Link
              onClick={handleLinkClick}
              to={`/station/${s.groupId}`}
              className={styles.link}
              key={s.id}
            >
              <li className={styles.padding} style={getLineStyle(selectedLine)}>
                <span className={styles.lineName}>
                  {isJa ? s.name : s.nameR}
                </span>
              </li>
            </Link>
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

  const handleLineClick = (line: Line): void => {
    if (!isOpen) {
      return;
    }
    fetchFunc(line.id);
    setSelectedLine(line);
  };

  const handleCloseModal = (): void => {
    closeModal();
    setSelectedLine(null);
  };

  useEffect(() => {
    if (error) {
      setErrorSnackbarOpened(true);
    }
  }, [error]);

  const handleDismissError = (): void => setErrorSnackbarOpened(false);

  const handleBackClick = (): void => setSelectedLine(null);

  const headerTitle = ((): string => {
    if (selectedLine) {
      return isJa
        ? `${selectedLine.name}の駅`
        : `Stations at ${selectedLine.nameR}`;
    }

    return isJa
      ? `${station.name}駅の路線`
      : `Lines at ${station.nameR} station`;
  })();

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

export default LinesModal;
