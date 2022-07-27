import type { ItemId } from "@rarible/types";
import type { Ownership } from "@rarible/api-client/build/models";
import type { IRaribleSdk } from "../../../domain";
export declare function awaitForOwnership(sdk: IRaribleSdk, itemId: ItemId, receipent: string): Promise<Ownership>;
