import type { UnionAddress } from "@rarible/types";
import type { BigNumberValue } from "@rarible/utils";
import type { SolanaSdk } from "@rarible/solana-sdk";
import type { SolanaWallet } from "@rarible/sdk-wallet";
import type { Maybe } from "@rarible/types/build/maybe";
import { Action } from "@rarible/action";
import { BlockchainSolanaTransaction } from "@rarible/sdk-transaction";
import type { RequestCurrency } from "../../common/domain";
import type { IApisSdk } from "../../domain";
import type { DepositBiddingBalanceRequest, GetBiddingBalanceRequest, WithdrawBiddingBalanceRequest } from "../../types/balances";
import type { ISolanaSdkConfig } from "./domain";
export declare class SolanaBalance {
    readonly sdk: SolanaSdk;
    readonly wallet: Maybe<SolanaWallet>;
    private readonly apis;
    private readonly config;
    constructor(sdk: SolanaSdk, wallet: Maybe<SolanaWallet>, apis: IApisSdk, config: ISolanaSdkConfig | undefined);
    getBalance(address: UnionAddress, currency: RequestCurrency): Promise<BigNumberValue>;
    private getAuctionHouse;
    getBiddingBalance(request: GetBiddingBalanceRequest): Promise<BigNumberValue>;
    depositBiddingBalance: Action<"send-tx", DepositBiddingBalanceRequest, BlockchainSolanaTransaction>;
    withdrawBiddingBalance: Action<"send-tx", WithdrawBiddingBalanceRequest, BlockchainSolanaTransaction>;
}
