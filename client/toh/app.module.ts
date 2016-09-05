import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

//import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './app/in-memory-data.service';


import { AppComponent }  from './app/app.component';
import { FormComponent } from './app/form/form.component';
import { HeroDetailComponent } from './app/hero-detail.component';
import { HeroesComponent } from './app/heroes.component';
import { HeroService }  from './app/hero.service';
import { routing } from './app/app.routing';
import { DashboardComponent } from './app/dashboard.component';
// import { DBSocketService } from './app/dbsocket.service';
// Search component
import { HeroSearchComponent }  from './app/hero-search.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, routing, HttpModule ],
  declarations: [ AppComponent, FormComponent, HeroDetailComponent, HeroesComponent, DashboardComponent, HeroSearchComponent ],
  providers: [HeroService, /*DBSocketService*/]     /* in-mem server data*/,
  // providers: [HeroService,,{ provide: XHRBackend, useClass: InMemoryBackendService }, /*in-mem server*/
  //   { provide: SEED_DATA,  useClass: InMemoryDataService }]     /* in-mem server data*/,
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
