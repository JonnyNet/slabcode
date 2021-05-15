import { EventDay } from './event-day';

export interface DataModal {
    year: number;
    month: number;
    day: number;
    delete: boolean;
    event?: EventDay;
}
