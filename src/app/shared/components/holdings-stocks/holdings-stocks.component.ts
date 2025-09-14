import { Component, Input, OnInit } from '@angular/core';
import { Stock } from 'src/app/core/models/stock.model';
import { BuyCardComponent } from '../buy-card/buy-card.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-holdings-stocks',
  templateUrl: './holdings-stocks.component.html',
  styleUrls: ['./holdings-stocks.component.scss'],
})
export class HoldingsStocksComponent implements OnInit {
  @Input() stocks: Stock[] = [];
  selectedStock?: Stock;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

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
  }
}
