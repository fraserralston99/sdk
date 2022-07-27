import type { Observable } from "rxjs";
import type { ConnectionProvider } from "./provider";
import type { ConnectionState } from "./connection-state";
export declare type ProviderOption<Option, Connection> = {
    provider: ConnectionProvider<Option, Connection>;
    option: Option;
};
export interface IConnector<Option, Connection> {
    /**
     * Get all available connection options (Metamask, Fortmatic, Blocto, Temple etc)
     */
    getOptions(): Promise<ProviderOption<Option, Connection>[]>;
    /**
     * Connect using specific option
     */
    connect(option: ProviderOption<Option, Connection>): void;
    /**
     * Subscribe to this observable to get current connection state
     */
    connection: Observable<ConnectionState<Connection>>;
}
/**
 * This component is used to save/load last connected provider
 */
export interface IConnectorStateProvider {
    getValue(): Promise<string | undefined>;
    setValue(value: string | undefined): Promise<void>;
}
export declare class DefaultConnectionStateProvider implements IConnectorStateProvider {
    private readonly key;
    constructor(key: string);
    getValue(): Promise<string | undefined>;
    setValue(value: string | undefined): Promise<void>;
}
export declare class Connector<Option, Connection> implements IConnector<Option, Connection> {
    private readonly providers;
    private readonly stateProvider?;
    static pageUnloading: boolean | undefined;
    private readonly provider;
    connection: Observable<ConnectionState<Connection>>;
    constructor(providers: ConnectionProvider<Option, Connection>[], stateProvider?: IConnectorStateProvider | undefined);
    /**
     * Add flag when page unload to avoid disconnect events from connectors
     */
    static initPageUnloadProtection(): void;
    /**
     * Push {@link provider} to connectors list
     * @param provider connection provider
     */
    add<NewOption, NewConnection>(provider: ConnectionProvider<Option | NewOption, Connection | NewConnection>): Connector<Option | NewOption, Connection | NewConnection>;
    /**
     * Create connector instance and push {@link provider} to connectors list
     * @param provider connection provider
     * @param stateProvider provider used to save/load last connected provider
     */
    static create<Option, Connection>(provider: ConnectionProvider<Option, Connection> | ConnectionProvider<Option, Connection>[], stateProvider?: IConnectorStateProvider): Connector<Option, Connection>;
    private checkAutoConnect;
    getOptions(): Promise<ProviderOption<Option, Connection>[]>;
    connect(option: ProviderOption<Option, Connection>): Promise<void>;
}
