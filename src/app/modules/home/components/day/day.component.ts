import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from 'src/app/shared/models/day';

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

}
