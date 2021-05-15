import { TestBed } from '@angular/core/testing';

import { CalendarStoreService } from './calendar-store.service';

describe('CalendarStoreService', () => {
  let service: CalendarStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should created event', () => {
    service.getMonth(7, 2021);
    service.getMonth(4, 2025);
    service.saveEvent({
      day: 2,
      month: 4,
      year: 2025,
      delete: false,
      event: {
        id: undefined as any,
        city: '12345',
        color: {
          backgroundColor: ' backgroundColor',
          borderColor: 'borderColor',
          color: 'color'
        },
        message: 'message',
        date: new Date()
      }
    });

    service.saveEvent({
      day: 2,
      month: 4,
      year: 2025,
      delete: false,
      event: {
        id: undefined as any,
        city: '12345',
        color: {
          backgroundColor: ' backgroundColor',
          borderColor: 'borderColor',
          color: 'color'
        },
        message: 'message2',
        date: new Date()
      }
    });

    service.saveEvent({
      day: 2,
      month: 4,
      year: 2025,
      delete: true,
      event: {
        id: undefined as any,
        city: '12345',
        color: {
          backgroundColor: ' backgroundColor',
          borderColor: 'borderColor',
          color: 'color'
        },
        message: 'message2',
        date: new Date()
      }
    });

    service.month$.subscribe(res => {
      expect(res).toBeTruthy();
    });

  });
});
