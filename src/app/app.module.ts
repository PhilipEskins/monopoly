import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CommunityCardsComponent } from './community-cards/community-cards.component';


@NgModule({
  declarations: [
    AppComponent,
    CommunityCardsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
