import type { AbstractConnectionProvider, ConnectionProvider } from "@rarible/connector";
import type { SolanaWalletProvider } from "@rarible/solana-wallet";
import type { IWalletAndAddress } from "./wallet-connection";
export interface ISolanaProviderConnectionResult extends SolanaWalletProvider {
    address: string;
}
export declare function mapSolanaWallet<O>(provider: AbstractConnectionProvider<O, ISolanaProviderConnectionResult>): ConnectionProvider<O, IWalletAndAddress>;
