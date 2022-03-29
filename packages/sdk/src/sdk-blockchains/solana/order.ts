import type { SolanaSdk } from "@rarible/solana-sdk"
import type { Maybe } from "@rarible/types/build/maybe"
import type { SolanaWallet } from "@rarible/sdk-wallet/src"
import { Action } from "@rarible/action"
import { toBigNumber } from "@rarible/types"
import { BlockchainSolanaTransaction } from "@rarible/sdk-transaction"
import { toPublicKey } from "@rarible/solana-common"
import type * as OrderCommon from "../../types/order/common"
import type {
	OrderRequest,
	OrderUpdateRequest,
	PrepareOrderUpdateRequest,
	PrepareOrderUpdateResponse,
} from "../../types/order/common"
import { OriginFeeSupport, PayoutsSupport } from "../../types/order/fill/domain"
import type { IApisSdk } from "../../domain"
import type { CancelOrderRequest, ICancel } from "../../types/order/cancel/domain"
import type {
	GetConvertableValueResult,
	PrepareBidRequest,
	PrepareBidResponse,
	PrepareBidUpdateResponse,
} from "../../types/order/bid/domain"
import { getAuctionHouse, getAuctionHouseFee } from "./common/auction-house"
import { extractPublicKey } from "./common/address-converters"
import { getMintId, getOrderData, getOrderId, getPreparedOrder, getPrice, getTokensAmount } from "./common/order"
import { getCurrencies } from "./common/currencies"

const WRAPPED_SOL = "So11111111111111111111111111111111111111112"

export class SolanaOrder {
	constructor(
		readonly sdk: SolanaSdk,
		readonly wallet: Maybe<SolanaWallet>,
		private readonly apis: IApisSdk,
	) {
		this.sell = this.sell.bind(this)
		this.bid = this.bid.bind(this)
		this.sellUpdate = this.sellUpdate.bind(this)
		this.bidUpdate = this.bidUpdate.bind(this)
	}

	async sell(request: OrderCommon.PrepareOrderInternalRequest): Promise<OrderCommon.PrepareOrderInternalResponse> {
		if (!this.wallet) {
			throw new Error("Solana wallet not provided")
		}

		const submit = Action.create({
			id: "send-tx" as const,
			run: async (request: OrderCommon.OrderInternalRequest) => {
				const mint = extractPublicKey(request.itemId)
				const auctionHouse = getAuctionHouse("SOL")

				const res = await this.sdk.order.sell({
					auctionHouse: auctionHouse,
					signer: this.wallet!.provider,
					mint: mint,
					price: parseFloat(request.price.toString()),
					tokensAmount: request.amount,
				})

				await this.sdk.confirmTransaction(res.txId, "max")

				return getOrderId(
					"SELL",
					this.wallet!.provider.publicKey.toString(),
					mint.toString(),
					auctionHouse.toString()
				)
			},
		})

		return {
			originFeeSupport: OriginFeeSupport.NONE,
			payoutsSupport: PayoutsSupport.NONE,
			multiple: true,
			supportedCurrencies: getCurrencies(),
			baseFee: await getAuctionHouseFee(getAuctionHouse("SOL")), //todo check this
			supportsExpirationDate: false,
			submit: submit,
		}
	}

	async sellUpdate(prepareRequest: PrepareOrderUpdateRequest): Promise<PrepareOrderUpdateResponse> {
		if (!this.wallet) {
			throw new Error("Solana wallet not provided")
		}

		const order = await getPreparedOrder(prepareRequest, this.apis)

		const updateAction = Action.create({
			id: "send-tx" as const,
			run: async (updateRequest: OrderUpdateRequest) => {
				const mint = getMintId(order)
				const auctionHouse = toPublicKey(getOrderData(order).auctionHouse!)

				const res = await this.sdk.order.sell({
					auctionHouse: auctionHouse,
					signer: this.wallet!.provider,
					mint: mint,
					price: parseFloat(updateRequest.price.toString()),
					tokensAmount: getTokensAmount(order),
				})

				await this.sdk.confirmTransaction(res.txId, "max")

				return getOrderId(
					"SELL",
					this.wallet!.provider.publicKey.toString(),
					mint.toString(),
					auctionHouse.toString()
				)
			},
		})

		return {
			originFeeSupport: OriginFeeSupport.NONE,
			payoutsSupport: PayoutsSupport.NONE,
			supportedCurrencies: getCurrencies(),
			baseFee: await getAuctionHouseFee(getOrderData(order).auctionHouse!), //todo check this
			submit: updateAction,
		}
	}

