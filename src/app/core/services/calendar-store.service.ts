import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Calendar } from 'src/app/shared/models/calendar';
import { DataModal } from 'src/app/shared/models/data-modal';
import { Day } from 'src/app/shared/models/day';
import { EventDay } from 'src/app/shared/models/event-day';
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
      events: new Map<string, Array<EventDay>>()
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

  saveEvent(data: DataModal): void {
    if (!data.event?.id) { return this.createEvent(data); }
    this.updateEvent(data);
  }

  private createEvent(data: DataModal): void {
    const event = this.calendarService.createEvent(data);
    const item = this.findDayByMonth(data.day);
    item.events.push(event);
    this.sortAndSetState(item, data);
  }

  private updateEvent(data: DataModal): void {
    const item = this.findDayByMonth(data.day);
    const index = item.events.findIndex(x => x.id === data.event?.id);
    item.events[index] = data.event as EventDay;
    this.sortAndSetState(item, data);
  }

  private findDayByMonth(day: number): Day {
    const index = this.state.month.days.findIndex(x => x.name === day);
    return this.state.month.days[index];
  }

  private sortAndSetState(item: Day, data: DataModal): void {
    item.events.sort((a: EventDay, b: EventDay) => a.date.getTime() - b.date.getTime());
    this.state.events.set(`${data.year}${data.month}${data.day}`, item.events);
    this.setState({
      ...this.state
    });
  }

  private searchEventByMonth(month: Month): Month {
    const events = this.state.events;
    month.days.forEach(x => {
      const key = `${month.year}${month.index}${x.name}`;
      x.events = events.get(key) || [];
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
