import type { Observable } from "rxjs";
import type { EthereumProviderConnectionResult } from "../domain";
import type { ConnectionState } from "../../../connection-state";
export declare function connectToWeb3(provider: any, options?: {
    disconnect?: () => Promise<void>;
}): Observable<ConnectionState<EthereumProviderConnectionResult>>;
