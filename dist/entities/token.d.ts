import { ChainId } from '../constants';
import { Currency } from './currency';
export interface SerializedToken {
    chainId: number;
    address: string;
    decimals: number;
    symbol?: string;
    name?: string;
    projectLink?: string;
}
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export declare class Token extends Currency {
    readonly chainId: ChainId;
    readonly address: string;
    readonly projectLink?: string;
    readonly isNative: false;
    readonly isToken: true;
    constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string, projectLink?: string);
    /**
     * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
     * @param other other token to compare
     */
    equals(other: Token): boolean;
    /**
     * Returns true if the address of this token sorts before the address of the other token
     * @param other other token to compare
     * @throws if the tokens have the same address
     * @throws if the tokens are on different chains
     */
    sortsBefore(other: Token): boolean;
    /**
     * Return this token, which does not need to be wrapped
     */
    get wrapped(): Token;
    get serialize(): SerializedToken;
}
/**
 * Compares two currencies for equality
 */
export declare function currencyEquals(currencyA: Currency, currencyB: Currency): boolean;
export declare const WETH: {
    7000: Token;
    8332: Token;
    18332: Token;
    7001: Token;
    5: Token;
    80001: Token;
    137: Token;
    56: Token;
    97: Token;
};
export declare const NATIVE: {
    7000: {
        name: string;
        symbol: string;
        decimals: number;
    };
    8332: {
        name: string;
        symbol: string;
        decimals: number;
    };
    18332: {
        name: string;
        symbol: string;
        decimals: number;
    };
    7001: {
        name: string;
        symbol: string;
        decimals: number;
    };
    5: {
        name: string;
        symbol: string;
        decimals: number;
    };
    80001: {
        name: string;
        symbol: string;
        decimals: number;
    };
    137: {
        name: string;
        symbol: string;
        decimals: number;
    };
    97: {
        name: string;
        symbol: string;
        decimals: number;
    };
    56: {
        name: string;
        symbol: string;
        decimals: number;
    };
};
