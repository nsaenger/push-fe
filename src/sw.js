const VERSION = '1.0.20';

self.addEventListener('push', function(event) {
  const data = JSON.parse(event.data.text()).notification;
  event.waitUntil(self.registration.showNotification(data.title, data));
});
