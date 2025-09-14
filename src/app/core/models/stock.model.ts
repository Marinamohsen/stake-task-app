export interface Stock {
  [x: string]: any;
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  shares?: number;
  type: 'etf' | 'stock' | 'otc';
  logo: string;
  volume: number;
  marketCap: number | null;
  amount?: number;
  open: number;
  close: number;
  holdingShares?: number;
  holdingsAmount?: number;
  priceChange: number;
}

export interface Company {
  id: number;
  companyName: string;
  price: number;
  symbol: string;
  shares?: number;
  volume: number;
  close: number;
  open: number;
}

export interface selectedStock {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  shares: number;
  amount: number;
}

export interface Price {
  open: number;
  close: number;
  high: number;
  low: number;
}
