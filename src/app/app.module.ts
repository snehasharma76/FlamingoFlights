import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExploreCardsComponent } from './components/explore-cards/explore-cards.component';
import { TruncateLocationPipe } from './pipes/truncate-location.pipe';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { BillingcardComponent } from './components/billingcard/billingcard.component';
import { DetailsComponentComponent } from './components/search-flights/search-flights.component';
import { FooterComponent } from './components/footer/footer.component';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { PassengerDetailsComponent } from './components/passenger-details/passenger-details.component';
import { PaymentPortalComponent } from './components/payment-portal/payment-portal.component';
import { FlightDetailsSummaryComponent } from './components/flight-details-summary/flight-details-summary.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FareSummaryComponent } from './components/fare-summary/fare-summary.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

import { DataService } from './services/data.service';
import { SelectTimePipe } from './pipes/select-time.pipe';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ExploreCardsComponent,
    TruncateLocationPipe,
    CarouselComponent,
    NavigationBarComponent,
    BillingcardComponent,
    DetailsComponentComponent,
    FooterComponent,
    FlightDetailComponent,
    ContactDetailsComponent,
    PassengerDetailsComponent,
    PaymentPortalComponent,
    FlightDetailsSummaryComponent,
    AdminPanelComponent,
    LoginComponent,
    RegisterComponent,
    FareSummaryComponent,
    HomePageComponent,
    SearchPageComponent,
    DetailsPageComponent,
    PaymentPageComponent,
    AdminPageComponent,
    LoginPageComponent,
    RegistrationPageComponent,

    SelectTimePipe,
    BookingsComponent,
    AboutusComponent,
    AboutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
