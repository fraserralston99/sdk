import type { UnionAddress } from "@rarible/types"
import type { AssetType } from "@rarible/api-client"
import type { BigNumberValue } from "@rarible/utils"
import type { SolanaSdk } from "@rarible/solana-sdk"
import type { SolanaWallet } from "@rarible/sdk-wallet/src"
import type { Maybe } from "@rarible/types/build/maybe"
import { extractPublicKey } from "./common/address-converters"

export class SolanaBalance {
	constructor(
		readonly sdk: SolanaSdk,
		readonly wallet: Maybe<SolanaWallet>
	) {
		this.getBalance = this.getBalance.bind(this)
	}

	async getBalance(address: UnionAddress, assetType: AssetType): Promise<BigNumberValue> {
		if (assetType["@type"] === "SOLANA_SOL") {
			return this.sdk.balances.getBalance(extractPublicKey(address), { commitment: "max" })
		} else if (assetType["@type"] === "SOLANA_NFT") {
			const tokenBalance = await this.sdk.balances.getTokenBalance(
				extractPublicKey(address),
				extractPublicKey(assetType.itemId)
			)
			return tokenBalance.value?.length
		} else {
			throw new Error("Unsupported asset type")
		}
	}
}
