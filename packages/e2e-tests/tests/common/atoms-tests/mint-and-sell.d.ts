import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { PrepareMintRequest } from "@rarible/sdk/src/types/nft/mint/prepare-mint-request.type";
import type { MintAndSellRequest, MintAndSellResponse } from "@rarible/sdk/build/types/nft/mint-and-sell/domain";
/**
 * Mint and sell NFT and check stock
 */
export declare function mintAndSell(sdk: IRaribleSdk, wallet: BlockchainWallet, prepareMintRequest: PrepareMintRequest, mintAndSellRequest: MintAndSellRequest): Promise<MintAndSellResponse>;
