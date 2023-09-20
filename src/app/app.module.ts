import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExploreCardsComponent } from './components/explore-cards/explore-cards.component';
import { TruncateLocationPipe } from './pipes/truncate-location.pipe';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { BillingcardComponent } from './components/billingcard/billingcard.component';
import { DetailsComponentComponent } from './components/search-flights/search-flights.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';

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
    FlightDetailComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