	private async getConvertableValue(): Promise<GetConvertableValueResult> {
		return undefined
	}

	async bid(prepare: PrepareBidRequest): Promise<PrepareBidResponse> {
		if (!this.wallet) {
			throw new Error("Solana wallet not provided")
		}

		if (!("itemId" in prepare)) {
			throw new Error("No ItemId provided")
		}

		const item = await this.apis.item.getItemById({ itemId: prepare.itemId })

		const submit = Action.create({
			id: "send-tx" as const,
			run: async (request: OrderRequest) => {
				const mint = extractPublicKey(prepare.itemId)
				const auctionHouse = getAuctionHouse("SOL")

				const res = await this.sdk.order.buy({
					auctionHouse: auctionHouse,
					signer: this.wallet!.provider,
					mint: mint,
					price: parseFloat(request.price.toString()),
					tokensAmount: request.amount,
				})

				await this.sdk.confirmTransaction(res.txId, "max")

				return getOrderId(
					"BUY",
					this.wallet!.provider.publicKey.toString(),
					WRAPPED_SOL, //todo should be ah currency program address
					auctionHouse.toString()
				)
			},
		})

		return {
			multiple: parseFloat(item.supply) > 1,
			maxAmount: toBigNumber(item.supply),
			originFeeSupport: OriginFeeSupport.NONE,
			payoutsSupport: PayoutsSupport.NONE,
			supportedCurrencies: getCurrencies(),
			baseFee: 0, //todo check
			getConvertableValue: this.getConvertableValue,
			supportsExpirationDate: false,
			submit,
		}
	}

	async bidUpdate(prepareRequest: PrepareOrderUpdateRequest): Promise<PrepareBidUpdateResponse> {
		if (!this.wallet) {
			throw new Error("Solana wallet not provided")
		}

		const order = await getPreparedOrder(prepareRequest, this.apis)

		const updateAction = Action.create({
			id: "send-tx" as const,
			run: async (updateRequest: OrderUpdateRequest) => {
				const mint = getMintId(order)
				const auctionHouse = toPublicKey(getOrderData(order).auctionHouse!)

				const res = await this.sdk.order.buy({
					auctionHouse: auctionHouse,
					signer: this.wallet!.provider,
					mint: mint,
					price: parseFloat(updateRequest.price.toString()),
					tokensAmount: getTokensAmount(order),
				})

				await this.sdk.confirmTransaction(res.txId, "max")

				return getOrderId(
					"BUY",
					this.wallet!.provider.publicKey.toString(),
					WRAPPED_SOL,  //todo should be ah currency program address
					auctionHouse.toString()
				)
			},
		})

		return {
			originFeeSupport: OriginFeeSupport.NONE,
			payoutsSupport: PayoutsSupport.NONE,
			supportedCurrencies: getCurrencies(),
			baseFee: 0, // todo check
			getConvertableValue: this.getConvertableValue,
			submit: updateAction,
		}
	}

	cancel: ICancel = Action.create({
		id: "send-tx" as const,
		run: async (request: CancelOrderRequest) => {
			const order = await getPreparedOrder(request, this.apis)
			const orderData = getOrderData(order)

			const tx = await this.sdk.order.cancel({
				auctionHouse: extractPublicKey(orderData.auctionHouse!),
				signer: this.wallet!.provider,
				mint: getMintId(order),
				price: getPrice(order),
				tokensAmount: getTokensAmount(order),
			})

			return new BlockchainSolanaTransaction(tx, this.sdk)
		},
	})
}