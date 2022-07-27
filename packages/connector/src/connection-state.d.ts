export declare type StateConnected<T> = {
    status: "connected";
    connection: T;
    disconnect?: () => Promise<void>;
};
export declare type StateConnecting = {
    status: "connecting";
    providerId: string;
};
export declare type StateInitializing = {
    status: "initializing";
};
export declare type StateDisconnected = {
    status: "disconnected";
    error?: any;
};
export declare const STATE_INITIALIZING: StateInitializing;
export declare function getStateConnected<T>(params: Omit<StateConnected<T>, "status">): StateConnected<T>;
export declare function getStateConnecting(params: Omit<StateConnecting, "status">): StateConnecting;
export declare function getStateDisconnected(params?: Omit<StateDisconnected, "status">): StateDisconnected;
export declare type ConnectionState<T> = StateConnected<T> | StateConnecting | StateInitializing | StateDisconnected;
