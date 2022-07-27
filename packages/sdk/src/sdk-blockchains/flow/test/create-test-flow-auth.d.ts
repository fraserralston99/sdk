import type { Fcl } from "@rarible/fcl-types";
export declare function createTestFlowAuth(fcl: Fcl): {
    authUser1: (account: any) => Promise<{
        tempId: string;
        addr: string;
        keyId: number;
        signingFunction: (signable: {
            message: string;
        }) => {
            addr: string;
            keyId: number;
            signature: string;
        };
    }>;
    authUser2: (account: any) => Promise<{
        tempId: string;
        addr: string;
        keyId: number;
        signingFunction: (signable: {
            message: string;
        }) => {
            addr: string;
            keyId: number;
            signature: string;
        };
    }>;
};
