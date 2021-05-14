import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Calendar } from 'src/app/shared/models/calendar';
import { Store } from 'src/app/shared/store/store';
import { CalendarService } from './calendar.service';


@Injectable({
  providedIn: 'root'
})
export class CalendarStoreService extends Store<Calendar> {

  private today = new Date();
  readonly month$ = this.state$.pipe(map(x => x.month.filter(i => i.index === x.currentMonth)[0]));

  constructor(private calendarService: CalendarService) {
    super({
      month: [],
      currentMonth: -1
    });
  }

  getCurrentMonth(): void {
    const month = this.calendarService.getListDaysMonth(this.today.getFullYear(), this.today.getMonth());
    month.days = month.days.map(x => {
      if (x.name < this.today.getDate() && !x.disabled) {
        return {
          ...x,
          disabled: (x.name < this.today.getDate() && !x.disabled)
        };
      }
      return x;
    });
    this.state.month.push(month);
    this.setState({
      ...this.state,
      currentMonth: this.today.getMonth(),
    });
  }

}
