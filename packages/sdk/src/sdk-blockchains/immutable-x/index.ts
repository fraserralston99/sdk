import type { Maybe } from "@rarible/types/build/maybe"
import type { RaribleImxEnv } from "@rarible/immutable-sdk/build/config/domain"
import type { ImmutableXWallet } from "@rarible/sdk-wallet/src"
import { createImxSdk } from "@rarible/immutable-sdk"
import type { IApisSdk, IRaribleInternalSdk } from "../../domain"
import type { CanTransferResult } from "../../types/nft/restriction/domain"
import { notImplemented } from "../../common/not-implemented"

export function createImmutableXSdk(
	wallet: Maybe<ImmutableXWallet>,
	apis: IApisSdk,
	network: RaribleImxEnv,
): IRaribleInternalSdk {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const sdk = createImxSdk(wallet?.provider as any, network)

	return {
		nft: {
			transfer: notImplemented,
			mint: notImplemented,
			burn: notImplemented,
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
