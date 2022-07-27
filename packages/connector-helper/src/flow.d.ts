import type { AbstractConnectionProvider, ConnectionProvider } from "@rarible/connector";
import type { FlowProviderConnectionResult } from "@rarible/connector-fcl";
import type { IWalletAndAddress } from "./wallet-connection";
export declare function mapFlowWallet<O>(provider: AbstractConnectionProvider<O, FlowProviderConnectionResult>): ConnectionProvider<O, IWalletAndAddress>;
