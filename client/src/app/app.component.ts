import { IPagination } from './models/pagination';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet!';
  products: IProduct[] | undefined;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.http.get('https://localhost:5001/api/products?pageSize=50')
      .subscribe((response: IPagination) => {
        this.products = response.data;
      }, error => {
        console.error();
      });
  }
}
