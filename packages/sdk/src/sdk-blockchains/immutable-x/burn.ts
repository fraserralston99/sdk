import { Action } from "@rarible/action"
import { toAddress, toBigNumber } from "@rarible/types"
import type { RaribleImxSdk } from "@rarible/immutable-sdk/build/domain"
import type { ImxNetwork } from "@rarible/immutable-wallet"
import { BlockchainImxTransaction } from "@rarible/sdk-transaction"
import type { PrepareBurnRequest, PrepareBurnResponse } from "../../types/nft/burn/domain"

export class ImxBurn {
	constructor(
		private sdk: RaribleImxSdk,
		private network: ImxNetwork,
	) {
		this.burn = this.burn.bind(this)
	}

	async burn(prepare: PrepareBurnRequest): Promise<PrepareBurnResponse> {
		if (!prepare.itemId) {
			throw new Error("ItemId has not been specified")
		}
		const [domain, contract, itemId] = prepare.itemId.split(":")
		if (domain !== "IMMUTABLE") {
			throw new Error("Wrong blockchain")
		}

		return {
			multiple: false,
			maxAmount: toBigNumber("1"),
			submit: Action.create({
				id: "burn" as const,

				run: async () => {
					const { txId } = await this.sdk.nft.burn({
						assetClass: "ERC721",
						contract: toAddress(contract),
						tokenId: toBigNumber(itemId),
					})
					return new BlockchainImxTransaction({ txId: txId.toString() }, this.network)
				},
			}),
		}
	}
}
