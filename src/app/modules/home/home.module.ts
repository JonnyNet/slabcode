import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DayComponent } from './components/day/day.component';
import { HomeRoutingModule } from './home-routing.module';
import { MonthComponent } from './pages/month/month.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DayComponent,
    MonthComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
