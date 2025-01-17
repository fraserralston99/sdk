import type { SolanaSdk } from "@rarible/solana-sdk";
import type { Maybe } from "@rarible/types/build/maybe";
import type { SolanaWallet } from "@rarible/sdk-wallet";
import type { IApisSdk } from "../../domain";
import type { ICreateCollection } from "../../types/nft/deploy/domain";
import type { ISolanaSdkConfig } from "./domain";
export declare class SolanaCollection {
    readonly sdk: SolanaSdk;
    readonly wallet: Maybe<SolanaWallet>;
    private readonly apis;
    private readonly config;
    constructor(sdk: SolanaSdk, wallet: Maybe<SolanaWallet>, apis: IApisSdk, config: ISolanaSdkConfig | undefined);
    createCollection: ICreateCollection;
}
