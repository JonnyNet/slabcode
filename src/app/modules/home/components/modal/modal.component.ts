import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ConfigService } from 'src/app/core/services/config.service';
import { ModalService, StateModal } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  display$!: Observable<StateModal>;
  daysMonth!: number[];
  hourDay!: any[];
  subscription!: Subscription;
  form!: FormGroup;

  constructor(
    private modalService: ModalService,
    public configService: ConfigService,
    build: FormBuilder) {
    this.display$ = this.modalService.watch();
    const validator = Validators.required;
    this.form = build.group({
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
    this.subscription = this.display$.subscribe((state: StateModal) => {
      if (state.state === 'close') { return; }
      this.setDaysMonth(state.data as any);
    });
  }

  private setDaysMonth(data: any): void {
    const date = new Date(data.year, data.month + 1, 0);
    this.daysMonth = Array.from({ length: date.getDate() }, (v, i) => ++i);
    this.form.patchValue({ day: data.day.name });
  }

  close(): void {
    this.modalService.close();
  }

  save(data: any): void {
    if (!this.form.valid) { return; }
    this.modalService.close({
      form: this.form.value,
      target: data
    });
    this.form.reset();
  }
}
