import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  public products: Product[] = [];
  public userData: any = [];

  @Input() userDataPoints: any;

  public afterRedeemPoints: number;

  @Output() sendPoints = new EventEmitter<any>();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.fetchUserData().subscribe(userData => { this.userData = userData });
    this.callUserProducts();
  }

  callUserProducts() {
    this.productService.fetchProducts().subscribe(userProducts => { 
      this.products = userProducts;
    });
  }

  lowestPrice(){
    let originalProductsCopy: Product[] = _.cloneDeep(this.products);
    this.products = originalProductsCopy.sort((a, b) => a.cost - b.cost);    
  }

  highestPrice(){
    let originalProductsCopy: Product[] = _.cloneDeep(this.products);
    this.products = originalProductsCopy.sort((a, b) => b.cost - a.cost);
  }

  mostRecent(){
    this.callUserProducts();
  }

  redeemNowHandler(product){
    this.sendPoints.emit(product.cost);
  }

}
