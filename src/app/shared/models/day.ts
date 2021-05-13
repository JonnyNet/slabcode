import { EventDay } from './event-day';

export interface Day {
    name: number;
    disabled: boolean;
    events: Array<EventDay>;
}
