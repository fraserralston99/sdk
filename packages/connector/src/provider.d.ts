import type { Observable } from "rxjs";
import type { Maybe } from "./common/utils";
import type { ConnectionState } from "./connection-state";
/**
 * Provider of the connection.
 * Examples: injected web3, fortmatic, temple tezos wallet, blocto.
 */
export declare type ConnectionProvider<Option, Connection> = {
    /**
     * Returns unique identifier of the connection provider. It's used to save/load last connected provider
     */
    getId(): string;
    /**
     * Checks if this provider is auto-connected. For example, injected mobile providers are connected by default
     */
    isAutoConnected(): Promise<boolean>;
    /**
     * List of available connection options: injected web3 can find out what option is available (Metamask, Trust etc.)
     */
    getOption(): Promise<Maybe<Option>>;
    /**
     * Current connection state. If value is undefined, then provider is considered disconnected.
     */
    getConnection(): Observable<ConnectionState<Connection>>;
    /**
     * Checks if provider can establish connection without asking user permission (if session is not expired)
     */
    isConnected(): Promise<boolean>;
};
export declare abstract class AbstractConnectionProvider<O, C> implements ConnectionProvider<O, C> {
    abstract getId(): string;
    abstract getConnection(): Observable<ConnectionState<C>>;
    abstract getOption(): Promise<Maybe<O>>;
    abstract isAutoConnected(): Promise<boolean>;
    abstract isConnected(): Promise<boolean>;
    map<NewConnection>(mapper: (c: C) => NewConnection | PromiseLike<NewConnection>): ConnectionProvider<O, NewConnection>;
    mapOption<NewOption>(mapper: (o: O) => NewOption): ConnectionProvider<NewOption, C>;
}
export declare class MappedOptionConnectionProvider<O, C, NewO> extends AbstractConnectionProvider<NewO, C> {
    private readonly source;
    private readonly mapper;
    constructor(source: ConnectionProvider<O, C>, mapper: (from: O) => NewO);
    getId(): string;
    getConnection(): Observable<ConnectionState<C>>;
    isAutoConnected(): Promise<boolean>;
    getOption(): Promise<NewO | undefined>;
    isConnected(): Promise<boolean>;
}
export declare class MappedConnectionProvider<O, Connection, NewConnection> extends AbstractConnectionProvider<O, NewConnection> {
    private readonly source;
    private readonly mapper;
    constructor(source: ConnectionProvider<O, Connection>, mapper: (from: Connection) => NewConnection | PromiseLike<NewConnection>);
    getId(): string;
    getConnection(): Observable<ConnectionState<NewConnection>>;
    isAutoConnected(): Promise<boolean>;
    getOption(): Promise<Maybe<O>>;
    isConnected(): Promise<boolean>;
}
