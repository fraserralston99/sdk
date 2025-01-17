import * as web3 from "@solana/web3.js";
import type { IWalletSigner } from "../domain";
import type { DisplayEncoding } from "../domain";
/**
 * Abstraction over solana web3.Keypair
 */
export declare class SolanaKeypairWallet implements IWalletSigner {
    private _keyPair;
    private constructor();
    get keyPair(): web3.Keypair;
    get publicKey(): web3.PublicKey;
    signTransaction(tx: web3.Transaction): Promise<web3.Transaction>;
    signAllTransactions(txs: web3.Transaction[]): Promise<web3.Transaction[]>;
    signMessage(message: Uint8Array | string, display?: DisplayEncoding): Promise<Uint8Array>;
    /**
     * Instantiate new SolanaWallet with provided keypair or from secret key
     * @param keyPair
     */
    static createFrom(keyPair: web3.Keypair | Uint8Array | string): SolanaKeypairWallet;
    /**
     * Instantiate new SolanaWallet with new generated keypair
     */
    static generate(seed?: Uint8Array): SolanaKeypairWallet;
}
