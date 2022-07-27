import type { Connection, PublicKey } from "@solana/web3.js";
import { SolanaKeypairWallet } from "@rarible/solana-wallet";
import { SolanaSdk } from "../sdk/sdk";
export declare const TEST_AUCTION_HOUSE = "8Qu3azqi31VpgPwVW99AyiBGnLSpookWQiwLMvFn4NFm";
export declare const testWallets: {
    privateKeyString: string;
    privateKeyArray: Uint8Array;
    publicKeyString: string;
}[];
export declare function createSdk(): SolanaSdk;
export declare function getTestWallet(walletIndex?: number): SolanaKeypairWallet;
export declare function genTestWallet(seed?: Uint8Array): SolanaKeypairWallet;
export declare function requestSol(connection: Connection, publicKey: PublicKey, sol?: number): Promise<number>;
export declare function getTokenAccounts(connection: Connection, owner: PublicKey, mint: PublicKey): Promise<Awaited<ReturnType<typeof connection.getTokenAccountsByOwner>>>;
export declare function mintToken({ sdk, wallet, tokensAmount, }: {
    sdk: SolanaSdk;
    wallet: SolanaKeypairWallet;
    tokensAmount?: number;
}): Promise<{
    mintTx: import("..").TransactionResult;
    mint: PublicKey;
}>;
export declare function retry<T>(num: number, del: number, thunk: () => Promise<T>): Promise<T>;
export declare function delay(num: number): Promise<void>;
