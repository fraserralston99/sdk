import type { Connection, PublicKey } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { BigNumberValue } from "@rarible/utils";
import type { ITransactionPreparedInstructions } from "../../../common/transactions";
export interface IActionHouseCancelRequest {
    connection: Connection;
    auctionHouse: PublicKey;
    signer: IWalletSigner;
    mint: PublicKey;
    price: BigNumberValue;
    tokensAmount: BigNumberValue;
}
export declare function getAuctionHouseCancelInstructions(request: IActionHouseCancelRequest): Promise<ITransactionPreparedInstructions>;
