import { TezosWallet } from "@rarible/sdk-wallet";
import type { RaribleSdkEnvironment } from "../../../config/domain";
export declare function getNodeForEnv(env: RaribleSdkEnvironment): string;
export declare function createTestWallet(edsk: string, env: RaribleSdkEnvironment): TezosWallet;
