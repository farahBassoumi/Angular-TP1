import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css'
})
export class TtcComponent {
  quantity = signal(1);
  unitPrice = signal(0);
  vat = signal(18);

   discount =computed(() =>{  
     let discount=0;
     if (this.quantity() >= 10 && this.quantity() <= 15) {
       discount = 0.20;
     } else if (this.quantity() > 15) {
       discount = 0.30;
     }
     return(discount * this.quantity() * this.unitPrice());
    });

  // calculateTotalPrice() {
  //   let basePrice = this.unitPrice() * this.quantity();
  //   console.log('lm',basePrice);

  //   let discount = 0;

  //   if (this.quantity() >= 10 && this.quantity() <= 15) {
  //     discount = 0.20;
  //   } else if (this.quantity() > 15) {
  //     discount = 0.30;
  //   }
  //   this.discount=discount * this.quantity() * this.unitPrice();

  //   basePrice = basePrice - this.discount;

  //    ttcPrice = basePrice * (1 + this.vat() / 100);

  //   this.totalPrice.set(ttcPrice);
  // }
  totalPrice = computed(() =>{ 
    let basePrice = this.unitPrice() * this.quantity();

    let discount=0;
    if (this.quantity() >= 10 && this.quantity() <= 15) {
      discount = 0.20;
    } else if (this.quantity() > 15) {
      discount = 0.30;
    }
    return( basePrice * (1 + this.vat() / 100));
  });

  setunitPrice(val:number){
    console.log('unitprice'+val);

    this.unitPrice.set(val);
  }
  setquantity(val:number){
    console.log('quantity'+val);

    this.quantity.set(val);
  }
  setvat(val:number){
    console.log('vat'+val);
    this.vat.set(val);
  }
}
