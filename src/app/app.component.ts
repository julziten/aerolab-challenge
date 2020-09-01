import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from './product.service';
import { UserData } from './user.interface';
import { ItemsComponent } from './items/items.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public userData: any = {};

  @ViewChild(ItemsComponent) child;

  public afterRedeemPoints;

  constructor(private productService: ProductService) { }

  title = 'Aerolab Code Challenge';
  ngOnInit() {
    this.productService.fetchUserData().subscribe(userData => this.userData = userData);
  }

  receivePoints($event) {
    this.userData.points = this.userData.points - $event;
  }
}