import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() {}

  getCurrentPosition(): Observable<Position> {
    return new Observable<Position>(observer => {
      navigator.geolocation.getCurrentPosition(
        position => observer.next(position),
        err => observer.error(err)
      );
    });
  }
}
