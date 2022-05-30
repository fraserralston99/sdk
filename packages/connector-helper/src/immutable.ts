import type { AbstractConnectionProvider, ConnectionProvider } from "@rarible/connector"
import { ImmutableXWallet } from "@rarible/sdk-wallet"
import type { ImxProviderConnectionResult } from "@rarible/connector-imx"
import type { IWalletAndAddress } from "./wallet-connection"

export function mapImmutableWallet<O>(
	provider: AbstractConnectionProvider<O, ImxProviderConnectionResult>,
): ConnectionProvider<O, IWalletAndAddress> {
	return provider.map(state => ({
		wallet: new ImmutableXWallet(state.link, state.address),
		address: state.address,
		blockchain: "IMMUTABLE",
	}))
}
