import { Injectable } from '@angular/core';
import { Calendar } from 'src/app/shared/models/calendar';
import { Store } from 'src/app/shared/store/store';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarStoreService extends Store<Calendar> {

  constructor(private calendarService: CalendarService) {
    super({
      month: [],
      currentMonth: -1
    });
  }

}
