import { EventColor } from './event-color';

export interface EventDay {
    id: string;
    color: EventColor;
    city: string;
    message: string;
    date: Date;
}
