import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'
import addresses from '../addresses.json'

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
  projectLink?: string
}

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string
  public readonly projectLink?: string

  public readonly isNative: false = false as const

  public readonly isToken: true = true as const

  public constructor(
    chainId: ChainId,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
    projectLink?: string
  ) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
    this.projectLink = projectLink
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }

  /**
   * Return this token, which does not need to be wrapped
   */
    public get wrapped(): Token {
      return this
    }
  
    public get serialize(): SerializedToken {
      return {
        address: this.address,
        chainId: this.chainId,
        decimals: this.decimals,
        symbol: this.symbol,
        name: this.name,
        projectLink: this.projectLink,
      }
    }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    addresses[ChainId.MAINNET].WETH,
    18,
    'WETH',
    'Wrapped ETH',
    'https://blockscout.scroll.io/'
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET,
    addresses[ChainId.TESTNET].WETH,
    18,
    'WZETA',
    'Wrapped ZETA',
    'https://zetachain-athens-3.blockscout.com/'
  ),
  [ChainId.GÖRLI]: new Token(
    ChainId.GÖRLI,
    addresses[ChainId.GÖRLI].WETH,
    18,
    'WETH',
    'Wrapped ETH',
    'https://goerli.etherscan.io/'
  ),
  [ChainId.MUMBAI]: new Token(
    ChainId.MUMBAI,
    addresses[ChainId.MUMBAI].WETH,
    18,
    'WMATIC',
    'Wrapped MATIC',
    'https://mumbai.polygonscan.com/'
  ),
  [ChainId.BSC]: new Token(
    ChainId.BSC,
    addresses[ChainId.BSC].WETH,
    18,
    'WBNB',
    'Wrapped BNB',
    'https://testnet.bscscan.com/'
  )
}

export const NATIVE = {
  [ChainId.MAINNET]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.TESTNET]: {
    name: 'Zeta',
    symbol: 'ZETA',
    decimals: 18,
  },
  [ChainId.GÖRLI]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.MUMBAI]: {
    name: 'Mumbai Matic',
    symbol: 'Matic',
    decimals: 18,
  },
  [ChainId.BSC]: {
    name: 'Binance Chain Native Token Testnet',
    symbol: 'BNB',
    decimals: 18,
  }
}
