import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class WebSocketService {
  private subject: Subject<MessageEvent>;
  private ws: WebSocket;

  connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  disconnect() {
    if (this.subject) {
      this.ws.close();
    }
  }

  private create(url: string): Subject<MessageEvent> {
    this.ws = new WebSocket(url);

    const observable = Observable.create((obs: Observer <MessageEvent>) => {
      this.ws.onmessage = obs
        .next
        .bind(obs);
      this.ws.onerror = obs
        .error
        .bind(obs);
      this.ws.onclose = obs
        .complete
        .bind(obs);

      return this.ws
        .close
        .bind(this.ws);
    });

    const observer = {
      next: (data: Object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
