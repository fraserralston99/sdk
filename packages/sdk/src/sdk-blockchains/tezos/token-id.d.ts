import type { TezosProvider } from "@rarible/tezos-sdk";
import type { GenerateTokenIdRequest, TokenId } from "../../types/nft/generate-token-id";
import type { MaybeProvider } from "./common";
export declare class TezosTokenId {
    private provider;
    constructor(provider: MaybeProvider<TezosProvider>);
    generateTokenId({ collection }: GenerateTokenIdRequest): Promise<TokenId>;
}
