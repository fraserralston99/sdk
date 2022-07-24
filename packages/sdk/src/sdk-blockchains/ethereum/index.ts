import type { EthereumWallet } from "@rarible/sdk-wallet"
import { createRaribleSdk } from "@rarible/protocol-ethereum-sdk"
import type { ConfigurationParameters } from "@rarible/ethereum-api-client"
import type { EthereumNetwork, EthereumNetworkConfig } from "@rarible/protocol-ethereum-sdk/build/types"
import type { Maybe } from "@rarible/types/build/maybe"
import { Blockchain } from "@rarible/api-client"
import type { IApisSdk, IRaribleInternalSdk, LogsLevel } from "../../domain"
import type { CanTransferResult } from "../../types/nft/restriction/domain"
import { Middlewarer } from "../../common/middleware/middleware"
import { MetaUploader } from "../union/meta/upload-meta"
import { MethodWithAction, MethodWithPrepare } from "../../types/common"
import type { IMint } from "../../types/nft/mint"
import { EthereumMint } from "./mint"
import { EthereumSell } from "./sell"
import { EthereumFill } from "./fill"
import { EthereumBurn } from "./burn"
import { EthereumTransfer } from "./transfer"
import { EthereumBid } from "./bid"
import { EthereumCancel } from "./cancel"
import { EthereumBalance } from "./balance"
import { EthereumTokenId } from "./token-id"
import { EthereumCreateCollection } from "./create-collection"
import { EthereumCryptopunk } from "./cryptopunk"

export function createEthereumSdk(
	wallet: Maybe<EthereumWallet>,
	apis: IApisSdk,
	network: EthereumNetwork,
	config: {
		params?: ConfigurationParameters,
		logs?: LogsLevel
		ethereum?: EthereumNetworkConfig,
		polygon?: EthereumNetworkConfig,
	}
): IRaribleInternalSdk {
	const sdk = createRaribleSdk(wallet?.ethereum, network, {
		apiClientParams: config.params,
		logs: config.logs,
		ethereum: config.ethereum,
		polygon: config.polygon,
	})
	const sellService = new EthereumSell(sdk, network)
	const balanceService = new EthereumBalance(sdk, apis, network)
	const bidService = new EthereumBid(sdk, wallet, balanceService, network)
	const mintService = new EthereumMint(sdk, apis, network)
	const fillService = new EthereumFill(sdk, wallet, network)
	const { createCollection, createCollectionSimplified } = new EthereumCreateCollection(sdk, network)
	const cryptopunkService = new EthereumCryptopunk(sdk, network)
	const transferService = new EthereumTransfer(sdk, network)
	const burnService = new EthereumBurn(sdk, network)
	const cancelService = new EthereumCancel(sdk, network)
	const preprocessMeta = Middlewarer.skipMiddleware(mintService.preprocessMeta)
	const metaUploader = new MetaUploader(Blockchain.ETHEREUM, preprocessMeta)

	return {
		nft: {
			mint: new MethodWithPrepare(mintService.mintBasic, mintService.prepare) as IMint,
			burn: new MethodWithPrepare(burnService.burnBasic, burnService.burn),
			transfer: new MethodWithPrepare(transferService.transferBasic, transferService.transfer),
			generateTokenId: new EthereumTokenId(sdk).generateTokenId,
			deploy: new MethodWithAction(createCollectionSimplified, createCollection),
			createCollection: new MethodWithAction(createCollectionSimplified, createCollection),
			preprocessMeta,
			uploadMeta: metaUploader.uploadMeta,
		},
		order: {
			fill: { prepare: fillService.fill },
			buy: new MethodWithPrepare(fillService.buyBasic, fillService.fill),
			acceptBid: new MethodWithPrepare(fillService.acceptBidBasic, fillService.fill),
			sell: new MethodWithPrepare(sellService.sellBasic, sellService.sell),
			sellUpdate: new MethodWithPrepare(sellService.sellUpdateBasic, sellService.update),
			bid: new MethodWithPrepare(bidService.bidBasic, bidService.bid),
			bidUpdate: new MethodWithPrepare(bidService.bidUpdateBasic, bidService.update),
			cancel: new MethodWithAction(cancelService.cancelBasic, cancelService.cancel),
		},
		balances: {
			getBalance: balanceService.getBalance,
			convert: balanceService.convert,
			getBiddingBalance: balanceService.getBiddingBalance,
			depositBiddingBalance: balanceService.depositBiddingBalance,
			withdrawBiddingBalance: balanceService.withdrawBiddingBalance,
		},
		restriction: {
			canTransfer(): Promise<CanTransferResult> {
				return Promise.resolve({ success: true })
			},
		},
		ethereum: {
			wrapCryptoPunk: cryptopunkService.wrap,
			unwrapCryptoPunk: cryptopunkService.unwrap,
		},
	}
}
