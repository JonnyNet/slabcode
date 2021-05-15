import { FormStyle, getLocaleDayNames, TranslationWidth } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CalendarStoreService } from 'src/app/core/services/calendar-store.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { DataModal } from 'src/app/shared/models/data-modal';
import { Day } from 'src/app/shared/models/day';
import { Month } from 'src/app/shared/models/month';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  month$!: Observable<Month>;
  dayNames = getLocaleDayNames(this.locale, FormStyle.Standalone, TranslationWidth.Wide);

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public readonly storaService: CalendarStoreService,
    private readonly modalService: ModalService) {
    this.month$ = this.storaService.month$;
    this.storaService.getCurrentMonth();
  }

  ngOnInit(): void {
    this.modalService.watch()
      .pipe(filter(res => res.data !== undefined && res.state === 'close'))
      .subscribe(status => {
        this.storaService.saveEvent(status.data as DataModal);
      });
  }

  clickDay(day: Day, month: Month): void {
    if (day.disabled) { return; }
    this.modalService.open({
      day: day.name,
      month: month.index,
      year: month.year,
    });
  }

  clickEventDay(event: any, month: Month): void {
    this.modalService.open({
      event: event.event,
      day: event.day.name,
      month: month.index,
      year: month.year,
    });
  }

  getNewMonth(year: number, month: number, action: number): void {
    const date = new Date(year, month);
    date.setMonth(date.getMonth() + action);
    this.storaService.getMonth(date.getMonth(), date.getFullYear());
  }
}
