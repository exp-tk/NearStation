import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './modal.css';
import Modal from 'react-modal';
import App from './components/App';

Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
