import type { TezosProvider, TezosNetwork } from "@rarible/tezos-sdk";
import type { UnionAddress } from "@rarible/types";
import type { BigNumberValue } from "@rarible/utils";
import type { RequestCurrency } from "../../common/domain";
import type { MaybeProvider } from "./common";
export declare class TezosBalance {
    private provider;
    private network;
    constructor(provider: MaybeProvider<TezosProvider>, network: TezosNetwork);
    getBalance(address: UnionAddress, currency: RequestCurrency): Promise<BigNumberValue>;
}
