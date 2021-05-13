import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarService } from './core/services/calendar.service';


import('@angular/common/locales/' + environment.language + '.js').then(locale => {
  registerLocaleData(locale.default, environment.language);
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CalendarService,
    { provide: LOCALE_ID, useValue: environment.language },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
