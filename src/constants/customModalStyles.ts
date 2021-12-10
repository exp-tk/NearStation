import Modal from 'react-modal';

const customModalStyles: Modal.Styles = {
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

export default customModalStyles;
