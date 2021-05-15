import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarService } from './core/services/calendar.service';
import { ConfigService } from './core/services/config.service';


import('@angular/common/locales/' + environment.language + '.js').then(locale => {
  registerLocaleData(locale.default, environment.language);
});

export function loadConfig(service: ConfigService): any {
  return async () => {
      await service.loadConfig();
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    CalendarService,
    { provide: LOCALE_ID, useValue: environment.language },
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      multi: true,
      deps: [ConfigService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
