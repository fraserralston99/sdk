import { Observable } from "rxjs";
import type { ConnectionState, Maybe } from "@rarible/connector";
import { AbstractConnectionProvider } from "@rarible/connector";
import type { ISolanaProviderConnectionResult } from "@rarible/connector-helper";
import type { ConnectOpts, PhantomProvider } from "./domain";
export * from "./domain";
declare type ConnectStatus = "connected" | "disconnected";
declare const PROVIDER_ID: "phantom";
export declare class PhantomConnectionProvider extends AbstractConnectionProvider<typeof PROVIDER_ID, ISolanaProviderConnectionResult> {
    private readonly config?;
    private instance;
    private readonly connection;
    constructor(config?: ConnectOpts | undefined);
    private _connect;
    getConnectedStatus(provider: PhantomProvider): Observable<ConnectStatus>;
    getAddress(provider: PhantomProvider): Observable<string>;
    private toConnectState;
    getId(): string;
    getConnection(): Observable<ConnectionState<ISolanaProviderConnectionResult>>;
    getOption(): Promise<Maybe<typeof PROVIDER_ID>>;
    isAutoConnected(): Promise<boolean>;
    isConnected(): Promise<boolean>;
}
