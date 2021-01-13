import { IType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { IProduct } from './../shared/models/product';
import { ShopService } from './shop.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  // true if no condition on the element, since we are display it after products are loaded
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];

  shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams)
      .subscribe(response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      }, error => {
        console.error();
      });
  }

  getBrands() {
    this.shopService.getBrands()
      .subscribe(response => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      }, error => {
        console.error();
      });
  }

  getTypes() {
    this.shopService.getTypes()
      .subscribe(response => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      }, error => {
        console.error();
      });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortOptionSelected(sort: any) {
    this.shopParams.sort = sort.target.value;
    this.getProducts();
  }

  onPagechanged(e: any) {
    if (this.shopParams.pageNumber !== e) {
      this.shopParams.pageNumber = e;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
