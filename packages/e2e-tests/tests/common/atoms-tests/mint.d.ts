import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { PrepareMintRequest } from "@rarible/sdk/src/types/nft/mint/prepare-mint-request.type";
import type { MintResponse } from "@rarible/sdk/build/types/nft/mint/domain";
import type { MintRequest } from "@rarible/sdk/build/types/nft/mint/mint-request.type";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { Item } from "@rarible/api-client";
/**
 * Mint NFT and check result
 */
export declare function mint(sdk: IRaribleSdk, wallet: BlockchainWallet, prepareMintRequest: PrepareMintRequest, mintRequest: MintRequest): Promise<{
    mintResponse: MintResponse;
    nft: Item;
}>;
