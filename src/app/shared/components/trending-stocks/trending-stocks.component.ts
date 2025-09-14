import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Stock } from 'src/app/core/models/stock.model';
import { stockService } from 'src/app/core/services/stockService/stockService';
import { BuyCardComponent } from '../buy-card/buy-card.component';


@Component({
  selector: 'app-trending-stocks',
  templateUrl: './trending-stocks.component.html',
  styleUrls: ['./trending-stocks.component.scss'],

})
export class TrendingStocksComponent implements OnInit {
  stocks!: Stock[];
  selectedStock?: Stock;
  @Output() refreshHoldings = new EventEmitter<boolean>();

  constructor(
    private stockService: stockService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getStocksList();
  }

  getStocksList() {
    this.stockService.getStocksList().subscribe({
      next: (res) => {
        const topTrending = res.sort((a, b) => b.change - a.change).slice(0, 4);
        this.stocks = topTrending;
      },
    });
  }
  async openModal(stockItem: Stock) {
    this.selectedStock = {
      ...stockItem,
      amount: stockItem.amount ?? 500,
      shares: stockItem.shares ?? 0,
    };

    const modal = await this.modalCtrl.create({
      component: BuyCardComponent,
      initialBreakpoint: 0.6,
      cssClass: 'floating-modal',
      keyboardClose: false,
      componentProps: {
        selectedStock: this.selectedStock,
      },
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.refreshHoldings.emit(true);
    }
  }
}
