import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HoldingsStocksComponent } from 'src/app/shared/components/holdings-stocks/holdings-stocks.component';
import { TrendingStocksComponent } from 'src/app/shared/components/trending-stocks/trending-stocks.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  declarations: [HomePage, HoldingsStocksComponent, TrendingStocksComponent],
})
export class HomePageModule { }
