import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalendarService } from 'src/app/core/services/calendar.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {


  title = '';

  @Output()
  next = new EventEmitter();

  @Output()
  back = new EventEmitter();

  constructor(public readonly calendarService: CalendarService) { }

  ngOnInit(): void {
  }

}
