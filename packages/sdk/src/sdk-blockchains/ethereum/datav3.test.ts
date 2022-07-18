import { Web3Ethereum } from "@rarible/web3-ethereum"
import { EthereumWallet } from "@rarible/sdk-wallet"
import { awaitAll, deployTestErc20 } from "@rarible/ethereum-sdk-test-common"
import { sentTxConfirm } from "@rarible/protocol-ethereum-sdk/src/common/send-transaction"
import { toAddress, toUnionAddress } from "@rarible/types"
import type { ItemId } from "@rarible/api-client"
import { Blockchain, BlockchainGroup } from "@rarible/api-client"
import { createRaribleSdk } from "../../index"
import { LogsLevel } from "../../domain"
import { MintType } from "../../types/nft/mint/domain"
import { initProviders } from "./test/init-providers"
import { awaitStock } from "./test/await-stock"
import { awaitItem } from "./test/await-item"
import { convertEthereumCollectionId, convertEthereumContractAddress, convertEthereumToUnionAddress } from "./common"

describe("Create & fill orders with order data v3", () => {
	const { web31, web32, wallet1, wallet2 } = initProviders()
	const ethereum1 = new Web3Ethereum({ web3: web31 })
	const ethereum2 = new Web3Ethereum({ web3: web32 })
	const sdk1 = createRaribleSdk(new EthereumWallet(ethereum1), "development", {
		logs: LogsLevel.DISABLED,
		blockchain: {
			[BlockchainGroup.ETHEREUM]: {
				marketplaceMarker: "0x000000000000000000000000000000000000000000000000000000000000face",
				useDataV3: true,
			},
		},
	})
	const sdk2 = createRaribleSdk(new EthereumWallet(ethereum2), "development", {
		logs: LogsLevel.DISABLED,
		blockchain: {
			[BlockchainGroup.ETHEREUM]: {
				marketplaceMarker: "0x000000000000000000000000000000000000000000000000000000000000dead",
				useDataV3: true,
			},
		},
	})
	const it = awaitAll({
		testErc20: deployTestErc20(web31, "Test1", "TST1"),
	})

	const erc721Address = toAddress("0x64F088254d7EDE5dd6208639aaBf3614C80D396d")

	async function mint(): Promise<ItemId> {
		const wallet1Address = wallet1.getAddressString()
		const action = await sdk1.nft.mint({
			collectionId: convertEthereumCollectionId(erc721Address, Blockchain.ETHEREUM),
		})
		const result = await action.submit({
			uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
			creators: [{
				account: convertEthereumToUnionAddress(wallet1Address, Blockchain.ETHEREUM),
				value: 10000,
			}],
			royalties: [],
			lazyMint: false,
			supply: 1,
		})
		if (result.type === MintType.ON_CHAIN) {
			await result.transaction.wait()
		}

		await awaitItem(sdk1, result.itemId)
		return result.itemId
	}

	test("erc721 sell/buy", async () => {
		const wallet1Address = wallet1.getAddressString()

		const itemId = await mint()

		const sellAction = await sdk1.order.sell({ itemId: itemId })
		const orderId = await sellAction.submit({
			amount: 1,
			price: "0.0000000000002",
			currency: { "@type": "ETH" },
			originFees: [{
				account: toUnionAddress("ETHEREUM:"+wallet1Address),
				value: 10,
			}],
			maxFeesBasePoint: 500,
		})

		console.log("orderid > ", orderId)

		const nextStock = "1"
		const order = await awaitStock(sdk1, orderId, nextStock)
		expect(order.makeStock.toString()).toEqual(nextStock)

		const updateAction = await sdk1.order.sellUpdate({ orderId })
		await updateAction.submit({ price: "0.0000000000003" })

		await sdk1.apis.order.getOrderById({ id: orderId })

		const fillAction = await sdk2.order.buy({ orderId })

		const tx = await fillAction.submit({ amount: 1 })
		await tx.wait()

		const nextStock2 = "0"
		const order2 = await awaitStock(sdk1, orderId, nextStock2)
		expect(order2.makeStock.toString()).toEqual(nextStock2)
	})

	test("erc721 bid/acceptBid", async () => {
		await sentTxConfirm(it.testErc20.methods.mint(wallet2.getAddressString(), "10000000000000"), {
			from: wallet1.getAddressString(),
			gas: 500000,
		})

		// console.log("balance",
		// 	(await sdk2.balances.getBalance(toUnionAddress("ETHEREUM:" + wallet2.getAddressString()), {
		// 		"@type": "ERC20",
		// 		contract: convertEthereumContractAddress(it.testErc20.options.address, Blockchain.ETHEREUM),
		// 	})).toString()
		// )

		const itemId = await mint()

		const bidAction = await sdk2.order.bid({ itemId: itemId })
		const orderId = await bidAction.submit({
			amount: 1,
			price: "0.0000000000002",
			currency: {
				"@type": "ERC20",
				contract: convertEthereumContractAddress(it.testErc20.options.address, Blockchain.ETHEREUM),
			},
			maxFeesBasePoint: 500,
		})

		console.log("orderid > ", orderId)

		const nextStock = "1"
		const order = await awaitStock(sdk1, orderId, nextStock)
		expect(order.makeStock.toString()).toEqual(nextStock)

		const updateAction = await sdk2.order.bidUpdate({ orderId })
		await updateAction.submit({ price: "0.0000000000003" })

		await sdk1.apis.order.getOrderById({ id: orderId })

		const fillAction = await sdk1.order.acceptBid({ orderId })

		const tx = await fillAction.submit({ amount: 1 })
		await tx.wait()

		const nextStock2 = "0"
		const order2 = await awaitStock(sdk1, orderId, nextStock2)
		expect(order2.makeStock.toString()).toEqual(nextStock2)
	})
})
