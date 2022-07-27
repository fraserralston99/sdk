import type { Observable } from "rxjs";
import type { WalletLinkOptions } from "walletlink/dist/WalletLink";
import type { ConnectionState, EthereumProviderConnectionResult, Maybe } from "@rarible/connector";
import { AbstractConnectionProvider } from "@rarible/connector";
export declare type WalletLinkConfig = {
    url: string;
    networkId: number;
    estimationUrl: string;
};
declare const PROVIDER_ID: "walletlink";
export declare class WalletLinkConnectionProvider extends AbstractConnectionProvider<typeof PROVIDER_ID, EthereumProviderConnectionResult> {
    private readonly config;
    private readonly walletLinkOptions;
    private readonly instance;
    private readonly connection;
    constructor(config: WalletLinkConfig, walletLinkOptions: WalletLinkOptions);
    private _connect;
    getId(): string;
    getConnection(): Observable<ConnectionState<EthereumProviderConnectionResult>>;
    getOption(): Promise<Maybe<typeof PROVIDER_ID>>;
    isAutoConnected(): Promise<boolean>;
    isConnected(): Promise<boolean>;
}
export {};
