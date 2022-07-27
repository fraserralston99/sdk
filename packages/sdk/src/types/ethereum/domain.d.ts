import type { IBlockchainTransaction } from "@rarible/sdk-transaction";
import type { Action } from "@rarible/action";
export declare type CryptopunkWrapRequest = {
    punkId: number;
};
export declare type CryptopunkUnwrapRequest = {
    punkId: number;
};
export declare type ICryptopunkWrap = Action<"approve-tx" | "wrap-tx", CryptopunkWrapRequest, IBlockchainTransaction>;
export declare type ICryptopunkUnwrap = Action<"unwrap-tx", CryptopunkUnwrapRequest, IBlockchainTransaction>;
