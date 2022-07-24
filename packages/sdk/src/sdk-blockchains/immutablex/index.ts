import type { IRaribleInternalSdk } from "../../domain"
import { nonImplementedAction, notImplemented } from "../../common/not-implemented"
import { MethodWithAction, MethodWithPrepare } from "../../types/common"

export function createImmutablexSdkBlank(): IRaribleInternalSdk {
	return {
		nft: {
			mint: new MethodWithPrepare(notImplemented, notImplemented),
			burn: new MethodWithPrepare(notImplemented, notImplemented),
			transfer: new MethodWithPrepare(notImplemented, notImplemented),
			generateTokenId: notImplemented,
			deploy: new MethodWithAction(notImplemented, nonImplementedAction),
			createCollection: new MethodWithAction(notImplemented, nonImplementedAction),
			preprocessMeta: notImplemented,
			uploadMeta: notImplemented,
		},
		order: {
			fill: { prepare: notImplemented },
			buy: new MethodWithPrepare(notImplemented, notImplemented),
			acceptBid: new MethodWithPrepare(notImplemented, notImplemented),
			sell: new MethodWithPrepare(notImplemented, notImplemented),
			sellUpdate: new MethodWithPrepare(notImplemented, notImplemented),
			bid: new MethodWithPrepare(notImplemented, notImplemented),
			bidUpdate: new MethodWithPrepare(notImplemented, notImplemented),
			cancel: new MethodWithAction(notImplemented, nonImplementedAction),
		},
		balances: {
			getBalance: notImplemented,
			convert: notImplemented,
			getBiddingBalance: nonImplementedAction,
			depositBiddingBalance: nonImplementedAction,
			withdrawBiddingBalance: nonImplementedAction,
		},
		restriction: {
			canTransfer: notImplemented,
		},
	}
}
