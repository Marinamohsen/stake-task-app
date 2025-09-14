import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { TopVolumeStocksComponent } from 'src/app/shared/components/top-volume-stocks/top-volume-stocks.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    SearchPipe,
    SharedModule,
  ],
  declarations: [SearchPage, TopVolumeStocksComponent],
})
export class SearchPageModule {}
