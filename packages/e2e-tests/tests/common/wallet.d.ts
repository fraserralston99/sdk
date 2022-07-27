import type { BlockchainWallet } from "@rarible/sdk-wallet";
import { EthereumWallet, FlowWallet, SolanaWallet, TezosWallet } from "@rarible/sdk-wallet";
import type { UnionAddress } from "@rarible/types";
export declare function getEthereumWallet(pk?: string): EthereumWallet;
export declare function getPolygonWallet(pk?: string): EthereumWallet;
export declare function getEthereumWalletBuyer(): EthereumWallet;
export declare function getTezosTestWallet(walletNumber?: number): TezosWallet;
export declare function getFlowSellerWallet(): FlowWallet;
export declare function getFlowBuyerWallet(): FlowWallet;
export declare function getSolanaWallet(walletNumber?: number): SolanaWallet;
export declare function getWalletAddressFull(wallet: BlockchainWallet): Promise<WalletAddress>;
export interface WalletAddress {
    address: string;
    addressWithPrefix: string;
    unionAddress: UnionAddress;
}
