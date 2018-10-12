import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {
  HomeComponent,
  NavbarComponent,
  PlayersListComponent,
  PlayersDetailComponent,
  PlayerCreateComponent,
  GameCreateComponent,
  GamePlayComponent,
  NotFoundComponent,
  LoaderComponent,
  MessageComponent
} from './component';

import {
  DataService,
  LoaderService,
  MessageService
} from './service';

import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PlayersListComponent,
    PlayersDetailComponent,
    PlayerCreateComponent,
    GameCreateComponent,
    GamePlayComponent,
    NotFoundComponent,
    LoaderComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
    LoaderService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
