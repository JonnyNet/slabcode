import { Injectable } from '@angular/core';
import { Day } from 'src/app/shared/models/day';
import { Month } from 'src/app/shared/models/month';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  getListDaysMonth(year: number, monthNumber: number): Month {
    const lastDayMonthPrev = new Date(year, monthNumber, 0).getDate();
    const firstDayMonth = new Date(year, monthNumber, 1);
    const lastDayMonth = new Date(year, monthNumber + 1, 0);

    const month: Month = {
      name: firstDayMonth.toLocaleString('default', { month: 'long' }),
      index: monthNumber,
      days: new Array<Day>(),
    };

    const prev = this.daysMonthPrev(firstDayMonth, lastDayMonthPrev);
    const days = this.daysMonth(lastDayMonth);
    const next = this.daysMonthNext(lastDayMonth);
    month.days = prev.concat(days).concat(next);
    return month;
  }

  private daysMonthPrev(firstDayMonth: Date, lastDayMonthPrev: number): Day[] {
    if (firstDayMonth.getDay() === 0) { return []; }
    let index = lastDayMonthPrev - firstDayMonth.getDay();
    const daysPrev = Array.from({ length: firstDayMonth.getDay() }, (v, i) => {
      return {
        name: ++index,
        disabled: true,
        events: []
      };
    });
    return daysPrev;
  }

  private daysMonth(lastDayMonth: Date): Day[] {
    console.log(lastDayMonth.getDate());
    return Array.from({ length: lastDayMonth.getDate() }, (v, i) => {
      return {
        name: ++i,
        disabled: false,
        events: []
      };
    });
  }

  private daysMonthNext(lastDayMonth: Date): Day[] {
    if (lastDayMonth.getDay() === 6) { return []; }
    const index = 6 - lastDayMonth.getDay();
    const daysPrev = Array.from({ length: index }, (v, i) => {
      return {
        name: ++i,
        disabled: true,
        events: []
      };
    });
    return daysPrev;
  }
}
