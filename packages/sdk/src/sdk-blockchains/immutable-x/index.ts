import type { Maybe } from "@rarible/types/build/maybe"
import type { ImmutableXWallet } from "@rarible/sdk-wallet/src"
import { createImxSdk, IMX_ENV_CONFIG } from "@rarible/immutable-sdk"
import type { ImxEnv } from "@rarible/immutable-wallet"
import type { IApisSdk, IRaribleInternalSdk } from "../../domain"
import type { CanTransferResult } from "../../types/nft/restriction/domain"
import { notImplemented } from "../../common/not-implemented"
import { ImxBurn } from "./burn"
import { ImxTransfer } from "./transfer"

export function createImmutableXSdk(
	wallet: Maybe<ImmutableXWallet>,
	apis: IApisSdk,
	network: ImxEnv,
): IRaribleInternalSdk {
	const imxEnv = IMX_ENV_CONFIG[network].network
	const sdk = createImxSdk(wallet as any)
	const { burn } = new ImxBurn(sdk, imxEnv)
	const { transfer } = new ImxTransfer(sdk, apis, imxEnv)

	return {
		nft: {
			transfer,
			mint: notImplemented,
			burn,
			generateTokenId: notImplemented,
			deploy: notImplemented(),
			createCollection: notImplemented(),
			preprocessMeta: notImplemented,
		},
		order: {
			fill: notImplemented,
			buy: notImplemented,
			acceptBid: notImplemented,
			sell: notImplemented,
			sellUpdate: notImplemented,
			bid: notImplemented,
			bidUpdate: notImplemented,
			cancel: notImplemented(),
		},
		balances: {
			getBalance: notImplemented,
			convert: notImplemented,
		},
		restriction: {
			canTransfer(): Promise<CanTransferResult> {
				return Promise.resolve({ success: true })
			},
		},
	}
}
