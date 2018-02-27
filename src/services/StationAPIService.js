import { Observable } from 'rx';
import config from '../config';
import store from '../store';

class StationAPIService {
  constructor() {
    this.endpoint = config.WSEndpoint;
    const socket = new WebSocket(this.endpoint);
    store.commit('setSocket', socket);
  }

  connect() {
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    return new Observable.create((observer) => {
      this.socket = store.getters.socket();
      this.socket.addEventListener('open', (event) => {
        store.commit('setConnected', true);
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
    this.connected = store.getters.connected();
    if (this.connected) {
      this.socket = store.getters.socket();
      this.socket.send(JSON.stringify(message));
    }
  }
}

export default StationAPIService;
