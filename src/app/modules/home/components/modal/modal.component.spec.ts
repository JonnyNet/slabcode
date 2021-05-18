import { registerLocaleData } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from 'src/app/core/services/config.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { OpenWeatherService } from 'src/app/core/services/open-weather.service';
import { CONFIG_MOCK } from 'src/app/shared/mocks/config.mock';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalComponent } from './modal.component';
import { DAY_MOCK } from 'src/app/shared/mocks/day.mock';

import('@angular/common/locales/' + environment.language + '.js').then(locale => {
  registerLocaleData(locale.default, environment.language);
});

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        ModalService,
        OpenWeatherService,
        {
          provide: ConfigService,
          useValue: {
            allConfig: CONFIG_MOCK
          },
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modalService = TestBed.inject(ModalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    modalService.close();
    modalService.open({
      delete: false,
      day: 1, month: 4, year: 2021
    });

    modalService.open({
      delete: false,
      day: 1, month: 4, year: 2021,
      event: DAY_MOCK.events[0],
    });

    const spyon = spyOn(modalService, 'close');
    component.delete();
    expect(spyon).toHaveBeenCalled();
  });

  it('should close modal', () => {
    const spyon = spyOn(modalService, 'close');
    component.close();
    expect(spyon).toHaveBeenCalled();
  });

  it('should save event', () => {
    const spyon = spyOn(modalService, 'close');
    modalService.open({
      delete: false,
      day: 1, month: 4, year: 2021
    });
    const form = component.form.controls;
    form.hour.setValue('23:00');
    form.city.setValue('3674962');
    form.message.setValue('message');
    component.save();
    form.color.setValue({
      color: '#004085',
      backgroundColor: '#cce5ff',
      borderColor: '#b8daff'
    });
    component.save();
    expect(spyon).toHaveBeenCalled();
  });
});
