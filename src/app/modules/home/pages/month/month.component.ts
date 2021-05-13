import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarStoreService } from 'src/app/core/services/calendar-store.service';
import { CalendarService } from 'src/app/core/services/calendar.service';
import { Calendar } from 'src/app/shared/models/calendar';
import { Month } from 'src/app/shared/models/month';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  month$!: Observable<Month>;

  constructor(
    public readonly calendarService: CalendarService,
    private storaService: CalendarStoreService) {
    this.month$ = this.storaService.month$;
    this.storaService.getCurrentMonth();
  }

  ngOnInit(): void {
    this.month$.subscribe(res => {
      console.log(res);
    });
  }

}
