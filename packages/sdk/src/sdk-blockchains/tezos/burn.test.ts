import { toContractAddress } from "@rarible/types"
import { createRaribleSdk } from "../../index"
import { MintType } from "../../types/nft/mint/domain"
import { LogsLevel } from "../../domain"
import { awaitForItemSupply } from "./test/await-for-item-supply"
import { createTestWallet } from "./test/test-wallet"

describe("burn test", () => {
	const sellerWallet = createTestWallet(
		"edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1" +
    "D6H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj")
	const sdk = createRaribleSdk(sellerWallet, "dev", { logs: LogsLevel.DISABLED })

	let nftContract: string = "KT1EreNsT2gXRvuTUrpx6Ju4WMug5xcEpr43"
	let mtContract: string = "KT1RuoaCbnZpMgdRpSoLfJUzSkGz1ZSiaYwj"

	test.skip("burn NFT token test", async () => {
		const mintResponse = await sdk.nft.mint({
			collectionId: toContractAddress(`TEZOS:${nftContract}`),
		})
		const mintResult = await mintResponse.submit({
			uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
			supply: 1,
			lazyMint: false,
		})
		if (mintResult.type === MintType.ON_CHAIN) {
			await mintResult.transaction.wait()
		}
		console.log("after mint")
		await awaitForItemSupply(sdk, mintResult.itemId, "1")

		const transfer = await sdk.nft.burn({ itemId: mintResult.itemId })

		console.log("after burn")
		const result = await transfer.submit({ amount: 1 })

		if (result) {
		  await result.wait()
		}

		await awaitForItemSupply(sdk, mintResult.itemId, "0")
	}, 1500000)

	test.skip("burn MT token test", async () => {
		const mintResponse = await sdk.nft.mint({
			collectionId: toContractAddress(`TEZOS:${mtContract}`),
		})
		const mintResult = await mintResponse.submit({
			uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
			supply: 10,
			lazyMint: false,
		})
		if (mintResult.type === MintType.ON_CHAIN) {
			await mintResult.transaction.wait()
		}

		await awaitForItemSupply(sdk, mintResult.itemId, "10")

		console.log("before burn")
		const transfer = await sdk.nft.burn({
			itemId: mintResult.itemId,
		})
		console.log("before burn submit")
		const result = await transfer.submit({ amount: 5 })
		if (result) {
		  await result.wait()
		}

		await awaitForItemSupply(sdk, mintResult.itemId, "5")
	}, 1500000)

})
