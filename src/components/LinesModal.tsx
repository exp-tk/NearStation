import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Line, Station } from '../gen/proto/stationapi_pb';
import useStatiosByLineId from '../hooks/useStatiosByLineId';

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

const LinesList = styled.ul`
  max-height: calc(100vh - 64px);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  list-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const LineRow = styled.li`
  padding: 21px;
`;
const LineName = styled.li``;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const LoadingText = styled.p`
  padding: 21px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #212121;
  padding: 0 21px;
  height: 64px;
`;

const BackIcon = styled(FontAwesomeIcon)`
  margin-right: 21px;
  cursor: pointer;
  color: #fff;
`;

const CloseIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #fff;
`;

const HeaderTitle = styled.span`
  font-size: 1.2rem;
  color: #fff;
`;

const StationOrLineList: React.FC<StationOrLineListProps> = ({
  selectedLine,
  lines,
  stations,
  handleLineClick,
  handleLinkClick,
}: StationOrLineListProps) => {
  const getLineStyle = (line: Line): { borderLeft: string } => ({
    borderLeft: `21px solid #${line.color}`,
  });

  return (
    <LinesList>
      {!selectedLine
        ? lines.map((l) => (
            <LineRow
              onClick={(): void => handleLineClick(l)}
              key={l.id}
              style={getLineStyle(l)}
            >
              <span>{isJa ? l.nameShort : l.nameRoman}</span>
            </LineRow>
          ))
        : null}

      {selectedLine && !stations.length ? (
        <LoadingText>{isJa ? '読込中...' : 'Loading...'}</LoadingText>
      ) : null}
      {selectedLine
        ? stations.map((s) => (
            <StyledLink
              onClick={handleLinkClick}
              to={`/station/${s.groupId}`}
              key={s.id}
            >
              <LineRow style={getLineStyle(selectedLine)}>
                <LineName>{isJa ? s.name : s.nameRoman}</LineName>
              </LineRow>
            </StyledLink>
          ))
        : null}
    </LinesList>
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
        ? `${selectedLine.nameShort}の駅`
        : `Stations at ${selectedLine.nameRoman}`;
    }

    return isJa
      ? `${station.name}駅の路線`
      : `Lines at ${station.nameRoman} station`;
  })();

  return (
    <Modal
      closeTimeoutMS={250}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      contentLabel={
        isJa
          ? `${station.name}駅の路線`
          : `Lines at ${station.nameRoman} station`
      }
    >
      <Header>
        {selectedLine && (
          <BackIcon onClick={handleBackClick} icon={faChevronLeft} />
        )}
        <HeaderTitle>{headerTitle}</HeaderTitle>
        <CloseIcon onClick={handleCloseModal} icon={faTimes} />
      </Header>
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
