import { EventDay } from './event-day';

export interface EventMonth {
    year: number;
    month: number;
    events: Array<EventDay>;
}
