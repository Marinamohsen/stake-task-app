import { Injectable } from '@angular/core';
import { Stock } from '../../models/stock.model';

@Injectable({
  providedIn: 'root',
})
export class HoldingsService {
  private holdingsMap = new Map(); // map to store holdings by stock symbol
  private holdings: Stock[] = [];

  // add or update a holding when investing in a stock
  invest(stock: Stock, shares: number, amount: number): void {
    const existing = this.holdingsMap.get(stock.symbol); // check if stock already exists in holdings

    // calculate updated shares and amount
    const addedShares = existing
      ? {
        holdingShares: existing.holdingShares + shares,
        holdingsAmount: existing.holdingsAmount + amount,
      }
      : {
        holdingShares: shares,
        holdingsAmount: amount,
      };


    this.holdingsMap.set(stock.symbol, { ...stock, ...addedShares });

    this.holdings = Array.from(this.holdingsMap.values());

    // save updated holdings to session storage
    sessionStorage.setItem('holdings', JSON.stringify(this.holdings));
  }
}
