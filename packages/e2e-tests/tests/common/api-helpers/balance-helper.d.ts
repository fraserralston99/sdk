import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { UnionAddress } from "@rarible/types";
import type { BigNumberValue } from "@rarible/utils";
import type { RequestCurrency } from "@rarible/sdk/src";
export declare function verifyBalance(sdk: IRaribleSdk, address: UnionAddress, assetType: RequestCurrency, amount: BigNumberValue): Promise<void>;
