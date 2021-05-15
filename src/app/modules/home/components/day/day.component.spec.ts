import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DAY_MOCK } from 'src/app/shared/mocks/day.mock';

import { DayComponent } from './day.component';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    component.day = DAY_MOCK;
    fixture.detectChanges();
  });

  it('should clickEvent', () => {
    const spyon = spyOn(component.clickEventDay, 'next');
    const message = fixture.debugElement.query(By.css('.message')).nativeElement;
    message.dispatchEvent(new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: 20,
    }));
    expect(spyon).toHaveBeenCalled();
  });
});
