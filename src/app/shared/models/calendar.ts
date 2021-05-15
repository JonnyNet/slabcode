import { EventDay } from './event-day';
import { EventMonth } from './event-month';
import { Month } from './month';

export interface Calendar{
    month: Month;
    events: Map<EventMonth, Array<EventDay>>;
}
