import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductDetailsPage } from '../product-details/product-details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  products : any = [];  

  

 constructor(public api:ApiService, private router: Router) {

  //this.api.get('products').subscribe((data) => {console.log((data)) });
  let data:Observable<any> = this.api.get('products');
  data.subscribe(result => {this.products = result, console.log(this.products)});

  
  }


  openProductPage(product: String) {
    this.router.navigate(['product-details', product]);

  }
  

}


    

 



