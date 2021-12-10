import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import Modal from 'react-modal';
import customModalStyles from '../constants/customModalStyles';
import useCompass from '../hooks/useCompass';
import { Station } from '../models/StationAPI';
import styles from './DirectionModal.module.css';

type Props = {
  isOpen: boolean;
  onAfterOpen?: () => void;
  closeModal: () => void;
  station: Station;
};

const isJa = navigator.language.startsWith('ja');

const Needle: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1466.3 1468.3">
    <g>
      <path
        fill="white"
        d="M732.83,929.06l295.89,168.68c10.8,6.15,23.24-4.93,18.37-16.37L746.81,376.9a13.32,13.32,0,0,0-24.48,0L419.23,1080c-4.92,11.43,7.5,22.56,18.32,16.43Z"
      />
      <ellipse
        fill="none"
        stroke="white"
        strokeMiterlimit={10}
        strokeWidth="80"
        cx="733.15"
        cy="734.15"
        rx="693.15"
        ry="694.15"
      />
    </g>
  </svg>
);
//<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1386.3 1388.3"><defs><style>.cls-1{fill:none;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="_ÎÓÈ_1" data-name="—ÎÓÈ_1"><path class="cls-1" d="M692.83,889.06l295.89,168.68c10.8,6.15,23.24-4.93,18.37-16.37L706.81,336.9a13.32,13.32,0,0,0-24.48,0L379.23,1040c-4.92,11.43,7.5,22.56,18.32,16.43Z"/><ellipse class="cls-1" cx="693.15" cy="694.15" rx="693.15" ry="694.15"/></g></g></svg>

const Compass: React.FC<{ diff: number }> = ({ diff }: { diff: number }) => (
  <div
    style={{
      transform: `rotate(${diff}deg)`,
      width: '100%',
      height: '100%',
      transition: '1s',
    }}
  >
    <Needle />
  </div>
);

const DirectionModal: React.FC<Props> = ({
  isOpen,
  onAfterOpen,
  closeModal,
  station,
}: Props) => {
  const {
    currentHeading,
    stationHeading,
    distance,
    positionError,
  } = useCompass(station);
  console.log(currentHeading, stationHeading, distance, positionError);

  const headerTitle = isJa
    ? `${station.name}駅への方向`
    : `Direction to ${station.nameR} station`;

  const diff = useMemo(() => {
    if (!stationHeading || !currentHeading) {
      return 0;
    }
    return stationHeading - currentHeading;
  }, [currentHeading, stationHeading]);

  return (
    <Modal
      closeTimeoutMS={250}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
      contentLabel={headerTitle}
    >
      <header className={styles.header}>
        <span className={styles.headerTitle}>{headerTitle}</span>
        <FontAwesomeIcon
          onClick={closeModal}
          className={styles.closeIcon}
          icon={faTimes}
        />
      </header>
      <div className={styles.content}>
        <Compass diff={diff} />
        <div className={styles.distanceContainer}>
          <p className={styles.distanceValue}>{distance}</p>
          <p className={styles.distanceUnit}>m</p>
        </div>
        {process.env.NODE_ENV === 'development' ? (
          <div>
            <p>stationHeading: {stationHeading}</p>
            {currentHeading ? <p>currentHeading: {currentHeading}</p> : null}
            {diff ? <p>diff: {diff}</p> : null}
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default DirectionModal;
