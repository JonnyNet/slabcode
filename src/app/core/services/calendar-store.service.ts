import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Calendar } from 'src/app/shared/models/calendar';
import { Month } from 'src/app/shared/models/month';
import { Store } from 'src/app/shared/store/store';
import { CalendarService } from './calendar.service';


@Injectable({
  providedIn: 'root'
})
export class CalendarStoreService extends Store<Calendar> {

  readonly month$ = this.state$.pipe(map(x => x.month));

  constructor(private calendarService: CalendarService) {
    super({
      month: {} as Month,
      events: []
    });
  }

  getCurrentMonth(): void {
    const year = this.calendarService.currentYear;
    const month = this.calendarService.currentMonth;
    const item = this.calendarService.getListDaysMonth(year, month);
    this.setMonthState(item);
  }

  getMonth(index: number, year: number): void {
    const month = this.calendarService.getListDaysMonth(year, index);
    this.setMonthState(month);
  }

  private setMonthState(month: Month): void {
    this.setState({
      ...this.state,
      month,
    });
  }

}
