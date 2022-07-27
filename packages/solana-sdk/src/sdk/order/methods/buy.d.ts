import type { Connection, PublicKey } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { BigNumberValue } from "@rarible/utils";
import type { ITransactionPreparedInstructions } from "../../../common/transactions";
export interface IActionHouseBuyRequest {
    connection: Connection;
    auctionHouse: PublicKey;
    signer: IWalletSigner;
    mint: PublicKey;
    tokenAccount?: PublicKey;
    price: BigNumberValue;
    tokensAmount: BigNumberValue;
}
export declare function getActionHouseBuyInstructions(request: IActionHouseBuyRequest): Promise<ITransactionPreparedInstructions>;
