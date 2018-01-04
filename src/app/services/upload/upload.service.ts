import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { secret } from '../../../secret.config';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadImageToImgur(blob: Blob): Observable<string> {
   const fd = new FormData();
    fd.append('image', blob);
    const cid = secret.imgurCID;
    const headers = new HttpHeaders()
      .set('authorization', 'Client-ID ' + cid);
      return new Observable((obs: Observer<string>) => {
        this.http.post('https://api.imgur.com/3/upload', fd, {headers: headers})
        .subscribe(resp => {
          obs.next('https://imgur.com/' + resp['data']['id']);
        }, (err: HttpErrorResponse) => {
          obs.error(err);
        });
      });
  }

}
