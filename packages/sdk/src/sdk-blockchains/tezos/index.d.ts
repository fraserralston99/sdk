import type { TezosWallet } from "@rarible/sdk-wallet";
import type { Maybe } from "@rarible/types/build/maybe";
import type { IApisSdk, IRaribleInternalSdk } from "../../domain";
import type { RaribleSdkConfig } from "../../config/domain";
export declare function createTezosSdk(wallet: Maybe<TezosWallet>, _apis: IApisSdk, config: RaribleSdkConfig): IRaribleInternalSdk;
