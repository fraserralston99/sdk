import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk"
import type { UnionAddress } from "@rarible/types"
import type { AssetType } from "@rarible/api-client"
import type { Erc20AssetType, EthAssetType } from "@rarible/ethereum-api-client"
import type { BigNumberValue } from "@rarible/utils"
import type { IBlockchainTransaction } from "@rarible/sdk-transaction"
import { BlockchainEthereumTransaction } from "@rarible/sdk-transaction"
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types"
import { convertToEthereumAddress, convertToEthereumAssetType } from "./common"

export class EthereumBalance {
	constructor(
		private sdk: RaribleSdk,
		private network: EthereumNetwork,
	) {
		this.getBalance = this.getBalance.bind(this)
	}

	convertAssetType(assetType: AssetType): EthAssetType | Erc20AssetType {
		switch (assetType["@type"]) {
			case "ETH": {
				return { assetClass: "ETH" }
			}
			case "ERC20": {
				return {
					assetClass: "ERC20",
					contract: convertToEthereumAddress(assetType.contract),
				}
			}
			default: {
				throw new Error(`Unsupported asset type=${assetType["@type"]}`)
			}
		}
	}

	async convertCurrency(
		from: AssetType, to: AssetType, value: BigNumberValue
	): Promise<IBlockchainTransaction> {
		const tx = await this.sdk.balances.convert(
			convertToEthereumAssetType(from),
			convertToEthereumAssetType(to),
			value
		)

		return new BlockchainEthereumTransaction(tx, this.network)
	}

	async getBalance(address: UnionAddress, assetType: AssetType): Promise<BigNumberValue> {
		const ethAddress = convertToEthereumAddress(address)
		const convertedAssetType = this.convertAssetType(assetType)
		return this.sdk.balances.getBalance(ethAddress, convertedAssetType)
	}
}
