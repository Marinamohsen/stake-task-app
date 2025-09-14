import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      scrollAssist: false,
      scrollPadding: false,
    }),
    AppRoutingModule,
    IonIcon,
    HttpClientModule,
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: LOCALE_ID, useValue: 'de-DE' }

  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    addIcons({ logoIonic });
  }
}
