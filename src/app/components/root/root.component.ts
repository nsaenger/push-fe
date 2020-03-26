import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: [ './root.component.scss' ],
})
export class RootComponent implements OnInit, OnDestroy {

  public title: string;
  public body: string;

  public navigator = navigator;
  public subscription: Subscription = new Subscription();

  constructor(
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private swPush: SwPush,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.setupUpdates();
    setInterval(() => this.swUpdate.checkForUpdate(), 30 * 1000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setupUpdates() {
    this.subscription.add(this.swUpdate.available.subscribe(u => {
      this.swUpdate.activateUpdate().then(e => {
        const message = 'Application has been updated';
        const action = 'Ok, Reload!';

        this.snackBar.open(message, action, {
          verticalPosition: 'top',
        }).onAction().subscribe(
          () => location.reload(),
        );
      });
    }));
  }

  setupPush() {
    const key = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';
console.log('requesting');
    this.swPush.requestSubscription({ serverPublicKey: key }).then(sub => {
        console.log('requesting done');
        this.http.post('http://localhost:30000/push/add', { subscription: sub })
          .subscribe(console.log, console.error);
      },
      err => {
        console.error('error registering for push', err);
      },
    );
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
