import { Component, ViewChild } from '@angular/core';

import { Platform,MenuController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  categories : any = [];

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'help-circle-outline'
    },
    {
      title: 'Registration Details',
      url: '/registration-details',
      icon: 'information-circle-outline'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public api:ApiService,
    private router: Router,
    public menuCtrl: MenuController
    ) 

   {
    let temp:Observable<any> = this.api.get('products/categories');
    temp.subscribe(result => {this.categories = result, console.log(this.categories)});

    this.initializeApp();

  } 

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openCategoryPage(category:String) { //get the selected category and pass it to the "products by category" page
    this.router.navigate(['/products-by-category', category]);
    
  }

  closeMenu() {
    this.menuCtrl.close();
  }



}
