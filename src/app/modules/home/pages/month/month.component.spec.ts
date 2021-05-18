import { registerLocaleData } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CalendarStoreService } from 'src/app/core/services/calendar-store.service';
import { CalendarService } from 'src/app/core/services/calendar.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { CONFIG_MOCK } from 'src/app/shared/mocks/config.mock';
import { environment } from 'src/environments/environment';
import { DayComponent } from '../../components/day/day.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { MonthComponent } from './month.component';

import('@angular/common/locales/' + environment.language + '.js').then(locale => {
  registerLocaleData(locale.default, environment.language);
});

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;
  let calendarStoreService: CalendarStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthComponent, ModalComponent, DayComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: LOCALE_ID, useValue: environment.language },
        CalendarService,
        CalendarStoreService,
        {
          provide: ConfigService,
          useValue: {
            allConfig: CONFIG_MOCK,
          },
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    calendarStoreService = TestBed.inject(CalendarStoreService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should next month', () => {
    const spyon = spyOn(calendarStoreService, 'getMonth');
    component.getNewMonth(2021, 4, 1);
    expect(spyon).toHaveBeenCalledWith(5, 2021);
  });

  it('should create event', () => {
    const dom: DebugElement = fixture.debugElement;
    const day1 = dom.query(By.css('#day25-0>.day')).nativeElement;
    day1.dispatchEvent(new MouseEvent('click'));

    setEventMonth(fixture, component, dom, '#day2-5>.day', 'test message day', 3);
  });
});

function setEventMonth(
  fixture: ComponentFixture<MonthComponent>,
  component: MonthComponent, dom: DebugElement,
  selector: string, textEvent: string, hourOption: number): void {

  component.getNewMonth(2025, 3, 1);
  fixture.detectChanges();
  const day2 = dom.query(By.css(selector));
  day2.nativeElement.dispatchEvent(new MouseEvent('click'));
  fixture.detectChanges();

  const form = dom.query(By.css('app-modal form'));

  // select hour
  const hour: HTMLSelectElement = form.query(By.css('select[name="hour"]')).nativeElement;
  hour.value = hour.options[hourOption].value;
  hour.dispatchEvent(new Event('change'));
  fixture.detectChanges();

  const city: HTMLSelectElement = form.query(By.css('select[name="city"]')).nativeElement;
  city.value = city.options[1].value;
  city.dispatchEvent(new Event('change'));
  fixture.detectChanges();

  const message: HTMLTextAreaElement = form.query(By.css('textarea[name="message"]')).nativeElement;
  message.value = textEvent;
  message.dispatchEvent(new Event('input'));
  fixture.detectChanges();

  const color: HTMLDivElement = form.query(By.css('.color')).nativeElement;
  color.dispatchEvent(new MouseEvent('click'));
  fixture.detectChanges();

  const button: HTMLButtonElement = form.query(By.css('button')).nativeElement;
  expect(button.disabled).toBeFalsy();
  button.dispatchEvent(new MouseEvent('click'));
  fixture.detectChanges();


  const event: HTMLDivElement = day2.query(By.css('.message')).nativeElement;
  expect(event.textContent?.trim()).toEqual(textEvent);

  event.dispatchEvent(new MouseEvent('click'));
  fixture.detectChanges();

  button.dispatchEvent(new MouseEvent('click'));
  fixture.detectChanges();
}
