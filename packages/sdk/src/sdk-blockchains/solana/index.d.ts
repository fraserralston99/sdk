import type { Cluster } from "@solana/web3.js";
import type { Maybe } from "@rarible/types/build/maybe";
import type { SolanaWallet } from "@rarible/sdk-wallet";
import type { IApisSdk, IRaribleInternalSdk } from "../../domain";
import type { ISolanaSdkConfig } from "./domain";
export declare function createSolanaSdk(wallet: Maybe<SolanaWallet>, apis: IApisSdk, cluster: Cluster, config: ISolanaSdkConfig | undefined): IRaribleInternalSdk;
