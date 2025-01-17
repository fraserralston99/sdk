import BigNumber from "bignumber.js";
import type { Commitment, Connection } from "@solana/web3.js";
import type { PublicKey } from "@solana/web3.js";
import type { DebugLogger } from "../../logger/debug-logger";
export interface ISolanaBalancesSdk {
    getBalance(publicKey: PublicKey, options?: {
        commitment?: Commitment;
    }): Promise<BigNumber>;
    getTokenBalance(owner: PublicKey, mint: PublicKey): Promise<BigNumber>;
}
export declare class SolanaBalancesSdk implements ISolanaBalancesSdk {
    private readonly connection;
    private readonly logger;
    constructor(connection: Connection, logger: DebugLogger);
    getBalance(publicKey: PublicKey, options?: {
        commitment?: Commitment;
    }): Promise<BigNumber>;
    getTokenBalance(owner: PublicKey, mint: PublicKey, options?: {
        commitment?: Commitment;
    }): Promise<BigNumber>;
}
