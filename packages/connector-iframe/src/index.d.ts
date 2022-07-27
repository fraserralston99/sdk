import type { Observable } from "rxjs";
import type { Maybe, ConnectionState, EthereumProviderConnectionResult } from "@rarible/connector";
import { AbstractConnectionProvider } from "@rarible/connector";
declare const PROVIDER_ID: "iframe";
export declare class IframeConnectionProvider extends AbstractConnectionProvider<typeof PROVIDER_ID, EthereumProviderConnectionResult> {
    private readonly instance;
    private readonly connection;
    constructor();
    getId(): string;
    getConnection(): Observable<ConnectionState<EthereumProviderConnectionResult>>;
    getOption(): Promise<Maybe<typeof PROVIDER_ID>>;
    isAutoConnected(): Promise<boolean>;
    isConnected(): Promise<boolean>;
}
export {};
