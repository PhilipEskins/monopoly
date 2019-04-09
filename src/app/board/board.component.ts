import { Component, OnInit } from '@angular/core';
import { Player } from '../player.model';
import { DiceService} from '../dice.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [DiceService]
})
export class BoardComponent implements OnInit {
  roll1: number;
  roll2: number;
  doubleCount: number = 0;
  playerMove: number;

  players: Player = new Player("Monopoly", true, "car");

  constructor(private diceService: DiceService) { }

  ngOnInit() {
    this.movement();
  }

  playerDiceRoll() {
    this.removeClass();
    this.roll1 = this.diceService.diceRoll();
    this.roll2 = this.diceService.diceRoll();
    console.log(this.roll1, this.roll2)
    this.doubleCheck();
    this.movement();
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
    if ( this.players.location >= 39 ) {
      this.players.location -= 39;
      this.players.money += 200;
    }
  }

  movement() {
    const car = document.getElementById("car");
    const currentLocation = this.players.location;
    const numToString = "b" + currentLocation.toString();

    car.classList.add(`${numToString}`);

    console.log(numToString);
  }

  removeClass () {
    const car = document.getElementById("car");
    const currentLocation = this.players.location;
    const numToString = "b" + currentLocation.toString();

    car.classList.remove(`${numToString}`);

    console.log(numToString);
  }

}
