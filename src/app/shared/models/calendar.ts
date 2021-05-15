import { EventDay } from './event-day';
import { Month } from './month';

export interface Calendar{
    month: Month;
    events: Map<string, Array<EventDay>>;
}
