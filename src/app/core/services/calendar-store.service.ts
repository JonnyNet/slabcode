import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Calendar } from 'src/app/shared/models/calendar';
import { EventDay } from 'src/app/shared/models/event-day';
import { EventMonth } from 'src/app/shared/models/event-month';
import { Month } from 'src/app/shared/models/month';
import { Store } from 'src/app/shared/store/store';
import { CalendarService } from './calendar.service';


@Injectable({
  providedIn: 'root'
})
export class CalendarStoreService extends Store<Calendar> {

  readonly month$ = this.state$.pipe(map(x => x.month));

  constructor(
    private calendarService: CalendarService) {
    super({
      month: {} as Month,
      events: new Map<EventMonth, Array<EventDay>>()
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

  saveEvent(data: any): void {
    const event = this.calendarService.createEvent(data);
    const index = this.state.month.days.findIndex(x => x.name === data.target.day.name);
    const item = this.state.month.days[index];
    item.events.push(event);
    item.events.sort((a: EventDay, b: EventDay) => a.date.getTime() - b.date.getTime());
    this.state.events.set({
      year: data.year,
      month: data.month,
      day: data.target.day.index,
    }, item.events);
    this.setState({
      ...this.state
    });
  }

  private searchEventByMonth(month: Month): Month {
    const events = this.state.events;
    month.days.map(x => {
      const key = {
        year: month.year,
        month: month.index,
        day: x.name,
      };
      return {
        ...x,
        events: events.get(key) || [],
      };
    });
    return month;
  }

  private setMonthState(month: Month): void {
    month = this.searchEventByMonth(month);
    this.setState({
      ...this.state,
      month,
    });
  }
}
