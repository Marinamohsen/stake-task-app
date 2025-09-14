import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Stock } from 'src/app/core/models/stock.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements ViewWillEnter {
  stocks!: Stock[];
  TotalHoldings: number = 0;

  constructor() { }

  ionViewWillEnter(): void {
    this.getStocksList();
  }

  getStocksList() {

    const stored = sessionStorage.getItem('holdings');
    if (stored) {
      this.stocks = JSON.parse(stored);
      this.TotalHoldings = 0;
      this.stocks.forEach((stock) => {
        this.TotalHoldings += stock.holdingsAmount ? stock.holdingsAmount : 0;
      });

    }

  }
}
