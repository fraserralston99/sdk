import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { BurnRequest, PrepareBurnRequest } from "@rarible/sdk/build/types/nft/burn/domain";
import type { BigNumber } from "@rarible/types";
/**
 * Burn NFT and check result
 */
export declare function burn(sdk: IRaribleSdk, prepareBurnRequest: PrepareBurnRequest, burnRequest: BurnRequest, supply: string | number | BigNumber): Promise<void>;
