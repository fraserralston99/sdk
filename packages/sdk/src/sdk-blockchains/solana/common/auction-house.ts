import type { PublicKey } from "@solana/web3.js"
import type { SolanaNftAssetType, SolanaSolAssetType } from "@rarible/api-client"
import { toPublicKey } from "@rarible/solana-common"
import type { SolanaAuctionHouseMapping } from "../domain"
import { extractAddress } from "./address-converters"

const auctionHouseFee: Record<string, number> = {
	"8Qu3azqi31VpgPwVW99AyiBGnLSpookWQiwLMvFn4NFm": 1000, // 10%
}

type CurrencyType = SolanaNftAssetType | SolanaSolAssetType

export function getAuctionHouse(currency: CurrencyType, auctionHouseMapping?: SolanaAuctionHouseMapping): PublicKey {
	if (currency["@type"] === "SOLANA_SOL") {
		if (auctionHouseMapping && auctionHouseMapping["SOLANA_SOL"]) {
			return toPublicKey(auctionHouseMapping["SOLANA_SOL"].address)
		}
	} else if (currency["@type"] === "SOLANA_NFT") {
		const mintAddress = extractAddress(currency.itemId)
		if (auctionHouseMapping && auctionHouseMapping[mintAddress]) {
			return toPublicKey(auctionHouseMapping[mintAddress].address)
		}
	}

	return toPublicKey("8Qu3azqi31VpgPwVW99AyiBGnLSpookWQiwLMvFn4NFm")
}

export async function getAuctionHouseFee(
	ah: PublicKey | string,
	auctionHouseMapping?: SolanaAuctionHouseMapping
): Promise<number> {
	const ahAddress = ah.toString()
	if (auctionHouseMapping) {
		const ahRecord = Object.values(auctionHouseMapping)
			.find((record) => record.address === ahAddress)

		if (ahRecord) {
			return ahRecord.baseFee
		}
	}

	return auctionHouseFee[ahAddress] ?? 0
}