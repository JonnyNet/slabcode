import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface StateModal {
  state: 'open' | 'close';
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private display = new Subject<StateModal>();

  watch(): Observable<StateModal> {
    return this.display.asObservable();
  }

  open(data?: any): void {
    this.display.next({ state: 'open', data });
  }

  close(data?: any): void {
    this.display.next({ state: 'close', data });
  }
}
