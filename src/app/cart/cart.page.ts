import { Component, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import {ModalController, AlertController} from '@ionic/angular';
import { CheckoutPage } from '../checkout/checkout.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartItems: any[] = [];
  total: any;
  emptyCart = false;

  constructor(public storage: Storage, private modalCtrl: ModalController, private modalCtrl2: ModalController, private alertCtrl: AlertController) {
    
    this.total = 0;
    this.storage.ready().then( () => {

      this.storage.get('cart').then( (data) => {
        this.cartItems = data;
        console.log(this.cartItems);

        if (this.cartItems.length > 0) { // if the cart is not empty, calculate the total price of products in the cart
          this.cartItems.forEach( (item, index) => {
            this.total = Math.round( this.total + (1.24*item.product.price * item.quantity))
          } )
        }
        if (this.cartItems.length === 0 ) {
          this.emptyCart = true;
        }  
      })

  })

 }

  ngOnInit() {
  }

  removeCardItem(item:any, i:any) {
    let price = item.product.price;
    let quantity = item.quantity;
    this.cartItems.splice(i, 1); //remove 1 item starting from carditems[i]
    this.storage.set("cart", this.cartItems).then( ()=> {
    if (this.cartItems.length > 0) {
        this.total = Math.round(this.total - 1.24*price * quantity);}
    if (this.cartItems.length === 0) {
      this.total = 0;
    }
    });

    if (this.cartItems.length === 0) {
      this.emptyCart = true;
      this.total = 0;
    }
  }



  closeModal() {
      this.modalCtrl.dismiss();
    }

  async checkout() {
    const modal = await this.modalCtrl2.create({
       component: CheckoutPage
     });
     return await modal.present();
   }
  
   async presentAlert() {
    const alert = await this.alertCtrl.create({
      header : "No Items in the Cart",
      message : "You have to add products to the cart before proceeding to checkout.",
      buttons : ['OK']
    });

    await alert.present();
  }

  changeQuantity(item: any, i: any, value: any) {
    let price = 0;
    let q = 0;
    q = item.quantity;
    if (value < 0 && item.quantity === 1) {
      return; }
    q = q + value;
    item.quantity = q; //Change quantity
    this.storage.set("cart", this.cartItems).then( ()=> {
      for (let z=0; z<this.cartItems.length; z++) {
        if (this.cartItems[z] === item) {
          this.cartItems === item;
        }
      }        
      });

    this.storage.ready().then( () => {
      this.storage.get('cart').then( (data) => {
        this.total = 0;
        this.cartItems = data;
        console.log(this.cartItems);

        if (this.cartItems.length > 0) { // if the cart is not empty, calculate the total price of products in the cart
          this.cartItems.forEach( (item, index) => {
            this.total = Math.round( this.total + (1.24*item.product.price * item.quantity))
          } )
        }
        if (this.cartItems.length === 0 ) {
          this.emptyCart = true;
        }  
      })
    })    
    
  }


}