import {
  Component,
  OnInit
} from '@angular/core';
import { SearchService } from 'src/app/core/services/searchService/search-service';
import { stockService } from 'src/app/core/services/stockService/stockService';
import { Stock } from 'src/app/core/models/stock.model';
import { ModalController } from '@ionic/angular';
import { BuyCardComponent } from 'src/app/shared/components/buy-card/buy-card.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchTerm = ''; // current text in search bar
  searchHistory: Stock[] = []; // list of previous searches
  Stocks: Stock[] = []; // all stocks loaded from service
  filteredStocks?: Stock[] = []; // stocks matching the current search term
  selectedStock?: Stock; // stock selected for buying in modal
  isFocused = false; // whether search input is focused

  constructor(
    private searchService: SearchService,
    private stockService: stockService,
    private modalCtrl: ModalController
  ) {
    // load search history from service 
    this.searchHistory = this.searchService.getHistory();
  }

  ngOnInit() {
    // fetch stock list 
    this.stockService.getStocksList().subscribe({
      next: (res) => {
        this.Stocks = res;
      },
    });
  }

  // open the buy modal for a selected stock
  async openModal(stockItem: Stock) {
    // save the selected stock to search history
    this.searchService.addSearch(stockItem);


    this.selectedStock = {
      ...stockItem,
      amount: stockItem.amount ?? 500,
      shares: stockItem.shares ?? 0,
    };

    // create and present the modal
    const modal = await this.modalCtrl.create({
      component: BuyCardComponent,
      initialBreakpoint: 0.6,
      cssClass: 'floating-modal',
      keyboardClose: false,
      componentProps: {
        selectedStock: this.selectedStock, // pass selected stock to modal
      },
    });
    await modal.present();

    // handle data returned when modal is dismissed
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // clear search after confirming purchase
      this.searchTerm = '';
      this.filteredStocks = [];
      this.onCancelSearch();
    }

    // update search history if input is focused
    if (this.isFocused) {
      this.searchHistory = this.searchService.getHistory();
    }
  }

  // filter stocks based on current search term
  onSearch() {
    if (this.searchTerm) {
      const lowerSearch = this.searchTerm.toLowerCase();
      this.filteredStocks = this.Stocks.filter((s) =>
        s.companyName.toLowerCase().includes(lowerSearch)
      );
    } else {
      this.filteredStocks = []; // reset if no search term
    }
  }

  // cancel search and reset state
  onCancelSearch() {
    this.filteredStocks = [];
    this.searchTerm = '';
    this.isFocused = false;
  }
}
