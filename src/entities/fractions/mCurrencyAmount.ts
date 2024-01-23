import { currencyEquals } from '../token'
import invariant from 'tiny-invariant'
import JSBI from 'jsbi'
import _Big from 'big.js'
import toFormat from 'toformat'
import { mCurrency } from '../mCurrency'
import { Token } from '../token'
import { BigintIsh, Rounding, TEN, SolidityType } from '../../constants'
import { parseBigintIsh, validateSolidityTypeInstance } from '../../utils'
import { Fraction } from './fraction'

const Big = toFormat(_Big)

export class MCurrencyAmount<T extends mCurrency> extends Fraction {
  public readonly currency: T

  /**
   * Returns a new currency amount instance from the unitless amount of token, i.e. the raw amount
   * @param currency the currency in the amount
   * @param rawAmount the raw token or ether amount
   */
  public static fromRawAmount<T extends mCurrency>(currency: T, rawAmount: BigintIsh): MCurrencyAmount<T> {
    return new MCurrencyAmount(currency, rawAmount)
  }

  public static fromFractionalAmount<T extends mCurrency>(
    currency: T,
    numerator: BigintIsh,
  ): MCurrencyAmount<T> {
    return new MCurrencyAmount(currency, numerator)
  }

  // amount _must_ be raw, i.e. in the native representation
  protected constructor(currency: T, amount: BigintIsh) {
    const parsedAmount = parseBigintIsh(amount)
    validateSolidityTypeInstance(parsedAmount, SolidityType.uint256)

    super(parsedAmount, JSBI.exponentiate(TEN, JSBI.BigInt(currency.decimals)))
    this.currency = currency
  }

  public get raw(): JSBI {
    return this.numerator
  }

  public add(other: MCurrencyAmount<T>): MCurrencyAmount<T> {
    invariant(currencyEquals(this.currency, other.currency), 'TOKEN')
    return new MCurrencyAmount(this.currency, JSBI.add(this.raw, other.raw))
  }

  public subtract(other: MCurrencyAmount<T>): MCurrencyAmount<T> {
    invariant(currencyEquals(this.currency, other.currency), 'TOKEN')
    return new MCurrencyAmount(this.currency, JSBI.subtract(this.raw, other.raw))
  }

  public toSignificant(
    significantDigits: number = 6,
    format?: object,
    rounding: Rounding = Rounding.ROUND_DOWN
  ): string {
    return super.toSignificant(significantDigits, format, rounding)
  }

  public toFixed(
    decimalPlaces: number = this.currency.decimals,
    format?: object,
    rounding: Rounding = Rounding.ROUND_DOWN
  ): string {
    invariant(decimalPlaces <= this.currency.decimals, 'DECIMALS')
    return super.toFixed(decimalPlaces, format, rounding)
  }

  public toExact(format: object = { groupSeparator: '' }): string {
    Big.DP = this.currency.decimals
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(format)
  }

  public get wrapped(): MCurrencyAmount<Token> {
    if (this.currency.isToken) return this as MCurrencyAmount<Token>
    return MCurrencyAmount.fromFractionalAmount(this.currency.wrapped, this.numerator)
  }
}
