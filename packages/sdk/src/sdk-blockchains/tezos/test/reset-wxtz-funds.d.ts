import type { ContractAddress } from "@rarible/types";
import type { TezosWallet } from "@rarible/sdk-wallet";
import type { IRaribleSdk } from "../../../domain";
export declare function resetWXTZFunds(wallet: TezosWallet, sdk: IRaribleSdk, contract: ContractAddress): Promise<void>;
