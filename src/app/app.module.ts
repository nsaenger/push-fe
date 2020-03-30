import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './components/root/root.component';

@NgModule({
  declarations: [
    RootComponent,
  ],
  imports: [
    ServiceWorkerModule.register('sw.js', { enabled: environment.production }),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [ RootComponent ],
})
export class AppModule {
}
