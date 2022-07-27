import type { AbstractConnectionProvider, ConnectionProvider, EthereumProviderConnectionResult } from "@rarible/connector";
import type { IWalletAndAddress } from "./wallet-connection";
export declare function mapEthereumWallet<O>(provider: AbstractConnectionProvider<O, EthereumProviderConnectionResult>): ConnectionProvider<O, IWalletAndAddress>;
