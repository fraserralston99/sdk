/// <reference types="web3-provider-engine" />
import { createE2eProvider } from "@rarible/ethereum-sdk-test-common";
import Web3 from "web3";
declare type ProvidersConfig = Partial<{
    pk1: string;
    pk2: string;
}>;
export declare function initProviders({ pk1, pk2 }?: ProvidersConfig): {
    web31: Web3;
    web32: Web3;
    wallet1: import("ethereumjs-wallet").default;
    wallet2: import("ethereumjs-wallet").default;
};
export declare function initProvider(...args: Parameters<typeof createE2eProvider>): {
    provider: import("web3-provider-engine");
    wallet: import("ethereumjs-wallet").default;
    web3: Web3;
};
export {};
