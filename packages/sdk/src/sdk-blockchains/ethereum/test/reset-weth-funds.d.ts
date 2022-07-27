import type { Address } from "@rarible/types";
import type { EthereumWallet } from "@rarible/sdk-wallet";
import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
export declare function resetWethFunds(wallet: EthereumWallet, sdk: RaribleSdk, contract: Address): Promise<void>;
