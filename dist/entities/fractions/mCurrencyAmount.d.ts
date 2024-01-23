import JSBI from 'jsbi';
import { mCurrency } from '../mCurrency';
import { Token } from '../token';
import { BigintIsh, Rounding } from '../../constants';
import { Fraction } from './fraction';
export declare class MCurrencyAmount<T extends mCurrency> extends Fraction {
    readonly currency: T;
    /**
     * Returns a new currency amount instance from the unitless amount of token, i.e. the raw amount
     * @param currency the currency in the amount
     * @param rawAmount the raw token or ether amount
     */
    static fromRawAmount<T extends mCurrency>(currency: T, rawAmount: BigintIsh): MCurrencyAmount<T>;
    static fromFractionalAmount<T extends mCurrency>(currency: T, numerator: BigintIsh): MCurrencyAmount<T>;
    protected constructor(currency: T, amount: BigintIsh);
    get raw(): JSBI;
    add(other: MCurrencyAmount<T>): MCurrencyAmount<T>;
    subtract(other: MCurrencyAmount<T>): MCurrencyAmount<T>;
    toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string;
    toExact(format?: object): string;
    get wrapped(): MCurrencyAmount<Token>;
}
