import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { RouterModule, Routes } from '@angular/router';
import { OneWayFlightComponent } from './one-way-flight/one-way-flight.component';
import { ReturnFlightComponent } from './return-flight/return-flight.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { TicketComponent } from './ticket/ticket.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'one-way', pathMatch: 'full'},
  { path: 'one-way', component: OneWayFlightComponent},
  { path: 'return', component: ReturnFlightComponent},
  { path: '**', component: OneWayFlightComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchFormComponent,
    SearchResultsComponent,
    OneWayFlightComponent,
    ReturnFlightComponent,
    FilterPipe,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
