import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.page.html',
  styleUrls: ['./products-by-category.page.scss'],
})
export class ProductsByCategoryPage implements OnInit {

  category: any;
  products: any [];
  ps: any [];

  constructor(public api:ApiService, private route: ActivatedRoute, private router: Router) {
      
  }
  

  ngOnInit() {

    this.category = this.route.snapshot.paramMap.get('category');
    let d:Observable<any> = this.api.get('products');
    d.subscribe(result => { this.products = [], this.ps = result; let j=0; console.log(this.category); for (let x of this.ps) { //filter fetched products by category
      if (x.categories[0].name === this.category) {
        this.products.push(x);
      }
    }});

  }

  openProductPage(product: String) {
    this.router.navigate(['product-details', product]);

  }
    

}
