import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [FormsModule,CurrencyPipe],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css'
})
export class TtcComponent implements OnInit {
  quantity = 1;
  price = 0;
  vat = 18;
  discount = 0;
  totalTTC = 0;

  ngOnInit() {
    this.calculateTTC();
  }

  onQuantityChange(event: Event) {
    this.quantity = +(event.target as HTMLInputElement).value;
    this.calculateTTC();
  }

  onPriceChange(event: Event) {
    this.price = +(event.target as HTMLInputElement).value;
    this.calculateTTC();
  }

  onVatChange(event: Event) {
    +(event.target as HTMLInputElement).value;
    this.calculateTTC();
  }

  calculateTTC() {
    const priceHT = this.price * this.quantity;
    let discount = 0;

    if (this.quantity >= 10 && this.quantity <= 15) {
      discount = 0.2;
    } else if (this.quantity > 15) {
      discount = 0.3;
    }

    const priceHTDiscounted = priceHT - (priceHT * discount);
    const vatAmount = priceHTDiscounted * (this.vat / 100);
    this.totalTTC = priceHTDiscounted + vatAmount;
    this.discount = priceHT * discount;
  }
}