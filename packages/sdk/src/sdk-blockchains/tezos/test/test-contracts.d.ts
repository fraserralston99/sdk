import type { ContractAddress } from "@rarible/types";
import type { RaribleSdkEnvironment } from "../../../config/domain";
export declare type contractType = "eurTzContract" | "fa12Contract" | "nftContract" | "mtContract";
export declare function getTestContract(env: RaribleSdkEnvironment, type: contractType): ContractAddress;
