import type { SolanaSdk } from "@rarible/solana-sdk";
import type { Maybe } from "@rarible/types/build/maybe";
import type { SolanaWallet } from "@rarible/sdk-wallet";
import type { IApisSdk } from "../../domain";
import type { PrepareFillRequest, PrepareFillResponse } from "../../types/order/fill/domain";
import type { ISolanaSdkConfig } from "./domain";
export declare class SolanaFill {
    readonly sdk: SolanaSdk;
    readonly wallet: Maybe<SolanaWallet>;
    private readonly apis;
    private readonly config;
    constructor(sdk: SolanaSdk, wallet: Maybe<SolanaWallet>, apis: IApisSdk, config: ISolanaSdkConfig | undefined);
    private static isBuyOrder;
    fill(request: PrepareFillRequest): Promise<PrepareFillResponse>;
    private buy;
    private acceptBid;
}
