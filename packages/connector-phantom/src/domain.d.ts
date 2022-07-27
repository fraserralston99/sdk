import type { Transaction, PublicKey } from "@solana/web3.js";
declare type DisplayEncoding = "utf8" | "hex";
declare type PhantomEvent = "disconnect" | "connect" | "accountChanged";
declare type PhantomRequestMethod = "connect" | "disconnect" | "signTransaction" | "signAllTransactions" | "signMessage";
export interface ConnectOpts {
    onlyIfTrusted: boolean;
}
export interface PhantomProvider {
    publicKey: PublicKey | null;
    isConnected: boolean | null;
    signTransaction: (transaction: Transaction) => Promise<Transaction>;
    signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
    signMessage: (message: Uint8Array | string, display?: DisplayEncoding) => Promise<any>;
    connect: (opts?: Partial<ConnectOpts>) => Promise<{
        publicKey: PublicKey;
    }>;
    disconnect: () => Promise<void>;
    on: (event: PhantomEvent, handler: (args: any) => void) => void;
    removeListener: (event: PhantomEvent, handler: (args: any) => void) => void;
    request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}
export {};
