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

  shopParams: ShopParams;
  totalCount: number;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];
  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache)
      .subscribe(response => {
        this.products = response.data;
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
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  onSortOptionSelected(sort: any) {
    const params = this.shopService.getShopParams();
    params.sort = sort.target.value;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPagechanged(e: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== e) {
      params.pageNumber = e;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
