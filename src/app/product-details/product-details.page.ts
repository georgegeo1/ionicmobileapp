import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import {Storage} from '@ionic/storage'
import { ToastController, ModalController } from '@ionic/angular';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  product : any;
  products : any[] ;
  p : any; //name of the selected product which is passed to the product details 
  reviews : any[] = [];
  rvs : any[];
  
  

  constructor(public api:ApiService, private route: ActivatedRoute, public storage: Storage, public toastCtrl: ToastController, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.p = this.route.snapshot.paramMap.get('product');
    let d:Observable<any> = this.api.get('products');
    let e:Observable<any> = this.api.get('products/reviews');
    d.subscribe(result => { this.products = result; this.product = this.products[0]; let j=0; console.log(this.p); for (let x of this.products) { 
      //filters fetched products by name
      if (x.name === this.p) {
        this.product = x;
      }
    }

    e.subscribe(data => { this.rvs = data; this.reviews = []; for (let y of this.rvs) {
      if (y.product_id === this.product.id) {
            this.reviews.push(y);
      }
    }
    }); 
  
  
  });


  }


AddToCart(product) {
  this.storage.get('cart').then((data2) => {
//checks if the cart is empty, adds the product to the data2 array
      if (data2 == null || data2.length == 0) {
        data2 = [];
        data2.push({
          "product": product,
          "quantity": 1,
           "price" : parseFloat(product.price) 

        });
      }

      else {
        let empty = 0; //0 value indicates that the product is not found in the cart

        for (let i =0; i < data2.length ; i++) {
          if (product.id === data2[i].product.id) {

            data2[i].quantity = data2[i].quantity + 1;
            data2[i].price = parseFloat(data2[i].price) + parseFloat(data2[i].product.price);
            empty = 1;
        }
      }

      // If the product was not found in the cart, the product is added as a new product in the cart
      if (empty === 0) {
        data2.push({
          "product": product,
          "quantity": 1,
           "price" : parseFloat(product.price) 

        });}
      }

    this.storage.set('cart', data2).then( async () =>{
        console.log("Cart Updated");
        console.log(data2);

        let message = await this.toastCtrl.create({
          message: "Cart Updated",
          duration: 3000
        })
        message.present();
    })

  });


  }

    async openCart() {

     const modal = await this.modalCtrl.create({
        component: CartPage
      });
      return await modal.present();
    }

}

