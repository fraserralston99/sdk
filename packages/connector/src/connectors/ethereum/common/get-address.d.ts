import type { Observable } from "rxjs";
export declare function getAddress(provider: any): Observable<string | undefined>;
export declare function ethAccounts(provider: any): Promise<string[]>;
