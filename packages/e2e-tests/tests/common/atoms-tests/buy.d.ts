import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { FillRequest, PrepareFillRequest } from "@rarible/sdk/src/types/order/fill/domain";
import type { IBlockchainTransaction } from "@rarible/sdk-transaction";
import type { ItemId } from "@rarible/types";
/**
 * Buying an nft
 */
export declare function buy(sdk: IRaribleSdk, wallet: BlockchainWallet, itemId: ItemId, prepareFillOrderRequest: PrepareFillRequest, fillRequest: FillRequest): Promise<IBlockchainTransaction>;
