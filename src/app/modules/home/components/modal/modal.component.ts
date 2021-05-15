import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, concatMap, switchMap, tap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { ModalService, StateModal } from 'src/app/core/services/modal.service';
import { OpenWeatherService } from 'src/app/core/services/open-weather.service';
import { DataModal } from 'src/app/shared/models/data-modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  display$!: Observable<StateModal>;
  forecast$!: Observable<any>;
  daysMonth!: number[];
  hourDay!: any[];
  subscription!: Subscription;
  form!: FormGroup;
  data!: DataModal;

  constructor(
    private modalService: ModalService,
    public configService: ConfigService,
    private openWeatherService: OpenWeatherService,
    build: FormBuilder) {
    this.display$ = this.modalService.watch();
    const validator = Validators.required;
    this.form = build.group({
      id: [''],
      day: ['', validator],
      hour: ['', validator],
      city: ['', validator],
      message: ['', [validator, Validators.maxLength(30)]],
      color: ['', validator],
    });

    this.hourDay = Array.from({ length: 24 }, (v, i) => {
      return {
        value: i,
        label: `${i}:00`,
      };
    });
  }

  ngOnInit(): void {
    this.form.controls.city.valueChanges.subscribe(e => console.log(e));

    // this.forecast$.subscribe(res => console.log(res));

    this.subscription = this.display$.subscribe((state: StateModal) => {
      if (state.state === 'close') { return; }
      this.data = state.data as DataModal;
      this.setDaysMonth(this.data);
    });
  }

  private setDaysMonth(data: DataModal): void {
    const date = new Date(data.year, data.month + 1, 0);
    this.daysMonth = Array.from({ length: date.getDate() }, (v, i) => ++i);
    this.form.patchValue({ day: data.day });

    if (!data.event) { return; }
    this.form.patchValue({
      ...data.event,
      hour: data.event.date.getHours().toString(),
    });
  }

  close(): void {
    this.modalService.close();
  }

  save(): void {
    if (!this.form.valid) { return; }

    this.modalService.close({
      ...this.data,
      event: {
        ...this.form.value,
        date: new Date(this.data.year, this.data.month, this.data.day, Number(this.form.value.hour))
      },
    });
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
