import { CdkStepper } from '@angular/cdk/stepper';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from './../../shared/models/basket';
import { Observable } from 'rxjs';
import { BasketService } from './../../basket/basket.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  basket$: Observable<IBasket>;
  @Input() appStepper: CdkStepper;

  constructor(private basketService: BasketService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  createPaymentIntent() {
    this.basketService.createPaymentIntent()
    .subscribe((response: any) => {
      this.appStepper.next();
    }, error => {
      console.log(error);
    });
  }

}
