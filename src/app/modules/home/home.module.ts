import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DayComponent } from './components/day/day.component';
import { HomeRoutingModule } from './home-routing.module';
import { MonthComponent } from './pages/month/month.component';



@NgModule({
  declarations: [
    DayComponent,
    MonthComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
