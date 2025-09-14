import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { stockService } from 'src/app/core/services/stockService/stockService';
import { getTrendingCompanies, mapApiDataToStockArray } from 'src/app/core/helpers/stocksCalc';
import { Company, Stock } from 'src/app/core/models/stock.model';
import { BuyCardComponent } from '../buy-card/buy-card.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-top-volume-stocks',
  templateUrl: './top-volume-stocks.component.html',
  styleUrls: ['./top-volume-stocks.component.scss'],
})
export class TopVolumeStocksComponent implements OnInit {
  stocks!: Stock[]
  selectedStock!: Stock



  constructor(private stockService: stockService, private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getStocksList();
  }


  getStocksList() {
    this.stockService.getStocksList().subscribe({
      next: (res) => {
        const withChange = res.map(stock => ({
          ...stock,
          priceChange: Math.round(stock.close - stock.open) //calcualte change
        }));

        // get top 3 by volume
        const topVolume = withChange.sort((a, b) => b.volume - a.volume).slice(0, 3);

        this.stocks = topVolume;
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

  }


}
