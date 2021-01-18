import { ToastrService } from 'ngx-toastr';
import { OrdersService } from './orders.service';
import { IOrder } from './../shared/models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[];
  constructor(private ordersService: OrdersService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders() {
    this.ordersService.getOrderHistory()
    .subscribe(orders => {
      this.orders = orders;
    }, error => {
      this.toastr.error(error);
      console.log(error);
    });
  }


}
