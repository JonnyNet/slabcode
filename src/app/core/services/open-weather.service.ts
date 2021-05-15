import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  forecast(city: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        q: city,
        cnt: '1',
        mode: 'json',
        lang: 'es',
        appid: this.config.allConfig.openWeatherMap.key,
      }
    });
    return this.http.get(this.config.allConfig.openWeatherMap.url, { params });
  }
}
