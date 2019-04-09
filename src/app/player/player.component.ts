import { Component, OnInit } from '@angular/core';
import { DiceService } from '../dice.service';
import { Player } from '../player.model';
import { PropertyService } from '../property.service';
import { Property } from '../properties.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [DiceService, PropertyService]
})
export class PlayerComponent implements OnInit {


  roll1: number;
  roll2: number;
  doubleCount: number = 0;
  playerMove: number;

  constructor(private diceService: DiceService, private propertyService: PropertyService) { }
  players: Player =
    new Player("Mr.Monopoly", true, "");

    prop: Property[];


  ngOnInit() {
    this.prop = this.propertyService.getProperties();
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
    if (this.players.location===40){
      if (this.roll1===this.roll2) {
        this.players.location=10;
      } else if (this.roll1!==this.roll2){
        this.players.location=40;
      }
    } else if (this.players.location <= 39){
      this.playerMove = this.roll1 + this.roll2;
      this.players.location = this.playerMove + this.players.location;
      if ( this.players.location >= 39 ) {
        this.players.location -= 39;
        this.players.money += 200;
      } else if (this.players.location===30 ){
        this.players.location=40;
      }
    }
    console.log(this.players.location);
  }

buyingProperty() {

  if ( this.prop[this.players.location].owner==null && this.players.money>=this.prop[this.players.location].price){
    console.log(this.prop);
    alert("you can buy this prop")
  } else if (this.players.location!==this.prop[this.players.location].location){
    alert("game is broken")
  } else if (this.prop[this.players.location].owner!==null){
    alert("pay rent")
  } else if (this.players.money<this.prop[this.players.location].price){
    alert("not enough funds")
  }
}


}
