import type { BigNumberValue } from "@rarible/utils";
import type { Connection, PublicKey } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { ITransactionPreparedInstructions } from "../../../common/transactions";
export interface IActionHouseEscrowWithdrawRequest {
    connection: Connection;
    auctionHouse: PublicKey;
    signer: IWalletSigner;
    amount: BigNumberValue;
}
export declare function getActionHouseEscrowWithdrawInstructions(request: IActionHouseEscrowWithdrawRequest): Promise<ITransactionPreparedInstructions>;