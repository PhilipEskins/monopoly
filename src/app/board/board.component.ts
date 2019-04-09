import { Component, OnInit } from '@angular/core';
import { Player } from '../player.model';
import { DiceService} from '../dice.service';
import { PropertyService } from '../property.service';
import { Property } from '../properties.model';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [DiceService, PropertyService]
})
export class BoardComponent implements OnInit {
  roll1: number;
  roll2: number;
  doubleCount: number = 0;
  playerMove: number;

  prop: Property[];
  players: Player = new Player([], "Monopoly", true, "car");

  constructor(private diceService: DiceService, private propertyService: PropertyService) { }

  ngOnInit() {
    this.movement();
    this.prop = this.propertyService.getProperties();
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
    this.taxes();
    console.log(this.players.money + "first")
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

  taxes() {
    if(this.players.location===4){
      this.players.money -= 200;
    } else if(this.players.location===38){
      this.players.money -= 100;
    }
  }

  buyingProperty() {
    console.log(this.players.location);
    if(this.players.location===2 || this.players.location===7 || this.players.location===10 || this.players.location===17 || this.players.location===22 || this.players.location===33 || this.players.location===36){
      alert("cant buy fool")
    } else {
      if (this.prop[this.players.location].owner!==null){
        alert("pay rent");
      } else if (this.players.money<this.prop[this.players.location].price){
        alert("not enough funds");
      } else if (this.prop[this.players.location].owner == null && this.players.money>=this.prop[this.players.location].price){
        alert("you can buy this prop");
      }
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
