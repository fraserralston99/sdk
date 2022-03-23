import { Blockchain } from "@rarible/api-client"
import type { SolanaSdk } from "@rarible/solana-sdk"
import type { Maybe } from "@rarible/types/build/maybe"
import type { SolanaWallet } from "@rarible/sdk-wallet/src"
import { Action } from "@rarible/action"
import { toOrderId } from "@rarible/types"
import type * as OrderCommon from "../../types/order/common"
import { OriginFeeSupport, PayoutsSupport } from "../../types/order/fill/domain"
import { getAuctionHouse } from "./common/auction-house"
import { extractPublicKey } from "./common/address-converters"

export class SolanaSell {
	constructor(readonly sdk: SolanaSdk, readonly wallet: Maybe<SolanaWallet>) {
		this.sell = this.sell.bind(this)
	}

	async sell(request: OrderCommon.PrepareOrderInternalRequest): Promise<OrderCommon.PrepareOrderInternalResponse> {
		if (!this.wallet) {
			throw new Error("Solana wallet not provided")
		}

		const submit = Action.create({
			id: "send-tx" as const,
			run: async (request: OrderCommon.OrderInternalRequest) => {
				const res = await this.sdk.order.sell({
					auctionHouse: getAuctionHouse("SOL"),
					signer: this.wallet!.provider,
					mint: extractPublicKey(request.itemId),
					price: parseFloat(request.price.toString()),
					tokensAmount: request.amount,
				})

				return toOrderId(`SOLANA:${res.txId}`)
			},
		})

		return {
			originFeeSupport: OriginFeeSupport.NONE, //todo check this
			payoutsSupport: PayoutsSupport.NONE, //todo check this
			multiple: false,
			supportedCurrencies: [{ blockchain: Blockchain.SOLANA, type: "NATIVE" }],
			baseFee: 0, //await this.sdk.order.getBaseOrderFee(), //todo check this
			supportsExpirationDate: true,
			submit: submit,
		}
	}
}
