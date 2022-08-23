import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { LostauctionsComponent } from './lostauctions/lostauctions.component';
import { WatchlistauctionsComponent } from './watchlistauctions/watchlistauctions.component';
import { WonauctionsComponent } from './wonauctions/wonauctions.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'listing/:id', component: ListingComponent},
  {path : 'auctionswon', component: WonauctionsComponent},
  {path : 'auctionslost', component : LostauctionsComponent},
  {path : 'watchlist', component : WatchlistauctionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
