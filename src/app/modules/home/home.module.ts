import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { HeaderDayComponent } from './components/header-day/header-day.component';
import { DayComponent } from './components/day/day.component';
import { MonthComponent } from './components/month/month.component';


@NgModule({
  declarations: [
    CalendarComponent,
    HeaderDayComponent,
    DayComponent,
    MonthComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
