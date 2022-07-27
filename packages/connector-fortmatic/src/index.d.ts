import type { Observable } from "rxjs";
import type { QueryParameters } from "fortmatic/dist/cjs/src/util/query-params";
import type { ConnectionState, EthereumProviderConnectionResult, Maybe } from "@rarible/connector";
import { AbstractConnectionProvider } from "@rarible/connector";
export declare type FortmaticConfig = {
    apiKey: string;
    ethNetwork?: QueryParameters["ETH_NETWORK"];
};
declare const PROVIDER_ID: "fortmatic";
export declare class FortmaticConnectionProvider extends AbstractConnectionProvider<typeof PROVIDER_ID, EthereumProviderConnectionResult> {
    private readonly config;
    private readonly instance;
    private readonly connection;
    constructor(config: FortmaticConfig);
    private _connect;
    getId(): string;
    getConnection(): Observable<ConnectionState<EthereumProviderConnectionResult>>;
    getOption(): Promise<Maybe<typeof PROVIDER_ID>>;
    isAutoConnected(): Promise<boolean>;
    isConnected(): Promise<boolean>;
}
export {};
