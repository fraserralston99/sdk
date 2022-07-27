/// <reference types="bn.js" />
/// <reference types="node" />
import type BigNumber from "bignumber.js";
import { BN } from "@project-serum/anchor";
import type { BigNumberValue } from "@rarible/utils";
export declare function bnToBuffer(value: BN, endian: BN.Endianness, length: number): Buffer;
export declare function bigNumToBuffer(value: BigNumber, endian: BN.Endianness, length: number): Buffer;
export declare function bigNumToBn(value: BigNumberValue): BN;
/**
 * align BN internal representation to minimum len size
 * @param value
 * @param len
 */
export declare function alignBn(value: BN, len: number): BN;
