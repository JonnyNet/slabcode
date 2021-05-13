import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  @Input()
  title!: string;

  @Output()
  next = new EventEmitter();

  @Output()
  back = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
