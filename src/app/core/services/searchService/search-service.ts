import { Injectable } from '@angular/core';
import { Stock } from '../../models/stock.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private historyKey = 'searchHistory'; // key to store search history in localStorage
  private history: Stock[] = []; // in-memory search history

  constructor() {
    // load saved history from localStorage when service is created
    const stored = localStorage.getItem(this.historyKey);
    this.history = stored ? JSON.parse(stored) : [];
  }

  // add a new search result to history
  addSearch(result: Stock) {
    if (!result) return; // ignore if result is null or undefined

    // remove any existing entry with the same symbol
    this.history = this.history.filter((item) => item.symbol !== result.symbol);

    // add new result to the beginning of the history
    this.history.unshift(result);

    // keep only the latest 10 entries
    this.history = this.history.slice(0, 10);

    // save updated history to localStorage
    localStorage.setItem(this.historyKey, JSON.stringify(this.history));
  }

  // get the current search history
  getHistory(): Stock[] {
    return this.history;
  }

  // clear all search history
  clearHistory() {
    this.history = [];
    localStorage.removeItem(this.historyKey);
  }
}
