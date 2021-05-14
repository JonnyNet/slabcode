import { EventMonth } from './event-month';
import { Month } from './month';

export interface Calendar{
    month: Month;
    events: Array<EventMonth>;
}
