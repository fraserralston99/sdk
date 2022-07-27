import BigNumber from "bignumber.js";
import type { EthereumWallet } from "@rarible/sdk-wallet";
import type { BigNumberValue } from "@rarible/utils";
import type { IRaribleSdk } from "../../../domain";
import type { RequestCurrencyAssetType } from "../../../common/domain";
export declare function awaitBalance(sdk: IRaribleSdk, assetType: RequestCurrencyAssetType, wallet: EthereumWallet, value: BigNumberValue): Promise<BigNumber>;
