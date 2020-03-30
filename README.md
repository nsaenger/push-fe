## Push Frontend

#### Wichtige Dateien

##### sw.js
```javascript
// Needed to let browsers know about new service-worker
const VERSION = '1.0.20';

self.addEventListener('push', function(event) {
  const data = JSON.parse(event.data.text()).notification;
  event.waitUntil(self.registration.showNotification(data.title, data));
});
```

##### root.component.ts
```javascript
// Show push request dialog and send subscription to backend
setupPush() {
    const key = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';

    this.swPush.requestSubscription({ serverPublicKey: key }).then(sub => {
        this.http.post('http://localhost:30000/push/add', { subscription: sub }).subscribe();
      });
  }

// Trigger a notification from front end
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
```
  
