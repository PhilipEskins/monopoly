import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SetupComponent } from './setup/setup.component';
import { BoardComponent } from './board/board.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SetupComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
