import { Component, OnInit } from '@angular/core';
import { DiceService } from '../dice.service';
import { Player } from '../player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [DiceService]
})
export class PlayerComponent implements OnInit {



  roll1: number;
  roll2: number;
  doubleCount: number = 0;
  playerMove: number;

  constructor(private diceService: DiceService) { }
  players: Player =
    new Player("Mr.Monopoly", true, "");


  ngOnInit() {
  }

  playerDiceRoll() {
    this.roll1 = this.diceService.diceRoll();
    this.roll2 = this.diceService.diceRoll();
    console.log(this.roll1, this.roll2)
    this.doubleCheck();
  }

  doubleCheck() {
    const doubleOcc = this.diceService.doubles(this.roll1, this.roll2);
    if (doubleOcc === true) {
      this.doubleCount++;
      console.log("Roll again " + this.doubleCount);
    } else {
      this.doubleCount = 0;
      console.log("End of turn");
    }
    this.movePlayer();
  }

  movePlayer() {
    this.playerMove = this.roll1 + this.roll2;
    this.players.location = this.playerMove + this.players.location;
    if ( this.players.location >= 40 ) {
      this.players.location -= 40;
      this.players.money += 200;
    }
    console.log(this.players.location);
  }

}
