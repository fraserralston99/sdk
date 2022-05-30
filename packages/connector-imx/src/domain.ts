import type { ProviderConnectionResult } from "@rarible/connector"
import type { Link } from "@imtbl/imx-sdk"

export interface ImxProviderConnectionResult extends ProviderConnectionResult {
	link: Link
	starkPublicKey: string
	ethNetwork: string
}
