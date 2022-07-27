import type { Observable } from "rxjs";
import type { IWalletConnectProviderOptions } from "@walletconnect/types";
import type { ConnectionState, EthereumProviderConnectionResult, Maybe } from "@rarible/connector";
import { AbstractConnectionProvider } from "@rarible/connector";
declare const PROVIDER_ID: "walletconnect";
export declare class WalletConnectConnectionProvider extends AbstractConnectionProvider<typeof PROVIDER_ID, EthereumProviderConnectionResult> {
    private readonly config;
    private readonly instance;
    private readonly connection;
    constructor(config: IWalletConnectProviderOptions);
    private _connect;
    getId(): string;
    getConnection(): Observable<ConnectionState<EthereumProviderConnectionResult>>;
    getOption(): Promise<Maybe<typeof PROVIDER_ID>>;
    isAutoConnected(): Promise<boolean>;
    isConnected(): Promise<boolean>;
}
export {};
