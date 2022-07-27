import type { Connection, PublicKey } from "@solana/web3.js";
import type { BigNumberValue } from "@rarible/utils";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { ITransactionPreparedInstructions } from "../../../common/transactions";
export interface IActionHouseExecuteSellRequest {
    connection: Connection;
    auctionHouse: PublicKey;
    signer: IWalletSigner;
    buyerWallet: PublicKey;
    sellerWallet: PublicKey;
    mint: PublicKey;
    tokenAccount?: PublicKey;
    price: BigNumberValue;
    tokensAmount: BigNumberValue;
}
export declare function getAuctionHouseExecuteSellInstructions(request: IActionHouseExecuteSellRequest): Promise<ITransactionPreparedInstructions>;
