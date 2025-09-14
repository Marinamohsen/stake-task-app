import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  GestureController,
  IonModal,
  IonToast,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Stock } from 'src/app/core/models/stock.model';
import { HoldingsService } from 'src/app/core/services/investService/invest-service';

@Component({
  selector: 'app-buy-card',
  templateUrl: './buy-card.component.html',
  styleUrls: ['./buy-card.component.scss'],
})
export class BuyCardComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('thumb', { read: ElementRef }) thumb!: ElementRef;
  @ViewChild('toast', { static: true }) toast!: IonToast;

  @Input() selectedStock!: Stock;

  investmentForm!: FormGroup;

  constructor(
    private investService: HoldingsService,
    private gestureCtrl: GestureController,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    setTimeout(() => this.initSwipe(), 0);
  }

  initForm() {
    this.investmentForm = this.fb.group({
      price: this.selectedStock.price,
      amount: [0, [Validators.min(0)]],
      shares: [0, [Validators.min(0)]],
    });
    this.setupValueChanges();
  }
  setupValueChanges() {
    const price = this.selectedStock.price;

    this.investmentForm.get('shares')?.valueChanges.subscribe((shares) => {
      const amount = shares * price;
      this.investmentForm.get('amount')?.setValue(amount, { emitEvent: false });
    });

    this.investmentForm.get('amount')?.valueChanges.subscribe((amount) => {
      const shares = amount / price;
      this.investmentForm.get('shares')?.setValue(shares, { emitEvent: false });
    });
  }

  initSwipe() {
    if (!this.thumb) return;

    const thumbEl = this.thumb.nativeElement;
    const hostEl = thumbEl.closest('.swipe-btn') as HTMLElement;

    const gesture = this.gestureCtrl.create({
      el: thumbEl,
      gestureName: 'swipe-btn',
      threshold: 0,
      onMove: (ev) => {
        const maxX = hostEl.offsetWidth - thumbEl.offsetWidth;
        let newX = ev.deltaX;
        if (newX < 0) newX = 0;
        if (newX > maxX) newX = maxX;
        thumbEl.style.left = `${newX}px`;
      },
      onEnd: (ev) => {
        const maxX = hostEl.offsetWidth - thumbEl.offsetWidth;

        thumbEl.style.transition = 'left 0.3s ease';
        thumbEl.style.left = `${maxX}px`;
        gesture.enable(false);

        setTimeout(() => {
          this.confirm();
          thumbEl.style.transition = '';
        }, 300);
      },
    });
    gesture.enable(true);
  }

  get canSwipe(): boolean {
    const amount = this.investmentForm.get('amount')?.value || 0;
    const shares = this.investmentForm.get('shares')?.value || 0;
    return amount > 0 || shares > 0;
  }

  confirm() {
    if (this.selectedStock) {
      const amount = this.investmentForm.get('amount')?.value;
      const shares = this.investmentForm.get('shares')?.value;
      this.investService.invest(this.selectedStock, shares, amount);
    }
    this.showToast();
    this.modalCtrl.dismiss({ stock: this.selectedStock }, 'confirm');
  }

  async showToast() {
    this.toast.present();
  }
}
