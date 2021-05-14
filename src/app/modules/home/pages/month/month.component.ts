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
    private storaService: CalendarStoreService) {
    this.month$ = this.storaService.month$;
    this.storaService.getCurrentMonth();
  }

  clickDay(day: Day): void {
    console.log(day);
  }

}
