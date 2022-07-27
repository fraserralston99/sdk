import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import type { UnionAddress } from "@rarible/types";
import type { BigNumberValue } from "@rarible/utils";
import type { IBlockchainTransaction } from "@rarible/sdk-transaction";
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types";
import { Blockchain } from "@rarible/api-client";
import { Action } from "@rarible/action";
import type { ConvertRequest } from "../../types/balances";
import type { DepositBiddingBalanceRequest, GetBiddingBalanceRequest, WithdrawBiddingBalanceRequest } from "../../types/balances";
import type { RequestCurrency } from "../../common/domain";
import type { IApisSdk } from "../../domain";
export declare class EthereumBalance {
    private sdk;
    private readonly apis;
    private network;
    constructor(sdk: RaribleSdk, apis: IApisSdk, network: EthereumNetwork);
    getBalance(address: UnionAddress, currency: RequestCurrency): Promise<BigNumberValue>;
    convert(request: ConvertRequest): Promise<IBlockchainTransaction>;
    getBiddingBalance(request: GetBiddingBalanceRequest): Promise<BigNumberValue>;
    depositBiddingBalance: Action<"send-tx", DepositBiddingBalanceRequest, IBlockchainTransaction<Blockchain>>;
    withdrawBiddingBalance: Action<"send-tx", WithdrawBiddingBalanceRequest, IBlockchainTransaction<Blockchain>>;
}
