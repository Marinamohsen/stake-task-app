import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BuyCardComponent } from './components/buy-card/buy-card.component';
import { AbbreviateNumberPipe } from './pipes/abbreviate-number.pipe'

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [BuyCardComponent, AbbreviateNumberPipe],

  exports: [BuyCardComponent, AbbreviateNumberPipe],
})
export class SharedModule { }
