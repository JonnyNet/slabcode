import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DataModal } from 'src/app/shared/models/data-modal';
import { Day } from 'src/app/shared/models/day';
import { EventDay } from 'src/app/shared/models/event-day';
import { Month } from 'src/app/shared/models/month';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private today = new Date();

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  getListDaysMonth(year: number, monthNumber: number): Month {
    const lastDayMonthPrev = new Date(year, monthNumber, 0);
    const firstDayMonth = new Date(year, monthNumber, 1);
    const lastDayMonth = new Date(year, monthNumber + 1, 0);
    const firstDayMonthNext = new Date(year, monthNumber + 1, 1);

    const month: Month = {
      name: `${firstDayMonth.toLocaleString(this.locale, { month: 'long' })} ${year}`,
      index: monthNumber,
      year,
      days: new Array<Day>(),
      prev: (year === this.currentYear && monthNumber === this.currentMonth),
    };

    const prev = this.daysMonthPrev(firstDayMonth, lastDayMonthPrev);
    const days = this.arrayFrom(firstDayMonth, lastDayMonth.getDate(), false);
    const next = this.daysMonthNext(lastDayMonth, firstDayMonthNext);
    month.days = prev.concat(days).concat(next);
    return this.validCurrentMonth(month);
  }

  createEvent(data: DataModal): EventDay{
    return {
      ...data.event,
      id: uuidv4(),
    } as EventDay;
  }

  get currentMonth(): number {
    return this.today.getMonth();
  }

  get currentYear(): number {
    return this.today.getFullYear();
  }

  private validCurrentMonth(month: Month): Month {
    if (this.currentYear === month.year && this.currentMonth === month.index) {
      month.days = month.days.map(x => {
        if (x.name < this.today.getDate() && !x.disabled) {
          return {
            ...x,
            disabled: (x.name < this.today.getDate() && !x.disabled)
          };
        }
        return x;
      });
    }
    return month;
  }

  private daysMonthPrev(firstDayMonth: Date, lastDayMonthPrev: Date): Day[] {
    if (firstDayMonth.getDay() === 0) { return []; }
    const index = lastDayMonthPrev.getDate() - firstDayMonth.getDay();
    return this.arrayFrom(lastDayMonthPrev, firstDayMonth.getDay(), true, index);
  }

  private daysMonthNext(lastDayMonth: Date, firstDayMonthNext: Date): Day[] {
    if (lastDayMonth.getDay() === 6) { return []; }
    const index = 6 - lastDayMonth.getDay();
    return this.arrayFrom(firstDayMonthNext, index, true);
  }

  private arrayFrom(date: Date, length: number, disabled: boolean, day: number = 0): Day[] {
    const newDate = new Date(date);
    return Array.from({ length }, (v, i) => {
      let index = i + day;
      newDate.setDate(++index);
      return {
        name: index,
        disabled,
        dayOfWeek: newDate.getDay(),
        events: []
      };
    });
  }
}
