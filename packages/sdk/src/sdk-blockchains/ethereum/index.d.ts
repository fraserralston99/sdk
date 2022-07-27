import type { EthereumWallet } from "@rarible/sdk-wallet";
import type { ConfigurationParameters } from "@rarible/ethereum-api-client";
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types";
import type { Maybe } from "@rarible/types/build/maybe";
import { Blockchain } from "@rarible/api-client";
import type { IApisSdk, IRaribleInternalSdk, LogsLevel } from "../../domain";
import type { IEthereumSdkConfig } from "./domain";
export declare function createEthereumSdk(wallet: Maybe<EthereumWallet>, apis: IApisSdk, blockchain: Blockchain.ETHEREUM | Blockchain.POLYGON, network: EthereumNetwork, config: {
    params?: ConfigurationParameters;
    logs?: LogsLevel;
} & IEthereumSdkConfig): IRaribleInternalSdk;
