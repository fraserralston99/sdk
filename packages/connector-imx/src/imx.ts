import type { Observable } from "rxjs"
import { defer } from "rxjs"
import { first, map, mergeMap, startWith } from "rxjs/operators"
import type { ConnectionState, Maybe } from "@rarible/connector"
import {
	AbstractConnectionProvider,
	cache,
	getStateConnected,
	getStateConnecting,
	getStateDisconnected,
} from "@rarible/connector"
import type { Link } from "@imtbl/imx-sdk"
import type { ImxProviderConnectionResult } from "./domain"

export type ImxConfig = {
	linkApiUrl: string,
	network: string,
}

const PROVIDER_ID = "imx" as const

export class ImxConnectionProvider extends AbstractConnectionProvider<typeof PROVIDER_ID, ImxProviderConnectionResult> {

	private readonly instance: Observable<Link>
	private readonly connection: Observable<ConnectionState<ImxProviderConnectionResult>>
	private address: string
	private starkPublicKey: string

	constructor(
		private readonly config: ImxConfig,
	) {
		super()
		this.instance = cache(() => this._connect())
		this.connection = this.instance.pipe(
			mergeMap((instance) => this.toConnectState(instance)),
			startWith(getStateConnecting({ providerId: PROVIDER_ID })),
		)
		this.address = ""
		this.starkPublicKey = ""
	}

	private toConnectState(link: Link): Observable<ConnectionState<ImxProviderConnectionResult>> {
		const disconnect = async () => {
			this.address = ""
			this.starkPublicKey = ""
			return Promise.resolve()
		}
		return defer(async () => link.setup({})).pipe(
			map(auth => {
				const address = auth.address
				if (!address) {
					return getStateDisconnected()
				}
				return getStateConnected<ImxProviderConnectionResult>({
					connection: {
						link,
						address,
					},
					disconnect,
				})
			}),
		)
	}

	getId(): string {
		return PROVIDER_ID
	}

	getFrom(): string {
		return this.address
	}

	getConnection(): Observable<ConnectionState<ImxProviderConnectionResult>> {
		return this.connection
	}

	private async _connect(): Promise<Link> {
		const { Link: LinkLib } = await import("@imtbl/imx-sdk")
		const link = new LinkLib(this.config.linkApiUrl)
		const {
			address,
			starkPublicKey,
		} = await (link).setup({})
		this.address = address
		this.starkPublicKey = starkPublicKey
		return link
	}

	getOption(): Promise<Maybe<typeof PROVIDER_ID>> {
		return Promise.resolve(PROVIDER_ID)
	}

	isAutoConnected() {
		return Promise.resolve(false)
	}

	async isConnected(): Promise<boolean> {
		const instance = await this.instance.pipe(first()).toPromise()
		return !!instance
	}
}
