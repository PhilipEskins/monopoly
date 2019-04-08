import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
<<<<<<< HEAD
import { CommunityCardsComponent } from './community-cards/community-cards.component';
import { ChanceCardsComponent } from './chance-cards/chance-cards.component';
=======
import { PlayerComponent } from './player/player.component';
import { SetupComponent } from './setup/setup.component';
>>>>>>> d3ff56b97ffa4287226562329144875f7a8563cb


@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    CommunityCardsComponent,
    ChanceCardsComponent
=======
    PlayerComponent,
    SetupComponent
>>>>>>> d3ff56b97ffa4287226562329144875f7a8563cb
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
