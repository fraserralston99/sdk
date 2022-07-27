import Web3ProviderEngine from "web3-provider-engine";
import { EthereumWallet } from "@rarible/sdk-wallet";
export declare function updateNodeGlobalVars(): void;
export declare function initNodeProvider(pk: string, config: {
    networkId: number;
    rpcUrl: string;
}): Web3ProviderEngine;
export declare function initWallet(privateKey: string): Promise<EthereumWallet>;
export declare function initWalletWeb3(privateKey: string): Promise<EthereumWallet>;
export declare function initWalletWeb3WithHDWallet(privateKey: string): Promise<EthereumWallet>;
