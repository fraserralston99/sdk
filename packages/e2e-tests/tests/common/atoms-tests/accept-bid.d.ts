import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { FillRequest, PrepareFillRequest } from "@rarible/sdk/src/types/order/fill/domain";
import type { IBlockchainTransaction } from "@rarible/sdk-transaction";
/**
 * Fill an bid order
 */
export declare function acceptBid(sdk: IRaribleSdk, wallet: BlockchainWallet, prepareFillOrderRequest: PrepareFillRequest, fillRequest: FillRequest): Promise<IBlockchainTransaction>;
