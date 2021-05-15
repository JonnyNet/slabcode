import { Calendar } from '../models/calendar';
import { EventDay } from '../models/event-day';
import { Month } from '../models/month';
import { Store } from './store';

class TestStore extends Store<Calendar>{
  constructor(){
    super({
      month: {} as Month,
      events: new Map<string, Array<EventDay>>()
    });
  }
}

describe('Store', () => {
  it('should create an instance', () => {
    expect(new TestStore()).toBeTruthy();
  });
});
