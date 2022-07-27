import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types";
import type { ICryptopunkUnwrap, ICryptopunkWrap } from "../../types/ethereum/domain";
export declare class EthereumCryptopunk {
    private readonly sdk;
    private network;
    constructor(sdk: RaribleSdk, network: EthereumNetwork);
    wrap: ICryptopunkWrap;
    unwrap: ICryptopunkUnwrap;
}
