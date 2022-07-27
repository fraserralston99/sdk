import type { Observable } from "rxjs";
import type { BeaconWallet } from "@taquito/beacon-wallet";
import type { NetworkType as TezosNetwork } from "@airgap/beacon-sdk";
import type { ConnectionState, Maybe } from "@rarible/connector";
import { AbstractConnectionProvider } from "@rarible/connector";
import type { TezosProviderConnectionResult } from "./domain";
export declare type BeaconConfig = {
    appName: string;
    accessNode: string;
    network: TezosNetwork;
};
declare const PROVIDER_ID: "beacon";
export declare class BeaconConnectionProvider extends AbstractConnectionProvider<typeof PROVIDER_ID, TezosProviderConnectionResult<BeaconWallet>> {
    private readonly config;
    private readonly instance;
    private readonly connection;
    constructor(config: BeaconConfig);
    private toConnectState;
    private getAddress;
    getId(): string;
    getConnection(): Observable<ConnectionState<TezosProviderConnectionResult<BeaconWallet>>>;
    private _connect;
    getOption(): Promise<Maybe<typeof PROVIDER_ID>>;
    isAutoConnected(): Promise<boolean>;
    isConnected(): Promise<boolean>;
}
export {};
