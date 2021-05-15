import { EventDay } from './event-day';

export interface DataModal {
    year: number;
    month: number;
    day: number;
    event?: EventDay;
}
