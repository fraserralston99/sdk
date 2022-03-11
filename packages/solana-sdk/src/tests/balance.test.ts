import { SolanaSdk } from "../sdk/sdk"

describe("solana sdk", () => {
	const sdk = SolanaSdk.create({ connection: { cluster: "devnet" } })

	test("Should check account balance", async () => {
		const balance = await sdk.balances.getBalance("6J9aYLQfDWc2QJpXz1M2k1R5AnVGGkqCzYmd3JnVqxB3")
		expect(balance).toBeGreaterThan(0)
	})
})