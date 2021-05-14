import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarStoreService } from 'src/app/core/services/calendar-store.service';
import { CalendarService } from 'src/app/core/services/calendar.service';
import { Day } from 'src/app/shared/models/day';
import { Month } from 'src/app/shared/models/month';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent {

  month$!: Observable<Month>;

  constructor(
    public readonly calendarService: CalendarService,
    public readonly storaService: CalendarStoreService) {
    this.month$ = this.storaService.month$;
    this.storaService.getCurrentMonth();
  }

  clickDay(day: Day): void {
    if (day.disabled) { return; }
    console.log(day);
  }

  getNewMonth(year: number, month: number, action: number): void {
    const date = new Date(year, month);
    date.setMonth(date.getMonth() + action);
    this.storaService.getMonth(date.getMonth(), date.getFullYear());
  }
}
