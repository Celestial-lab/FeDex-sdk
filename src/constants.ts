import JSBI from 'jsbi'
import addresses from './addresses.json'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 534352,
  TESTNET = 7001,
  GÖRLI = 5,
  MUMBAI = 80001,
  POLYGON = 137,
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
  BTC_MAINNET = 0,
  BTC_TESTNET = 18332,
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export const DEFAULT_CHAIN_ID = ChainId.TESTNET

export const FACTORY_ADDRESS = addresses[DEFAULT_CHAIN_ID].SwapFactory

export const INIT_CODE_HASH = addresses[DEFAULT_CHAIN_ID].Factory_Init_Code_Hash

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const FEES_NUMERATOR = JSBI.BigInt(9975)
export const FEES_DENOMINATOR = JSBI.BigInt(10000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
