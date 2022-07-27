import type { AbstractConnectionProvider, ConnectionProvider } from "@rarible/connector";
import type { TezosProviderConnectionResult } from "@rarible/connector-beacon";
import type { IWalletAndAddress } from "./wallet-connection";
export declare function mapTezosWallet<O>(provider: AbstractConnectionProvider<O, TezosProviderConnectionResult>): ConnectionProvider<O, IWalletAndAddress>;
