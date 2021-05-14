import { EventDay } from './event-day';

export interface Day {
    name: number;
    disabled: boolean;
    dayOfWeek: number;
    events: Array<EventDay>;
}
