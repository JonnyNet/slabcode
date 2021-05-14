import { FormStyle, getLocaleDayNames, TranslationWidth } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Day } from 'src/app/shared/models/day';
import { Month } from 'src/app/shared/models/month';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  readonly dayNames = getLocaleDayNames(this.locale, FormStyle.Standalone, TranslationWidth.Wide);

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  getListDaysMonth(year: number, monthNumber: number): Month {
    const lastDayMonthPrev = new Date(year, monthNumber, 0);
    const firstDayMonth = new Date(year, monthNumber, 1);
    const lastDayMonth = new Date(year, monthNumber + 1, 0);
    const firstDayMonthNext = new Date(year, monthNumber + 1, 1);

    const month: Month = {
      name: firstDayMonth.toLocaleString(this.locale, { month: 'long' }),
      index: monthNumber,
      days: new Array<Day>(),
    };

    const prev = this.daysMonthPrev(firstDayMonth, lastDayMonthPrev);
    const days = this.arrayFrom(firstDayMonth, lastDayMonth.getDate(), false);
    const next = this.daysMonthNext(lastDayMonth, firstDayMonthNext);
    month.days = prev.concat(days).concat(next);
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
