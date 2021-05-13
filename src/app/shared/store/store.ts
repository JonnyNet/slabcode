import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
    readonly state$!: Observable<T>;
    private stateObj$!: BehaviorSubject<T>;


    protected constructor(initialState: T) {
        this.stateObj$ = new BehaviorSubject(initialState);
        this.state$ = this.stateObj$.asObservable();
    }

    protected get state(): T {
        return this.stateObj$.getValue();
    }

    protected setState(nextState: T): void {
        this.stateObj$.next(nextState);
    }
}
