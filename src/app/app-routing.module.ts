import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path:'search', component: SearchPageComponent},
  {path:'details',component:DetailsPageComponent},
  {path:'payment', component:PaymentPageComponent},
  {path:'admin', component:AdminPageComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
