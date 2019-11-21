import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'products-by-category/:category', loadChildren: './products-by-category/products-by-category.module#ProductsByCategoryPageModule' },
  { path: 'product-details/:product', loadChildren: './product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'registration-details', loadChildren: './registration-details/registration-details.module#RegistrationDetailsPageModule' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
