import { Observable } from "rxjs";
import type { ConnectionState, Maybe } from "@rarible/connector";
import { AbstractConnectionProvider } from "@rarible/connector";
import type { ISolanaProviderConnectionResult } from "@rarible/connector-helper";
import type { ConnectOpts, SolflareProvider } from "./domain";
export * from "./domain";
declare type ConnectStatus = "connected" | "disconnected";
declare const PROVIDER_ID: "solflare";
export declare class SolflareConnectionProvider extends AbstractConnectionProvider<typeof PROVIDER_ID, ISolanaProviderConnectionResult> {
    private readonly config?;
    private instance;
    private connection;
    constructor(config?: ConnectOpts | undefined);
    private init;
    private _connect;
    getConnectedStatus(provider: SolflareProvider): Observable<ConnectStatus>;
    getAddress(provider: SolflareProvider): Observable<string>;
    private toConnectState;
    getId(): string;
    getConnection(): Observable<ConnectionState<ISolanaProviderConnectionResult>>;
    getOption(): Promise<Maybe<typeof PROVIDER_ID>>;
    isAutoConnected(): Promise<boolean>;
    isConnected(): Promise<boolean>;
}
