import type { Observable } from "rxjs";
import type { ConnectionState, Maybe } from "@rarible/connector";
import { AbstractConnectionProvider } from "@rarible/connector";
import type { FlowProviderConnectionResult } from "./domain";
export declare type FclConfig = {
    accessNode: string;
    walletDiscovery: string;
    network: string;
    applicationTitle: string;
    applicationIcon: string;
};
declare const PROVIDER_ID: "fcl";
export declare class FclConnectionProvider extends AbstractConnectionProvider<typeof PROVIDER_ID, FlowProviderConnectionResult> {
    private readonly config;
    private readonly instance;
    private readonly connection;
    constructor(config: FclConfig);
    private toConnectState;
    getId(): string;
    getConnection(): Observable<ConnectionState<FlowProviderConnectionResult>>;
    private _connect;
    getOption(): Promise<Maybe<typeof PROVIDER_ID>>;
    isAutoConnected(): Promise<boolean>;
    isConnected(): Promise<boolean>;
}
export {};
