import { Observable } from "rxjs";
export declare function getObservable<Raw, T>(provider: any, getRaw: (provider: any) => Promise<Raw>, mapRaw: (raw: Raw) => T, eventName: string): Observable<T>;
