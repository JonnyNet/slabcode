import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDayComponent } from './header-day.component';

describe('HeaderDayComponent', () => {
  let component: HeaderDayComponent;
  let fixture: ComponentFixture<HeaderDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
