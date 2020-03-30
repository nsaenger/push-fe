import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: [ './root.component.scss' ],
})
export class RootComponent {

  public title: string;
  public body: string;

  public navigator = navigator;

  constructor(
    private swPush: SwPush,
    private http: HttpClient,
  ) {
  }

  setupPush() {
    const key = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';

    this.swPush.requestSubscription({ serverPublicKey: key }).then(sub => {
        this.http.post('http://localhost:30000/push/add', { subscription: sub }).subscribe();
      });
  }

  public sendNotifications() {
    this.http.post('http://localhost:30000/push/send', {
      notification: {
        title: this.title,
        body: this.body,
        icon: './assets/img/angular.png',
        data: 'additional data',
      },
    }).subscribe(console.log, console.error);
  }

  public isSubscribed(): boolean {
    return Notification.permission === 'granted';
  }

  public deletePush() {
    this.swPush.unsubscribe().then();
  }
}
