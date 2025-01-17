import type { Ethereum } from "@rarible/ethereum-provider";
import type { Fcl } from "@rarible/fcl-types";
import { BlockchainGroup } from "@rarible/api-client";
import type { TezosProvider } from "@rarible/tezos-sdk";
import type { SolanaWalletProvider } from "@rarible/solana-wallet";
import type { AuthWithPrivateKey } from "@rarible/flow-sdk/build/types";
import type { AbstractWallet, UserSignature } from "./domain";
export declare class EthereumWallet<T extends Ethereum = Ethereum> implements AbstractWallet {
    readonly ethereum: T;
    readonly blockchain = BlockchainGroup.ETHEREUM;
    constructor(ethereum: T);
    signPersonalMessage(message: string): Promise<UserSignature>;
}
export declare class FlowWallet implements AbstractWallet {
    readonly fcl: Fcl;
    auth?: AuthWithPrivateKey;
    readonly blockchain = BlockchainGroup.FLOW;
    constructor(fcl: Fcl, auth?: AuthWithPrivateKey);
    getAuth(): AuthWithPrivateKey;
    signPersonalMessage(message: string): Promise<UserSignature>;
}
export interface TezosSignatureResult {
    signature: string;
    edpk: string;
    prefix: string;
}
export declare class TezosWallet implements AbstractWallet {
    readonly provider: TezosProvider;
    readonly blockchain = BlockchainGroup.TEZOS;
    constructor(provider: TezosProvider);
    private sign;
    signPersonalMessage(message: string): Promise<UserSignature>;
}
export declare class SolanaWallet implements AbstractWallet {
    readonly provider: SolanaWalletProvider;
    readonly blockchain = BlockchainGroup.SOLANA;
    constructor(provider: SolanaWalletProvider);
    signPersonalMessage(message: string): Promise<UserSignature>;
}
export declare class ImmutablexWallet implements AbstractWallet {
    readonly blockchain = BlockchainGroup.IMMUTABLEX;
    constructor();
    signPersonalMessage(message: string): Promise<{
        signature: string;
        publicKey: string;
    }>;
}
export declare type BlockchainWallet = EthereumWallet | FlowWallet | TezosWallet | SolanaWallet | ImmutablexWallet;
export declare type WalletByBlockchain = {
    "FLOW": FlowWallet;
    "ETHEREUM": EthereumWallet;
    "TEZOS": TezosWallet;
    "SOLANA": SolanaWallet;
    "IMMUTABLEX": EthereumWallet;
};
