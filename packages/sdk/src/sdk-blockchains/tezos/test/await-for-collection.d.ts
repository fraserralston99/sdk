import type { ContractAddress } from "@rarible/types";
import type { Collection } from "@rarible/api-client";
import type { IRaribleSdk } from "../../../domain";
export declare function awaitForCollection(sdk: IRaribleSdk, collection: ContractAddress): Promise<Collection>;
