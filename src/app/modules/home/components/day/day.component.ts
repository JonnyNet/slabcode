import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from 'src/app/shared/models/day';
import { EventDay } from 'src/app/shared/models/event-day';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {

  @Input()
  day!: Day;

  @Output()
  clickDay = new EventEmitter();

  @Output()
  clickEventDay = new EventEmitter();

  clickEvent(e: MouseEvent, event: EventDay): void {
    e.stopPropagation();
    this.clickEventDay.next({
      event,
      day: this.day
    });
  }

}
