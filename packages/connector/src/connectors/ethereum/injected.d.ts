import type { Observable } from "rxjs";
import { AbstractConnectionProvider } from "../../provider";
import type { Maybe } from "../../common/utils";
import type { ConnectionState } from "../../connection-state";
import type { EthereumProviderConnectionResult } from "./domain";
export declare enum DappType {
    Metamask = "Metamask",
    Trust = "Trust",
    GoWallet = "GoWallet",
    AlphaWallet = "AlphaWallet",
    Status = "Status",
    Coinbase = "Coinbase",
    Cipher = "Cipher",
    Mist = "Mist",
    Parity = "Parity",
    ImToken = "ImToken",
    Dapper = "Dapper",
    Mock = "Mock",
    Generic = "Web3",
    LedgerConnect = "LedgerConnect"
}
export declare class InjectedWeb3ConnectionProvider extends AbstractConnectionProvider<DappType, EthereumProviderConnectionResult> {
    private readonly connection;
    constructor();
    getId(): string;
    getConnection(): Observable<ConnectionState<EthereumProviderConnectionResult>>;
    getOption(): Promise<Maybe<DappType>>;
    isAutoConnected(): Promise<boolean>;
    isConnected(): Promise<boolean>;
}
