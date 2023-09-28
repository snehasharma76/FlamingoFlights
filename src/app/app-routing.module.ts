import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authguardGuard } from './services/authguard.guard';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path:'search', component: SearchPageComponent},
  {path:'details',component:DetailsPageComponent,canActivate:[authguardGuard]},
  {path:'payment', component:PaymentPageComponent},
  {path:'admin', component:AdminPageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'registration', component:RegistrationPageComponent},
  {path:'bookings', component:BookingsComponent},
  {path:'about',component:AboutPageComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
