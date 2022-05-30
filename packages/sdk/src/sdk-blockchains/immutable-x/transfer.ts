import { Action } from "@rarible/action"
import { toAddress, toBigNumber } from "@rarible/types"
import type { RaribleImxSdk } from "@rarible/immutable-sdk/build/domain"
import type { ImxNetwork } from "@rarible/immutable-wallet"
import { BlockchainImxTransaction } from "@rarible/sdk-transaction"
import type { PrepareTransferRequest, TransferRequest } from "../../types/nft/transfer/domain"
import { convertToEthereumAddress } from "../ethereum/common"
import type { IApisSdk } from "../../domain"

export class ImxTransfer {
	constructor(
		private sdk: RaribleImxSdk,
		private apis: IApisSdk,
		private network: ImxNetwork,
	) {
		this.transfer = this.transfer.bind(this)
	}

	async transfer(prepare: PrepareTransferRequest) {
		if (!prepare.itemId) {
			throw new Error("ItemId has not been specified")
		}
		const [domain, contract, itemId] = prepare.itemId.split(":")
		if (domain !== "IMMUTABLE") {
			throw new Error("Wrong blockchain")
		}

		const item = await this.apis.item.getItemById({
			itemId: prepare.itemId,
		})
		const collection = await this.apis.collection.getCollectionById({
			collection: item.collection!,
		})

		if (collection.type !== "ERC721") {
			throw new Error(`Unsupported assetType for immutable blockchain: ${collection.type}`)
		}

		return {
			multiple: false,
			maxAmount: item.supply,
			submit: Action.create({
				id: "transfer" as const,
				run: async (request: TransferRequest) => {
					const tx = await this.sdk.nft.transfer(
						{
							assetClass: "ERC721",
							contract: toAddress(contract),
							tokenId: toBigNumber(itemId),
							to: convertToEthereumAddress(request.to),
						},
					)

					return new BlockchainImxTransaction({ txId: tx.txId.toString() }, this.network)
				},
			}),
		}
	}
}
