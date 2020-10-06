import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import Modal from 'react-modal';
import { Line, Station } from '../models/StationAPI';
import styles from './LinesModal.module.css';

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

const LinesModal: React.FC<Props> = ({
  isOpen,
  onAfterOpen,
  closeModal,
  station,
  lines,
}: Props) => {
  const getLineStyle = useCallback(
    (line: Line) => ({
      borderLeft: `21px solid #${line.lineColorC}`,
    }),
    []
  );

  return (
    <Modal
      closeTimeoutMS={2000}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={`${station.name}駅の路線`}
    >
      <header className={styles.header}>
        <span className={styles.headerTitle}>{station.name}駅の路線</span>
        <FontAwesomeIcon
          onClick={closeModal}
          className={styles.closeIcon}
          icon={faTimes}
        />
      </header>
      <ul className={styles.lines}>
        {lines.map((l) => (
          <li className={styles.line} key={l.id} style={getLineStyle(l)}>
            <span className={styles.lineName}>{l.name}</span>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default React.memo(LinesModal);
