import { IOrder } from './../shared/models/order';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getOrderHistory() {
    return this.http.get<IOrder[]>(this.baseUrl + 'orders')
    .pipe(
      map((dm: IOrder[]) => {
          return dm.sort((a, b) => b.id - a.id);
      })
    );
  }

  getSpecificOrder(id: number) {
    return this.http.get<IOrder>(this.baseUrl + 'orders/' + id);
  }
}
