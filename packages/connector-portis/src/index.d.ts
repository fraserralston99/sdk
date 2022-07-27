import type { Observable } from "rxjs";
import type { INetwork, IOptions } from "@portis/web3";
import type { ConnectionState, EthereumProviderConnectionResult, Maybe } from "@rarible/connector";
import { AbstractConnectionProvider } from "@rarible/connector";
declare type PortisNetwork = string | INetwork;
export declare type PortisConfig = {
    appId: string;
    network: PortisNetwork;
} & IOptions;
declare const PROVIDER_ID: "portis";
export declare class PortisConnectionProvider extends AbstractConnectionProvider<typeof PROVIDER_ID, EthereumProviderConnectionResult> {
    private readonly config;
    private readonly instance;
    private readonly connection;
    constructor(config: PortisConfig);
    private _connect;
    getId(): string;
    getConnection(): Observable<ConnectionState<EthereumProviderConnectionResult>>;
    getOption(): Promise<Maybe<typeof PROVIDER_ID>>;
    isAutoConnected(): Promise<boolean>;
    isConnected(): Promise<boolean>;
}
export {};
