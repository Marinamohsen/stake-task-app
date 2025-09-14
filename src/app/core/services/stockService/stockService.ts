import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Stock, Price } from '../../models/stock.model';
import { mapApiDataToStockArray } from '../../helpers/stocksCalc';

@Injectable({
  providedIn: 'root',
})
export class stockService {
  constructor(private http: HttpClient) { }

  // fetch stock data from the local JSON file
  getPrices(): Observable<Price[]> {
    return this.http.get<Price[]>('assets/data/pricing.json');
  }


  getDetails(): Observable<Price[]> {
    return this.http.get<Price[]>('assets/data/details.json');
  }

  // combine prices and details to create an array of Stock objects
  getStocksList(): Observable<Stock[]> {
    return forkJoin([this.getPrices(), this.getDetails()]).pipe(
      map(([pricing, details]) => mapApiDataToStockArray(pricing, details)) // map API data 
    );
  }
}
