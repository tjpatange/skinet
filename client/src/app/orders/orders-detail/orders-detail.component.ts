import { ToastrService } from 'ngx-toastr';
import { IOrder } from './../../shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from './../orders.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {
  order: IOrder;
  constructor(private bcService: BreadcrumbService,
              private orderService: OrdersService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
    this.bcService.set('@orderDetails', ' ');
  }
  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getSpecificOrder(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(order => {
        this.order = order;
        this.bcService.set('@orderDetails', 'Order#' + order.id.toString() + ' - ' + order.status);
      }, error => {
        this.toastr.error(error);
        console.log(error);
      });
  }

}
