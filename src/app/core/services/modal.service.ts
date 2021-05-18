import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataModal } from 'src/app/shared/models/data-modal';

export interface StateModal {
  state: 'open' | 'close' ;
  data?: DataModal;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private display = new Subject<StateModal>();

  watch(): Observable<StateModal> {
    return this.display.asObservable();
  }

  open(data?: DataModal): void {
    this.display.next({ state: 'open', data });
  }

  close(data?: DataModal): void {
    this.display.next({ state: 'close', data });
  }
}
