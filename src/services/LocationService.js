import { Observable } from 'rx';

class LocationService {
  subscribeLocation() {
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    return new Observable.create((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((p) => {
          this.position = {
            lat: p.coords.latitude,
            lon: p.coords.longitude,
          };
          observer.onNext(this.position);
        }, () => {
          // observer.onError(error);
        }, {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0,
        });
      }
    });
  }
}

export default LocationService;
