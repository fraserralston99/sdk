import type WalletConnectProvider from "@walletconnect/web3-provider";
import { Observable } from "rxjs";
declare type ConnectStatus = "connected" | "disconnected";
export declare function getConnectedStatus(provider: WalletConnectProvider): Observable<ConnectStatus>;
export {};
