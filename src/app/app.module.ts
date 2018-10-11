import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {
  HomeComponent,
  NavbarComponent,
  ErrorComponent,
  PlayersListComponent,
  PlayersDetailComponent,
  PlayerCreateComponent,
  GameCreateComponent,
  GamePlayComponent,
  NotFoundComponent
} from './component';
import { DataService } from './service';
import { AppRoutingModule } from './app.routing.module';
import { LoaderComponent } from './component/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    NavbarComponent,
    PlayersListComponent,
    PlayersDetailComponent,
    PlayerCreateComponent,
    GameCreateComponent,
    GamePlayComponent,
    NotFoundComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
