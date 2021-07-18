import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './general/navbar/navbar.component';
import { HomeComponent } from './general/home/home.component';
import { AboutComponent } from './general/about/about.component';
import { RestaurantComponent } from './general/restaurant/restaurant.component';
import { MenuComponent } from './general/menu/menu.component';
import { LoginComponent } from './general/login/login.component';
import { SignupComponent } from './general/signup/signup.component';
import { AdminpanelComponent } from './admin/adminpanel/adminpanel.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { CartComponent } from './user/cart/cart.component';
import { UserinfoComponent } from './user/userinfo/userinfo.component';
import { BestGuard } from './guards/best.guard';
import { Best2Guard } from './guards/best2.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'menu/:name', component: MenuComponent },
  {
    path: 'login', component: LoginComponent,
    children: [{ path: 'signup', component: SignupComponent }],
  },
  {
    path: 'signup', redirectTo: '/login', pathMatch: 'full',
  },
  { path: 'adminpanel', component: AdminpanelComponent,canActivate:[Best2Guard] },
  { path: 'orders', component: OrdersComponent, canActivate:[Best2Guard] },
  { path: 'cart', component: CartComponent,canActivate:[BestGuard] },
  { path: 'userinfo', component: UserinfoComponent,canActivate:[BestGuard] },
  { path: 'i-dont-know', redirectTo: '/' },
  { path: '**', redirectTo: '/'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
