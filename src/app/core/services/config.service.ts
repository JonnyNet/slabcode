import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config: any;

  constructor(private http: HttpClient) { }

  loadConfig(): Promise<any> {
    return this.http.get('assets/config/config.json').pipe(tap(res => this.config = res)).toPromise();
  }

  get allConfig(): any {
    return this.config;
  }
}
