import { Observable } from 'rx';
import config from '../config';

class StationAPIService {
  constructor() {
    this.endpoint = config.WSEndpoint;
    this.socket = new WebSocket(this.endpoint);
  }

  connect() {
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    return new Observable.create((observer) => {
      this.socket.addEventListener('open', (event) => {
        this.opened = true;
        observer.onNext(event);
        this.socket.send({});
      });
      this.socket.addEventListener('error', (event) => {
        observer.onError(event);
      });
      this.socket.addEventListener('message', (event) => {
        observer.onNext(event);
      });
      this.socket.addEventListener('close', () => {
        observer.onCompleted();
      });
    });
  }

  send(message) {
    if (this.opened) {
      this.socket.send(JSON.stringify(message));
    }
  }
}

export default StationAPIService;
