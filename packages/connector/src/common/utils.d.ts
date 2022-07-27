import { Observable } from "rxjs";
export declare type Maybe<T> = T | undefined;
export declare function cache<T>(fn: () => Promise<T>): Observable<T>;
export declare function promiseToObservable<T>(promise: Promise<Observable<T>>): Observable<T>;
export declare function noop(): void;
