import { Day } from './day';

export interface Month{
    name: string;
    index: number;
    year: number;
    days: Array<Day>;
    prev: boolean;
}
