import type { Connection, PublicKey } from "@solana/web3.js";
import type { BigNumberValue } from "@rarible/utils";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { ITransactionPreparedInstructions } from "../../../common/transactions";
export interface IActionHouseSellRequest {
    connection: Connection;
    auctionHouse: PublicKey;
    signer: IWalletSigner;
    mint: PublicKey;
    price: BigNumberValue;
    tokensAmount: BigNumberValue;
}
export declare function getAuctionHouseSellInstructions(request: IActionHouseSellRequest): Promise<ITransactionPreparedInstructions>;
