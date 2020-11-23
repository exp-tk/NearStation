import { Button, Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Router from '../Router';
import * as serviceWorker from '../serviceWorker';

const isJa = navigator.language.startsWith('ja');

const App: React.FC = () => {
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );

  const onSWUpdate = (registration: ServiceWorkerRegistration): void => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = (): void => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload(true);
  };

  return (
    <>
      <Snackbar
        open={showReload}
        message={
          isJa
            ? '新しいバージョンがリリースされました🚀'
            : 'New version released 🚀'
        }
        onClick={reloadPage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          <Button color="inherit" size="small" onClick={reloadPage}>
            {isJa ? 'リロード' : 'Reload'}
          </Button>
        }
      />
      <Router />
    </>
  );
};

export default App;
