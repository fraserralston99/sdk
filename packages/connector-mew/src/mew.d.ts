import type { Observable } from "rxjs";
import type { ConnectionState, EthereumProviderConnectionResult, Maybe } from "@rarible/connector";
import { AbstractConnectionProvider } from "@rarible/connector";
export declare type MEWConfig = {
    rpcUrl: string;
    networkId: number;
};
declare const PROVIDER_ID: "mew";
export declare class MEWConnectionProvider extends AbstractConnectionProvider<typeof PROVIDER_ID, EthereumProviderConnectionResult> {
    private readonly config;
    private readonly instance;
    private readonly connection;
    constructor(config: MEWConfig);
    private _connect;
    getId(): string;
    getConnection(): Observable<ConnectionState<EthereumProviderConnectionResult>>;
    getOption(): Promise<Maybe<typeof PROVIDER_ID>>;
    isAutoConnected(): Promise<boolean>;
    isConnected(): Promise<boolean>;
}
export {};
